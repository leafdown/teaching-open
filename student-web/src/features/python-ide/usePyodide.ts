// Pyodide 加载与执行 hook（含 turtle + pygame 支持）
import { useState, useCallback } from 'react'
import { PYGAME_SHIM } from './pygameShim'

interface PyodideAPI {
  runPythonAsync(code: string): Promise<any>
  globals: any
  loadPackage(names: string[]): Promise<void>
  [key: string]: any
}

let _pyodideInstance: PyodideAPI | null = null
let _loadingPromise: Promise<PyodideAPI> | null = null

// turtle 初始化代码:连接 canvas,抑制 Tkinter 窗口
// 注意: 画布浮动窗口由「实际绘制动作」懒创建 — import turtle / 运行普通代码绝不弹窗
export const TURTLE_SETUP = `
import sys, js
# 共享函数: 创建/获取浮动 Canvas 窗口
_orig_event_queue = []
_svg_rec_lines = []  # 矢量 SVG 共享记录: 所有海龟实例的线条累积于此
_svg_rec_fills = []  # 矢量 SVG 共享记录: 所有填充多边形
_svg_rec_texts = []  # 矢量 SVG 共享记录: write() 文本
_turtle_bg = 'white' # 画布背景色(turtle.bgcolor / Screen().bgcolor 设置)

def _esc_svg(s):
    return str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

# 设置背景色: 记录全局值; 画布已存在则立即重刷
def _set_turtle_bg(c):
    global _turtle_bg
    _turtle_bg = _css_color((c,))
    import js as _js
    _c = _js.document.getElementById('pygame-canvas')
    if _c:
        _ctx = _c.getContext('2d')
        if _ctx:
            _ctx.fillStyle = _turtle_bg
            _ctx.fillRect(0, 0, _c.width, _c.height)

# 颜色参数归一化: 支持 'red'/'hsl(...)' 字符串、color(r,g,b) 0~1 浮点或 0~255 整数
def _css_color(args):
    try:
        if len(args) >= 3:
            vs = []
            for v in args[:3]:
                f = float(v)
                vs.append(int(round(f * 255 if f <= 1 else f)))
            return 'rgb(%d,%d,%d)' % (min(255, max(0, vs[0])), min(255, max(0, vs[1])), min(255, max(0, vs[2])))
    except Exception:
        pass
    return str(args[0]) if args else 'black'

# 矢量 SVG 下载: 重放记录的线条与填充, 生成真矢量 SVG 并下载
def _turtle_download_svg():
    import js as _js
    parts = []
    xs = []; ys = []
    for ln in _svg_rec_lines:
        xs += [ln[0], ln[2]]; ys += [ln[1], ln[3]]
    for fl in _svg_rec_fills:
        for p in fl[0]: xs.append(p[0]); ys.append(p[1])
    for t in _svg_rec_texts:
        xs.append(t[0]); ys.append(t[1])
    if not xs:
        return
    minx, maxx = min(xs), max(xs)
    miny, maxy = min(ys), max(ys)
    pad = 20
    w = maxx - minx + pad * 2
    h = maxy - miny + pad * 2
    def _sx(x): return x - minx + pad
    def _sy(y): return h - (y - miny) - pad
    parts.append('<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d">' % (w, h, w, h))
    parts.append('<rect width="100%" height="100%" fill="white"/>')
    for fl in _svg_rec_fills:
        pts_str = ' '.join('%.1f,%.1f' % (_sx(p[0]), _sy(p[1])) for p in fl[0])
        parts.append('<polygon points="%s" fill="%s" stroke="%s" stroke-width="1"/>' % (pts_str, fl[1], fl[1]))
    for ln in _svg_rec_lines:
        parts.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="%.1f"/>' % (_sx(ln[0]), _sy(ln[1]), _sx(ln[2]), _sy(ln[3]), ln[4], ln[5]))
    for t in _svg_rec_texts:
        parts.append('<text x="%.1f" y="%.1f" fill="%s" font-size="%.1f" font-family="sans-serif">%s</text>' % (_sx(t[0]), _sy(t[1]), t[2], t[4], _esc_svg(t[3])))
    parts.append('</svg>')
    _svg = ''.join(parts)
    _blob = _js.Blob.new([_svg], {'type': 'image/svg+xml'})
    _a = _js.document.createElement('a')
    _obj = _js.URL.createObjectURL(_blob)
    _a.href = _obj; _a.download = 'turtle.svg'
    _js.document.body.appendChild(_a); _a.click(); _a.remove()
    _js.URL.revokeObjectURL(_obj)

# 全局重置函数:清空画布、重置所有海龟
# 注意: 绝不在此创建浮动窗口 — 否则「运行前重置」会让任何代码(哪怕注释里出现 turtle)都弹窗
def _turtle_reset():
    import sys as _sys
    import js as _js
    global _turtle_bg
    # 清空矢量 SVG 记录(跨运行重置)
    del _svg_rec_lines[:]
    del _svg_rec_fills[:]
    del _svg_rec_texts[:]
    _turtle_bg = 'white'
    _t = _sys.modules.get('turtle')
    if _t:
        try:
            _t._reset_default()
        except:
            pass
    _c = _js.document.getElementById('pygame-canvas')
    _tc2 = _js.document.getElementById('turtleCanvas')
    if _c:
        _ctx = _c.getContext('2d')
        if _ctx:
            _ctx.setTransform(1,0,0,1,0,0)
            _ctx.clearRect(0,0,_c.width,_c.height)
            _ctx.fillStyle = _turtle_bg
            _ctx.fillRect(0,0,_c.width,_c.height)
        # 浮动窗口已显示, 隐藏固定 Canvas
        if _tc2: _tc2.style.display = 'none'
`

// turtle 主 shim: 模块级类定义(窗口由绘制动作懒创建, 见 _Turtle._ensure_window)
export const TURTLE_SHIM = `
import sys, js
_orig_event_queue = []
def _ensure_floating_canvas(w, h, title='Turtle'):
    _existing = js.document.getElementById('pygame-window')
    if _existing:
        _existing.remove()
    _tc = js.document.getElementById('turtleCanvas')
    if _tc: _tc.style.display = 'none'
    _div = js.document.createElement('div')
    _div.id = 'pygame-window'
    _div.style = 'position:fixed; z-index:9999; top:50%; left:50%; transform:translate(-50%,-50%); box-shadow:0 8px 40px rgba(0,0,0,.4); border-radius:12px; overflow:hidden; background:#fff;'
    _header = js.document.createElement('div')
    _header.innerHTML = '<span style="padding:6px 14px;font-size:13px;color:#333;background:#f5f5f5;border-bottom:1px solid #e0e0e0;display:flex;justify-content:space-between;align-items:center"><span>' + title + '</span><span style="display:flex;gap:14px;align-items:center"><span id="pygame-save" title="保存 SVG" style="cursor:pointer;color:#166534"><i class="fa-solid fa-download"></i></span><span id="pygame-close" title="关闭" style="cursor:pointer;color:#999"><i class="fa-solid fa-xmark"></i></span></span></span>'
    _div.appendChild(_header)
    _c = js.document.createElement('canvas')
    _c.id = 'pygame-canvas'
    _c.width = w; _c.height = h
    _c.style = 'display:block;width:' + str(w) + 'px;height:' + str(h) + 'px'
    _div.appendChild(_c)
    js.document.body.appendChild(_div)
    # 应用海龟背景色(新建画布时)
    _ctx0 = _c.getContext('2d')
    if _ctx0:
        _ctx0.fillStyle = _turtle_bg
        _ctx0.fillRect(0, 0, w, h)
    def _close(e):
        _div.remove()
        _tc2 = js.document.getElementById('turtleCanvas')
        if _tc2: _tc2.style.display = ''
        _orig_event_queue.append(type('_ev', (), {'type': 256})())
    def _save_svg(e):
        _turtle_download_svg()
    _sv = js.document.getElementById('pygame-save')
    if _sv: _sv.onclick = _save_svg
    js.document.getElementById('pygame-close').onclick = _close
    return _c

class _Turtle:
    def __init__(self):
        # 注意: 此处绝不创建浮动画布窗口 — 由实际绘制动作(_tx/_ty)懒创建
        # 否则任何代码(哪怕不 import turtle)都会弹窗
        self._cx, self._cy = 190, 180  # 画布中心(380x360)
        self._x, self._y = 0, 0
        self._heading = 0
        self._pen_down = True
        self._color = 'black'
        self._width = 1
        self._speed_val = 6
        self._visible = True
        self._fillcolor = 'black'
        self._filling = False
        self._fill_path = []
        self._delay = 0
    def _ensure_window(self):
        import js as _js
        if not _js.document.getElementById('pygame-canvas'):
            _ensure_floating_canvas(380, 380, '🐢 Turtle')
    def _tx(self, x):
        import js as _js
        self._ensure_window()
        _el = _js.document.getElementById('pygame-canvas') or _js.document.getElementById('turtleCanvas')
        self._cx = (_el.width / 2) if _el else 190
        return self._cx + x
    def _ty(self, y):
        import js as _js
        self._ensure_window()
        _el = _js.document.getElementById('pygame-canvas') or _js.document.getElementById('turtleCanvas')
        self._cy = (_el.height / 2) if _el else 180
        return self._cy - y
    def forward(self, d):
        import math
        rad = math.radians(self._heading)
        nx = self._x + d * math.cos(rad)
        ny = self._y + d * math.sin(rad)
        if self._pen_down:
            self._maybe_delay()
            _canvas_line(self._color, self._tx(self._x), self._ty(self._y), self._tx(nx), self._ty(ny), self._width)
            _svg_rec_lines.append((self._x, self._y, nx, ny, self._color, self._width))
            if self._filling: self._fill_path.append((nx, ny))
        self._x, self._y = nx, ny
    def backward(self, d): self.forward(-d)
    def right(self, a): self._heading = (self._heading - a) % 360
    def left(self, a): self._heading = (self._heading + a) % 360
    def setheading(self, a): self._heading = a % 360
    def penup(self): self._pen_down = False
    def pendown(self): self._pen_down = True
    def goto(self, x, y):
        if self._pen_down:
            self._maybe_delay()
            _canvas_line(self._color, self._tx(self._x), self._ty(self._y), self._tx(x), self._ty(y), self._width)
            _svg_rec_lines.append((self._x, self._y, x, y, self._color, self._width))
            if self._filling: self._fill_path.append((x, y))
        self._x, self._y = x, y
    def setpos(self, x, y): self.goto(x, y)
    def color(self, *a):
        if a: self._color = _css_color(a)
        return self._color
    def pencolor(self, *a):
        if a: self._color = _css_color(a)
        return self._color
    def pensize(self, *a):
        if a: self._width = a[0]
        return self._width
    def width(self, *a):
        if a: self._width = a[0]
        return self._width
    def speed(self, *a):
        if a:
            s = a[0]
            self._speed_val = s
            # speed0=最快(无延迟), speed1=最慢(~500ms), speed10=~50ms
            self._delay = 0 if s == 0 else max(0, 500 - (s - 1) * 50)
        return self._speed_val
    def _maybe_delay(self):
        if self._delay:
            import time as _t
            _end = _t.time() + self._delay / 1000
            while _t.time() < _end:
                pass
    def circle(self, r, e=None):
        self._maybe_delay()
        import math
        extent = e if e is not None else 360
        steps = max(60, int(abs(extent) * 2))
        h = math.radians(self._heading)
        sr = 1 if r >= 0 else -1
        R = abs(r)
        # 圆心在海龟左侧(r>0) 或右侧(r<0): pos + r * 左法向量(-sin h, cos h)
        cx = self._x - r * math.sin(h)
        cy = self._y + r * math.cos(h)
        # 圆心->海龟的初始角度(r>0: h-π/2; r<0: h+π/2)
        theta0 = h - sr * math.pi / 2
        # 扫过角度 = sign(r) * extent(r>0 逆时针增, r<0 顺时针减)
        dtheta = sr * math.radians(extent)
        for i in range(steps):
            theta = theta0 + dtheta * (i + 1) / steps
            nx = cx + R * math.cos(theta)
            ny = cy + R * math.sin(theta)
            if self._pen_down:
                _canvas_line(self._color, self._tx(self._x), self._ty(self._y), self._tx(nx), self._ty(ny), self._width)
                _svg_rec_lines.append((self._x, self._y, nx, ny, self._color, self._width))
                if self._filling: self._fill_path.append((nx, ny))
            self._x, self._y = nx, ny
        # heading 变化 = sign(r) * extent
        self._heading = (self._heading + sr * extent) % 360
    def dot(self, s=1, c=None):
        _canvas_circle(c if c else self._color, self._tx(self._x), self._ty(self._y), s/2, 0)
    def write(self, t, move=False, align='left', font=('Arial', 12, 'normal')):
        # 在画布上绘制文本(而非打印到终端)
        _size = 12
        try:
            if isinstance(font, (tuple, list)) and len(font) > 1:
                _size = max(10, int(font[1]))
        except Exception:
            pass
        _px, _py2 = self._tx(self._x), self._ty(self._y)
        _canvas_text(self._color, _px, _py2, str(t), _size)
        _svg_rec_texts.append((self._x, self._y, self._color, str(t), _size))
    def hideturtle(self): self._visible = False
    def showturtle(self): self._visible = True
    def position(self): return (self._x, self._y)
    def pos(self): return (self._x, self._y)
    def xcor(self): return self._x
    def ycor(self): return self._y
    def heading(self): return self._heading
    def isdown(self): return self._pen_down
    def reset(self): self._x,self._y,self._heading,self._color,self._width,self._pen_down,self._fillcolor,self._filling,self._fill_path = 0,0,0,'black',1,True,'black',False,[]
    def clone(self): return _Turtle()
    def begin_fill(self):
        self._filling = True
        self._fill_path = [(self._x, self._y)]
    def end_fill(self):
        self._filling = False
        if len(self._fill_path) > 2:
            pts = [(self._tx(p[0]), self._ty(p[1])) for p in self._fill_path]
            _canvas_fill(self._fillcolor or self._color, pts)
            _svg_rec_fills.append((list(self._fill_path), self._fillcolor or self._color))
        self._fill_path = []
    def setx(self, x): self._x = x
    def sety(self, y): self._y = y
    def towards(self, x, y):
        import math
        return math.degrees(math.atan2(y - self._y, x - self._x))
    def distance(self, x, y):
        import math
        return math.hypot(x - self._x, y - self._y)
    def clear(self): pass  # canvas clear handled externally
    def stamp(self): return 0
    def shape(self, n='classic'): pass
    def shapesize(self, *a): pass
    def undobufferentries(self): return 0
    def fill(self): return self._filling
    def isvisible(self): return self._visible

class _Screen:
    def __init__(self):
        _ensure_floating_canvas(380, 380, '🐢 Turtle')  # 显式创建 Screen 视为要求开窗
    def bgcolor(self, c=None):
        if c is not None: _set_turtle_bg(c)
    def title(self, t): pass
    def setup(self, *a):
        if a:
            _ensure_floating_canvas(a[0], a[1] if len(a) > 1 else a[0], '🐢 Turtle')
    def reset(self): pass
    def clear(self): pass
    def delay(self, d): pass
    def tracer(self, *a): pass
    def update(self): pass
    def exitonclick(self): pass
    def bye(self): pass

class _TurtleModule:
    def __init__(self):
        self._default = None  # 懒创建: import turtle 本身不弹窗, 首次实际使用才创建
    def _d(self):
        if self._default is None:
            self._default = _Turtle()
        return self._default
    def _reset_default(self):
        if self._default is not None:
            self._default.reset()
    Turtle = _Turtle
    Screen = _Screen
    def done(self): pass
    def bye(self): pass
    def exitonclick(self): pass
    def bgcolor(self, c=None):
        if c is not None: _set_turtle_bg(c)
    def delay(self, d): pass
    def tracer(self, *a): pass
    def update(self): pass
    def clearscreen(self): self._reset_default()
    def resetscreen(self): self._reset_default()
    def turtles(self): return [self._default] if self._default is not None else []
    def getcanvas(self): return None
    def getscreen(self): return _Screen()
    def setup(self, *a):
        if a:
            _ensure_floating_canvas(a[0], a[1] if len(a) > 1 else a[0], '🐢 Turtle')
        else:
            _ensure_floating_canvas(380, 380, '🐢 Turtle')
    def screensize(self, *a):
        if a:
            _ensure_floating_canvas(a[0], a[1] if len(a) > 1 else a[0], '🐢 Turtle')
    def numinput(self, *a): return None
    def textinput(self, *a): return None
    def addshape(self, *a): pass
    def register_shape(self, *a): pass
    def window_height(self): return 360
    def window_width(self): return 380
    def fillcolor(self, *a): return self._d().fillcolor(*a)
    def pencolor(self, *a): return self._d().pencolor(*a)
    def color(self, *a): return self._d().color(*a)
    def pensize(self, *a): return self._d().pensize(*a)
    def width(self, *a): return self._d().width(*a)
    def speed(self, *a): return self._d().speed(*a)
    def forward(self, d): self._d().forward(d)
    def fd(self, d): self._d().forward(d)
    def backward(self, d): self._d().backward(d)
    def bk(self, d): self._d().backward(d)
    def right(self, a): self._d().right(a)
    def rt(self, a): self._d().right(a)
    def left(self, a): self._d().left(a)
    def lt(self, a): self._d().left(a)
    def goto(self, x, y=None):
        if y is None: self._d().goto(x[0], x[1])
        else: self._d().goto(x, y)
    def setpos(self, x, y=None): self.goto(x, y)
    def setposition(self, x, y=None): self.goto(x, y)
    def setx(self, x): self._d().setx(x)
    def sety(self, y): self._d().sety(y)
    def setheading(self, a): self._d().setheading(a)
    def seth(self, a): self._d().setheading(a)
    def penup(self): self._d().penup()
    def pu(self): self._d().penup()
    def pendown(self): self._d().pendown()
    def pd(self): self._d().pendown()
    def isdown(self): return self._d().isdown()
    def position(self): return self._d().position()
    def pos(self): return self._d().position()
    def xcor(self): return self._d().xcor()
    def ycor(self): return self._d().ycor()
    def heading(self): return self._d().heading()
    def circle(self, r, e=None): self._d().circle(r, e)
    def dot(self, *a): self._d().dot(*a)
    def stamp(self): return 0
    def clone(self): return _Turtle()
    def hideturtle(self): self._d().hideturtle()
    def ht(self): self._d().hideturtle()
    def showturtle(self): self._d().showturtle()
    def st(self): self._d().showturtle()
    def shape(self, *a): pass
    def shapesize(self, *a): pass
    def reset(self): self._d().reset()
    def clear(self): self._d().clear()
    def write(self, *a, **kw): self._d().write(*a, **kw)
    def begin_fill(self): self._d().begin_fill()
    def end_fill(self): self._d().end_fill()
    def fill(self): return self._d().fill()
    def isvisible(self): return self._d().isvisible()
    def distance(self, x, y): return self._d().distance(x, y)
    def towards(self, x, y): return self._d().towards(x, y)
    def setundobuffer(self, *a): pass

sys.modules['turtle'] = _TurtleModule()

`

// input() 桥接: 提示语由 JS 侧(__pythonInputShow)直接写入输出面板, Python 侧只负责挂起等待
export const INPUT_BRIDGE_SETUP = `import _lanqu_input_builtin,builtins
import sys, pyodide.ffi
def _input_builtin(p=""):
    # 提示语文本由 JS 桥(window.__pythonInputShow)直接写入输出面板。
    # 不能在这里 print(p): batched stdout 缓冲到换行才输出, flush 也不会触发回调,
    # 会导致提示语直到用户提交后才随下一行输出"挤出来"。
    return pyodide.ffi.run_sync(_lanqu_input_builtin.input(p))
builtins.input=_input_builtin`

async function loadPyodideCDN(onProgress?: (pct: number, label?: string) => void): Promise<PyodideAPI> {
  onProgress?.(5)
  const scriptId = '__pyodide_loader'
  // CDN 备选列表: 依次尝试，15s 超时自动切换，带标签用于进度提示
  const CDNS: { src: string; index: string; label: string }[] = [
    { src: 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/pyodide.js', index: 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/', label: 'jsdelivr' },
    { src: 'https://unpkg.com/pyodide@0.29.0/full/pyodide.js', index: 'https://unpkg.com/pyodide@0.29.0/full/', label: 'unpkg' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/pyodide/0.29.0/full/pyodide.js', index: 'https://cdnjs.cloudflare.com/ajax/libs/pyodide/0.29.0/full/', label: 'cdnjs' },
    { src: 'https://gcore.jsdelivr.net/pyodide/v0.29.0/full/pyodide.js', index: 'https://gcore.jsdelivr.net/pyodide/v0.29.0/full/', label: 'gcore' },
    { src: 'https://registry.npmmirror.com/pyodide/0.29.0/files/full/pyodide.js', index: 'https://registry.npmmirror.com/pyodide/0.29.0/files/full/', label: 'npmmirror' },
  ]

  let pyodide: PyodideAPI | null = null
  let lastError: Error | null = null

  for (const cdn of CDNS) {
    onProgress?.(5, `连接 ${cdn.label}...`)
    const existing = document.getElementById(scriptId)
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.id = scriptId
    script.src = cdn.src
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)
    try {
      onProgress?.(15, `下载 ${cdn.label}...`)
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('CDN 失败'))
        setTimeout(() => reject(new Error('超时')), 15000)
      })
      onProgress?.(30, '初始化...')
      const loadFn = (window as any).loadPyodide
      pyodide = await loadFn({ indexURL: cdn.index })
      lastError = null
      break
    } catch (e: any) {
      lastError = e
      console.warn('Pyodide CDN 失败，尝试下一个:', cdn.src)
      continue
    }
  }
  if (!pyodide || lastError) throw lastError || new Error('Pyodide 加载失败(所有 CDN 均不可用)')
  onProgress?.(50)
  const stdout: string[] = []
  pyodide.setStdout({ batched: (text: string) => { stdout.push(text) } })
  pyodide.setStderr({ batched: (text: string) => { stdout.push(text) } })
  pyodide._lanquStdout = stdout
  // 注入纯 JS Canvas turtle shim(Pyodide 0.29+ 已移除标准库 turtle)
  try {
    await pyodide.runPythonAsync(TURTLE_SHIM)
  } catch (e: any) { console.warn('turtle shim 注入失败:', e.message) }
  // 注册 canvas 绘制函数(pygame shim 依赖)
  pyodide.registerJsModule('_lanqu_canvas', {
    _el: function() {
      return document.getElementById('pygame-canvas') || document.getElementById('turtleCanvas')
    },
    rect: function(c: string,x: number,y: number,w: number,h: number,width: number) {
      var el = this._el()
      if (!el) return; var ctx = el.getContext('2d'); if(!ctx) return
      ctx.strokeStyle = ctx.fillStyle = c; width ? ctx.strokeRect(x,y,w,h) : ctx.fillRect(x,y,w,h)
    },
    circle: function(c: string,cx: number,cy: number,r: number,width: number) {
      var el = this._el()
      if (!el) return; var ctx = el.getContext('2d'); if(!ctx) return
      ctx.strokeStyle = ctx.fillStyle = c; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2)
      width ? ctx.stroke() : ctx.fill()
    },
    line: function(c: string,x1: number,y1: number,x2: number,y2: number,w: number) {
      var el = this._el()
      if (!el) return; var ctx = el.getContext('2d'); if(!ctx) return
      ctx.strokeStyle = c; ctx.lineWidth = w||1; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
    },
    flip: function() {},
    fill: function(c: string, pts: number[][]) {
      var el = this._el()
      if (!el || pts.length < 3) return
      var ctx = el.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = c
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
      ctx.closePath()
      ctx.fill()
    },
    text: function(c: string, x: number, y: number, t: string, size: number) {
      var el = this._el()
      if (!el) return; var ctx = el.getContext('2d'); if (!ctx) return
      ctx.fillStyle = c
      ctx.font = (size || 12) + 'px sans-serif'
      ctx.textBaseline = 'bottom'
      ctx.fillText(t, x, y)
    }
  })
  await pyodide.runPythonAsync([
    'import _lanqu_canvas',
    'def _canvas_rect(c,x,y,w,h,width=0): _lanqu_canvas.rect(c,x,y,w,h,width)',
    'def _canvas_circle(c,cx,cy,r,width=0): _lanqu_canvas.circle(c,cx,cy,r,width)',
    'def _canvas_line(c,x1,y1,x2,y2,w=1): _lanqu_canvas.line(c,x1,y1,x2,y2,w)',
    'def _canvas_polygon(c,pts,width=0): pass',
    'def _canvas_flip(): _lanqu_canvas.flip()',
    'def _canvas_fill(c,pts): _lanqu_canvas.fill(c,pts)',
    'def _canvas_text(c,x,y,t,size=12): _lanqu_canvas.text(c,x,y,t,size)',
  ].join('\n')).catch(function(){})
  onProgress?.(70)
  // 初始化 turtle 连接
  await pyodide.runPythonAsync(TURTLE_SETUP).catch(function(){})
  onProgress?.(80)
  // 初始化 pygame shim
  await pyodide.runPythonAsync(PYGAME_SHIM).catch(() => console.warn('pygame shim 注入失败(忽略, pygame-ce 将覆盖)'))
  onProgress?.(90)
  // 注入 input() — 使 Python 的 input() 通过 Promise 交互
  const _inputResolver = { current: null as ((v: string) => void) | null }
  pyodide.registerJsModule('_lanqu_input_builtin', {
    input: (prompt: string) => {
      return new Promise<string>(resolve => {
        _inputResolver.current = resolve
        ;(window as any).__pythonInputPending = true
        ;(window as any).__pythonInputPrompt = prompt
        // 通知前端显示输入框
        const cb = (window as any).__pythonInputShow
        if (cb) cb(prompt)
      })
    }
  })
  // 把 _inputResolver 挂到全局, 供 index.tsx 的 handleInputSubmit 调用
  ;(window as any).__pythonInputResolve = (val: string) => {
    if (_inputResolver.current) {
      _inputResolver.current(val)
      _inputResolver.current = null
      ;(window as any).__pythonInputPending = false
    }
  }
  await pyodide.runPythonAsync(INPUT_BRIDGE_SETUP).catch(function(){})
  pyodide._lanquInputResolver = _inputResolver
  onProgress?.(100)
  return pyodide
}

// turtle/pygame 使用判定: 仅当代码真正 import 这些模块才启用 turtle 模式
// (旧版 /\bturtle\b/ 连注释/字符串里出现 turtle 都匹配, 触发无谓的画布重置)
export function detectTurtleMode(code: string): boolean {
  return /\bimport\s+[\w, ]*\b(turtle|pygame)\b|\bfrom\s+(turtle|pygame)\b/.test(code)
}

// 把 Pyodide 的完整 traceback 浓缩成学生可读的一行: 「第 N 行 异常: 说明」
// (完整 traceback 大部分是 _pyodide/_base.py 内部帧, 对初学者是噪音)
export function formatPyError(msg: string): string {
      const lines = String(msg || '').split('\n').map((l: string) => l.trim()).filter(Boolean)
  const last = lines[lines.length - 1] || '未知错误'
  let lineNo = ''
  for (const l of lines) {
    const m = l.match(/File "(?:<exec>|<string>)", line (\d+)/)
    if (m) lineNo = m[1]
  }
  // 只保留异常行; "第 N 行 ·" 前缀帮助学生定位
  return (lineNo ? `第 ${lineNo} 行 · ` : '') + last
}

export function usePyodide() {
  const [isReady, setIsReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')

  const init = useCallback(async () => {
    if (_pyodideInstance) { setIsReady(true); return _pyodideInstance }
    if (_loadingPromise) { const py = await _loadingPromise; setIsReady(true); return py }
    setLoading(true); setProgress(10); setStatusText(''); setError(null)
    _loadingPromise = loadPyodideCDN((pct, label) => { setProgress(pct); if (label) setStatusText(label) })
    try {
      _pyodideInstance = await _loadingPromise
      setProgress(100)
      setIsReady(true)
      return _pyodideInstance
    } catch (e: any) {
      setError(e.message || 'Pyodide 加载失败')
      _loadingPromise = null
      throw e
    } finally { setLoading(false) }
  }, [])

  const runCode = useCallback(async (code: string, turtleMode = false, onOutput?: (line: string) => void, onInput?: (prompt: string) => void): Promise<{ output: string[]; result: any }> => {
    if (!_pyodideInstance) throw new Error('Pyodide 未加载')
    const stdout = _pyodideInstance._lanquStdout as string[]
    stdout.length = 0
    // 替换 stdout 为实时回调版本
    if (onOutput) {
      _pyodideInstance.setStdout({ batched: (text: string) => { stdout.push(text); onOutput(text) } })
    }
    // 按需安装依赖包: pygame (安装 pygame-ce + 完全 Canvas 渲染补丁)
    if (/\bpygame\b/.test(code)) {
      if (onOutput) onOutput('📦 安装 pygame-ce...')
      try {
        await _pyodideInstance.loadPackage(['pygame-ce'])
        // 卸掉加载时注入的兜底 shim, 否则 sys.modules['pygame'] 被占住, 真实 pygame-ce 永远 import 不到
        await _pyodideInstance.runPythonAsync(`import sys as _s; _s.modules.pop('pygame', None); _s.modules.pop('pygame_ce', None)`)
        if (onOutput) onOutput('✅ pygame-ce 安装完成, 注入 Canvas 渲染器')
        // 注入完全替换补丁: display + draw 全部走 Canvas
        await _pyodideInstance.runPythonAsync(`
import pygame, sys as _sys
# 完全替换 display.set_mode: 不创建 SDL 窗口, 返回虚拟 Surface
class _VScreen:
    def __init__(self, size):
        self._size = size
        self._fill = (0,0,0)
    def _el(self):
        import js as _js
        return _js.document.getElementById('pygame-canvas') or _js.document.getElementById('turtleCanvas')
    def fill(self, c):
        self._fill = c
        import js as _js
        _el = self._el()
        if _el:
            _ctx = _el.getContext('2d')
            if _ctx:
                _css = f'rgb({c[0]},{c[1]},{c[2]})' if isinstance(c,(tuple,list)) else str(c)
                _ctx.fillStyle = _css
                _ctx.fillRect(0, 0, _el.width, _el.height)
    def blit(self, src, dest, area=None):
        import js as _js, os as _os
        _el = self._el()
        if not _el: return
        _ctx = _el.getContext('2d')
        if not _ctx: return
        _dx = dest[0] if isinstance(dest, (tuple, list)) else 0
        _dy = dest[1] if isinstance(dest, (tuple, list)) else 0
        try:
            _bmp = getattr(src, '_html_bmp', None)
            if _bmp is None:
                _fp = getattr(src, '_file_path', '')
                if not _fp: raise Exception('no file_path')
                _raw = None
                try:
                    with open(_fp, 'rb') as _fh: _raw = _fh.read()
                except:
                    try:
                        with open(_os.path.basename(_fp), 'rb') as _fh: _raw = _fh.read()
                    except: pass
                if not _raw: raise Exception(f'cannot read {_fp}')
                _arr = _js.Uint8Array.new(len(_raw))
                for _i in range(len(_raw)): _arr[_i] = _raw[_i]
                _blob = _js.Blob.new([_arr])
                import asyncio as _ai
                _bmp = _ai.get_event_loop().run_until_complete(_js.createImageBitmap(_blob))
                src._html_bmp = _bmp
            _ctx.drawImage(_bmp, _dx, _dy)
        except Exception as _blit_err:
            _ctx.fillStyle = 'rgba(128, 128, 128, 0.2)'
            _ctx.fillRect(_dx, _dy, 200, 200)
            _ctx.fillStyle = '#f00'
            _ctx.font = '10px sans-serif'
            _ctx.fillText(str(_blit_err)[:80], _dx + 4, _dy + 14)
    def convert_alpha(self): return self
    def subsurface(self, *a): return self
    def get_rect(self):
        import js as _js
        return type('_Rect', (), {'x':0,'y':0,'w':self._size[0],'h':self._size[1],'width':self._size[0],'height':self._size[1],'size':self._size,'topleft':(0,0),'center':(self._size[0]//2,self._size[1]//2),'collidepoint':lambda s,x,y:0<=x<=self._size[0]and 0<=y<=self._size[1]})()
    def __getattr__(self, name):
        # 透传未匹配的方法到虚拟 Surface（set_alpha, set_colorkey 等常见调用）
        return lambda *a, **kw: None

# 只 patch 一次（第二次运行会重复注入）
if not getattr(pygame, '_patched', False):
    pygame._patched = True

    # init/quit 安全化: 真实 pygame-ce 或 shim 的 init 都可能在浏览器环境抛错/无意义
    pygame.init = lambda *a, **kw: (0, 0)
    pygame.quit = lambda *a, **kw: None

    _orig_set_mode = pygame.display.set_mode
    def _safe_set_mode(size, flags=0, depth=0):
        _ensure_floating_canvas(size[0], size[1], '🎮 Pygame')
        return _VScreen(size)
    pygame.display.set_mode = _safe_set_mode

    # patch image.load
    _orig_image_load = pygame.image.load

    class _PatchedSurface:
        def __init__(self, surf, file_path=''):
            self._surf = surf
            self._img_w, self._img_h = surf.get_size()
            self._html_data_url = ''
            self._file_path = file_path
        def convert(self, *a): return self
        def convert_alpha(self, *a): return self
        def __getattr__(self, name): return getattr(self._surf, name)

    def _safe_image_load(file, namehint=''):
        surf = _orig_image_load(file, namehint)
        fp = str(file) if not isinstance(file, str) else file
        return _PatchedSurface(surf, fp)
    pygame.image.load = _safe_image_load

    # 完全替换 pygame.draw
    def _py_css(c):
        if isinstance(c, (tuple,list)): return f'rgb({c[0]},{c[1]},{c[2]})'
        return str(c)
    def _draw_rect(s, c, r, w=0):
        _canvas_rect(_py_css(c), r[0], r[1], r[2], r[3], w)
    def _draw_circle(s, c, center, rad, w=0):
        _canvas_circle(_py_css(c), center[0], center[1], rad, w)
    def _draw_line(s, c, start, end, w=1):
        _canvas_line(_py_css(c), start[0], start[1], end[0], end[1], w)
    def _draw_polygon(s, c, pts, w=0): pass
    pygame.draw.rect = _draw_rect
    pygame.draw.circle = _draw_circle
    pygame.draw.line = _draw_line
    pygame.draw.polygon = _draw_polygon

    # patch mouse/key
    pygame.mouse.get_pos = lambda: (0,0)
    pygame.mouse.get_pressed = lambda: (False,False,False)
    pygame.key.get_pressed = lambda: ()
    pygame.key.get_mods = lambda: 0

    # patch event.get
    def _pygame_event_get():
        q = list(_orig_event_queue)
        _orig_event_queue.clear()
        return q
    pygame.event.get = _pygame_event_get
    pygame.event.poll = lambda: _orig_event_queue.pop(0) if _orig_event_queue else None
    pygame.event.wait = lambda: None
    pygame.time.delay = lambda ms: None
    import asyncio as _asyncio
    _pygame_clock_tick = lambda s, f=60: (_asyncio.get_event_loop().run_until_complete(_asyncio.sleep(0.05)) or 16)
    pygame.time.Clock = type('Clock',(),{'__init__':lambda s:None,'tick':_pygame_clock_tick,'tick_busy_loop':_pygame_clock_tick,'get_fps':lambda s: 60})

    # patch display.flip/update
    pygame.display.flip = lambda: None
    pygame.display.update = lambda r=None: None
`)
        if (onOutput) onOutput('✅ pygame Canvas 渲染器就绪')
      } catch (e: any) {
        if (onOutput) onOutput('❌ pygame 初始化失败: ' + (e.message || ''))
      }
    }
    if (turtleMode) {
      try {
        // 运行前重置 turtle 画布
        await _pyodideInstance.runPythonAsync(`_turtle_reset()`)
      } catch {}}
    // 执行代码, 带中断缓冲区(可被「停止」按钮中断, 需 Cross-Origin-Isolation)
    let result
    try {
      // 中断缓冲区: 需要 SharedArrayBuffer(COI 响应头)。
      // 不做定时强杀 — 旧版 5 秒强杀会把超 5s 的正常程序(如 speed(1) 海龟动画)误杀;
      // 手动中断由「停止」按钮写 __pythonInterruptBuffer 实现。
      try {
        const buf = new Int32Array(new SharedArrayBuffer(4))
        _pyodideInstance.setInterruptBuffer(buf)
        ;(window as any).__pythonInterruptBuffer = buf
      } catch { /* COI 不可用时无法中断, 停止按钮会提示 */ }
      try {
        result = await _pyodideInstance.runPythonAsync(code)
      } catch (e: any) {
        const msg = e?.message || ''
        const name = e?.name || ''
        if (!msg.includes('SystemExit') && !name.includes('SystemExit') && !msg.includes('sys.exit')) throw e
      }
    } finally {
      try { _pyodideInstance.setInterruptBuffer(undefined) } catch {}
      delete (window as any).__pythonInterruptBuffer
    }
    if (turtleMode) {
      try { await _pyodideInstance.runPythonAsync('turtle.update()') } catch {}
    }
    // 恢复原始 stdout
    if (onOutput) {
      const orig = stdout
      _pyodideInstance.setStdout({ batched: (t: string) => { orig.push(t) } })
    }
    return { output: [...stdout], result }
  }, [])

  // 重置 Pyodide 中的 turtle 画布(供组件外部调用)
  const resetTurtle = useCallback(async () => {
    if (!_pyodideInstance) return
    try {
      await _pyodideInstance.runPythonAsync('_turtle_reset()')
    } catch {}
  }, [])

  // Console 逐行执行(共享全局上下文,保留变量)
  const runConsoleLine = useCallback(async (line: string): Promise<string> => {
    if (!_pyodideInstance) return '⏳ Python 环境加载中, 请稍候…'
    const stdout = _pyodideInstance._lanquStdout as string[]
    stdout.length = 0
    let result: any
    try {
      result = await _pyodideInstance.runPythonAsync(line)
    } catch (e: any) {
      // REPL 只显示最后一行异常(完整 traceback 对初学者太吓人且大部分是 Pyodide 内部帧)
      const msg = (e?.message || String(e) || '未知错误').replace(/, in <exec>|<exec>$/g, '').trim()
      const lines: string[] = msg.split('\n').map((l: string) => l.trim()).filter(Boolean)
      return lines[lines.length - 1] || '未知错误'
    }
    let out = stdout.join('\n')
    // batched stdout 不含行尾换行, 多行 print 需手动补 \n, 否则行首行尾粘连
    if (out && !out.endsWith('\n')) out += '\n'
    // REPL 行为: 表达式的值要回显(旧版只回 stdout, 1+1 没有任何输出 → Console 看似不可用)
    if (result !== undefined && result !== null) {
      try {
        out += typeof result === 'string' ? `'${result}'\n` : `${String(result)}\n`
      } catch { /* PyProxy 转字符串失败则不回显 */ }
      try { if (result && typeof result.destroy === 'function') result.destroy() } catch { /* ignore */ }
    }
    return out.replace(/\n+$/, '')
  }, [])

  return { isReady, loading, error, init, runCode, progress, statusText, resetTurtle, runConsoleLine }
}
