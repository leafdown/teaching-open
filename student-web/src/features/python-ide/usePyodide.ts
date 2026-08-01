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
// 注意: Pyodide 的 CPython turtle 通过 _CFG['canvas'] 尝试连接 HTML Canvas
// 实际渲染走 CPython 的 TurtleScreenBase,在浏览器中通过 WebGL 间接工作
const TURTLE_SETUP = `
import sys, js
# 共享函数: 创建/获取浮动 Canvas 窗口
_orig_event_queue = []

def _ensure_floating_canvas(w, h, title='🐢 Turtle'):
    _existing = js.document.getElementById('pygame-window')
    if _existing:
        _existing.remove()
    _tc = js.document.getElementById('turtleCanvas')
    if _tc: _tc.style.display = 'none'
    _div = js.document.createElement('div')
    _div.id = 'pygame-window'
    _div.style = 'position:fixed; z-index:9999; top:50%; left:50%; transform:translate(-50%,-50%); box-shadow:0 8px 40px rgba(0,0,0,.4); border-radius:12px; overflow:hidden; background:#fff;'
    _header = js.document.createElement('div')
    _header.innerHTML = '<span style="padding:6px 14px;font-size:13px;color:#333;background:#f5f5f5;border-bottom:1px solid #e0e0e0;display:flex;justify-content:space-between"><span>' + title + '</span><span id="pygame-close" style="cursor:pointer;color:#999">✕</span></span>'
    _div.appendChild(_header)
    _c = js.document.createElement('canvas')
    _c.id = 'pygame-canvas'
    _c.width = w; _c.height = h
    _c.style = 'display:block;width:' + str(w) + 'px;height:' + str(h) + 'px'
    _div.appendChild(_c)
    js.document.body.appendChild(_div)
    def _close(e):
        _div.remove()
        _tc2 = js.document.getElementById('turtleCanvas')
        if _tc2: _tc2.style.display = ''
        _orig_event_queue.append(type('_ev', (), {'type': 256})())
    js.document.getElementById('pygame-close').onclick = _close
    return _c

# 全局重置函数:清空画布、重置所有海龟
def _turtle_reset():
    import sys as _sys
    import js as _js
    _t = _sys.modules.get('turtle')
    if _t:
        try:
            _t.clearscreen()
        except:
            pass
    _c = _js.document.getElementById('pygame-canvas') or _js.document.getElementById('turtleCanvas')
    if _c:
        _ctx = _c.getContext('2d')
        if _ctx:
            _ctx.setTransform(1,0,0,1,0,0)
            _ctx.clearRect(0,0,_c.width,_c.height)
    # 没有浮动窗口时隐藏固定 Canvas
    if _js.document.getElementById('pygame-canvas'):
        _tc = _js.document.getElementById('turtleCanvas')
        if _tc: _tc.style.display = 'none'
`

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
    await pyodide.runPythonAsync(`
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
    _header.innerHTML = '<span style="padding:6px 14px;font-size:13px;color:#333;background:#f5f5f5;border-bottom:1px solid #e0e0e0;display:flex;justify-content:space-between"><span>' + title + '</span><span id="pygame-close" style="cursor:pointer;color:#999">X</span></span>'
    _div.appendChild(_header)
    _c = js.document.createElement('canvas')
    _c.id = 'pygame-canvas'
    _c.width = w; _c.height = h
    _c.style = 'display:block;width:' + str(w) + 'px;height:' + str(h) + 'px'
    _div.appendChild(_c)
    js.document.body.appendChild(_div)
    def _close(e):
        _div.remove()
        _tc2 = js.document.getElementById('turtleCanvas')
        if _tc2: _tc2.style.display = ''
        _orig_event_queue.append(type('_ev', (), {'type': 256})())
    js.document.getElementById('pygame-close').onclick = _close
    return _c

class _Turtle:
    def __init__(self):
        # 确保浮动 Canvas 存在
        import js as _js
        if not _js.document.getElementById('pygame-canvas'):
            _ensure_floating_canvas(380, 380, '🐢 Turtle')
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
        self._delay = 0
    def _tx(self, x): return self._cx + x
    def _ty(self, y): return self._cy - y
    def forward(self, d):
        import math
        rad = math.radians(self._heading)
        nx = self._x + d * math.cos(rad)
        ny = self._y + d * math.sin(rad)
        if self._pen_down:
            self._maybe_delay()
            _canvas_line(self._color, self._tx(self._x), self._ty(self._y), self._tx(nx), self._ty(ny), self._width)
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
        self._x, self._y = x, y
    def setpos(self, x, y): self.goto(x, y)
    def color(self, c): self._color = c
    def pencolor(self, c): self._color = c
    def pensize(self, w): self._width = w
    def width(self, w): self._width = w
    def speed(self, s):
        self._speed_val = s
        # speed0=最快(无延迟), speed1=最慢(~500ms), speed10=~50ms
        self._delay = 0 if s == 0 else max(0, 500 - (s - 1) * 50)
    def _maybe_delay(self):
        if self._delay:
            import time as _t
            _end = _t.time() + self._delay / 1000
            while _t.time() < _end:
                pass
    def circle(self, r, e=None):
        self._maybe_delay()
        _canvas_circle(self._color, self._tx(self._x), self._ty(self._y - r), r, 0)
    def dot(self, s=1, c=None):
        _canvas_circle(c or self._color, self._tx(self._x), self._ty(self._y), s/2, 0)
    def write(self, t, move=False, align='left', font=('Arial',8,'normal')):
        print(t, end='')
    def hideturtle(self): self._visible = False
    def showturtle(self): self._visible = True
    def position(self): return (self._x, self._y)
    def pos(self): return (self._x, self._y)
    def xcor(self): return self._x
    def ycor(self): return self._y
    def heading(self): return self._heading
    def isdown(self): return self._pen_down
    def reset(self): self._x,self._y,self._heading,self._color,self._width,self._pen_down,self._fillcolor,self._filling = 0,0,0,'black',1,True,'black',False
    def clone(self): return _Turtle()
    def begin_fill(self): self._filling = True
    def end_fill(self):
        self._filling = False
        # 绘制填充矩形, 半透明效果
        _canvas_rect(self._fillcolor or self._color, self._tx(self._x-15), self._ty(self._y-15), 30, 30, 0)
        # fill 用简单矩形近似
        _canvas_rect(self._fillcolor or self._color, self._x-10, self._y-10, 20, 20, 0)
    def fillcolor(self, c): self._fillcolor = c
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
        self._bg = 'white'
        _ensure_floating_canvas(380, 380, '🐢 Turtle')
    def bgcolor(self, c): self._bg = c
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
    Turtle = _Turtle
    Screen = _Screen
    def done(self): pass
    def bye(self): pass
    def exitonclick(self): pass
    def bgcolor(self, c): pass
    def delay(self, d): pass
    def tracer(self, *a): pass
    def update(self): pass
    def clearscreen(self): pass
    def resetscreen(self): pass
    def turtles(self): return []
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
    def registering(self, *a): pass
    def window_height(self): return 360
    def window_width(self): return 380
    def fillcolor(self, *a): return 'black'
    def pencolor(self, *a): return 'black'
    def color(self, *a): return 'black'
    def pensize(self, *a): return 1
    def width(self, *a): return 1
    def speed(self, *a): return 6
    def forward(self, *a): pass
    def backward(self, *a): pass
    def right(self, *a): pass
    def left(self, *a): pass
    def goto(self, *a): pass
    def setpos(self, *a): self.goto(*a)
    def setheading(self, *a): pass
    def penup(self): pass
    def pendown(self): pass
    def isdown(self): return True
    def position(self): return (0,0)
    def pos(self): return (0,0)
    def xcor(self): return 0
    def ycor(self): return 0
    def heading(self): return 0
    def circle(self, *a): pass
    def dot(self, *a): pass
    def stamp(self): return 0
    def clone(self): return _Turtle()
    def hideturtle(self): pass
    def showturtle(self): pass
    def shape(self, *a): pass
    def shapesize(self, *a): pass
    def reset(self): pass
    def clear(self): pass
    def write(self, *a): pass
    def begin_fill(self): pass
    def end_fill(self): pass
    def fill(self): return False
    def isvisible(self): return True

sys.modules['turtle'] = _TurtleModule()
`)
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
    flip: function() {}
  })
  await pyodide.runPythonAsync([
    'import _lanqu_canvas',
    'def _canvas_rect(c,x,y,w,h,width=0): _lanqu_canvas.rect(c,x,y,w,h,width)',
    'def _canvas_circle(c,cx,cy,r,width=0): _lanqu_canvas.circle(c,cx,cy,r,width)',
    'def _canvas_line(c,x1,y1,x2,y2,w=1): _lanqu_canvas.line(c,x1,y1,x2,y2,w)',
    'def _canvas_polygon(c,pts,width=0): pass',
    'def _canvas_flip(): _lanqu_canvas.flip()',
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
  await pyodide.runPythonAsync(`import _lanqu_input_builtin,builtins
import sys, pyodide.ffi
def _input_builtin(p=""):
    print(p,end="")
    sys.stdout.flush()  # 确保 input() 的提示文本在弹窗前输出到面板
    try:
        return pyodide.ffi.run_sync(_lanqu_input_builtin.input(p))
    except:
        # fallback: 返回 Promise, Pyodide 自动处理
        return _lanqu_input_builtin.input(p)
builtins.input=_input_builtin`).catch(function(){})
  pyodide._lanquInputResolver = _inputResolver
  onProgress?.(100)
  return pyodide
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
    // 执行代码, 带中断缓冲区(可被外部中断, 需 Cross-Origin-Isolation)
    let result
    let interruptTimer: number | null = null
    try {
      try { const buf = new Int32Array(new SharedArrayBuffer(4)); _pyodideInstance.setInterruptBuffer(buf); interruptTimer = window.setTimeout(() => { buf[0] = 2 }, 5000) } catch {}
      try {
        result = await _pyodideInstance.runPythonAsync(code)
      } catch (e: any) {
        const msg = e?.message || ''
        const name = e?.name || ''
        if (!msg.includes('SystemExit') && !name.includes('SystemExit') && !msg.includes('sys.exit')) throw e
      }
    } finally {
      if (interruptTimer !== null) { clearTimeout(interruptTimer); try { _pyodideInstance.setInterruptBuffer(undefined) } catch {} }
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
    if (!_pyodideInstance) return 'Pyodide 未加载'
    const stdout = _pyodideInstance._lanquStdout as string[]
    stdout.length = 0
    try {
      await _pyodideInstance.runPythonAsync(line)
    } catch (e: any) {
      return (e?.message || String(e) || '未知错误').replace(/, in <exec>|<exec>$/g, '').trim()
    }
    return stdout.join('')
  }, [])

  return { isReady, loading, error, init, runCode, progress, statusText, resetTurtle, runConsoleLine }
}
