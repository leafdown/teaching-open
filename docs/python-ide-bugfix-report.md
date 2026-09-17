# Python IDE + 全站测试与修复报告

日期：2026-09-17 · 范围：`student-web/**` 全站 · 验证环境：线上 https://teacher.lanqu.vip（修复前）+ 本地 dev/构建（修复后）

## 一、确认的 Bug 与修复

### Bug 1：任意代码都弹出 Turtle 浮窗（用户报告）
- **现象**：运行 `print("hello world")` 等完全不含 turtle 的代码，第一次点「运行」就会弹出 🐢 Turtle 浮窗。
- **根因**：Pyodide 加载时注入的 shim 末尾执行 `sys.modules['turtle'] = _TurtleModule()`，而 `_TurtleModule.__init__` 里 `self._default = _Turtle()`，`_Turtle.__init__` 又调用 `_ensure_floating_canvas()` → **窗口在 shim 注入时无条件创建**，与用户代码无关。
- **修复**（`usePyodide.ts`）：
  - `_TurtleModule._default` 改为懒创建（`_d()`），`import turtle`、实例化 `Turtle()` 都不再开窗；
  - 窗口改由**实际绘制动作**触发（`_tx/_ty` 中的 `_ensure_window()`）；
  - `_turtle_reset()` 不再重建窗口（旧逻辑：注释里出现 "turtle" 一词就会触发 reset→开窗），只清空画布/记录；
  - `detectTurtleMode()` 收紧判定：仅 `import turtle/pygame`、`from turtle import …` 才启用 turtle 模式（旧正则 `/\bturtle\b/` 连注释、字符串都命中）；
  - 用户关闭窗口后再次绘制仍会自动重建（保留原行为）。

### Bug 2：input() 提示语要等输入之后才显示（用户报告）
- **现象**：运行 `a = input("输入一个整数:")`，终端只有一个 `>`，提示语完全不可见；提交后才看到「输入一个整数:42」。
- **根因**：`_input_builtin` 里 `print(p, end="")` 依赖 batched stdout 输出，而 batched **缓冲到换行才触发**，`sys.stdout.flush()` 也不会触发回调 → 提示语滞留在缓冲区。
- **修复**：去掉 Python 侧的 `print`/`flush`；提示语由 JS 桥（`window.__pythonInputShow`）**直接写入输出面板**（`index.tsx` 挂载时注册，替代原先仅在 handleRun 内注册）。提交后 `handleInputSubmit` 把用户输入拼回提示行，呈现 `输入一个整数:42` 的终端效果。

### Bug 3：Console 完全不可用（用户报告，多个子问题）
1. **表达式无回显**：`1+1` 回车后什么都不显示（`runConsoleLine` 只返回 stdout，丢弃返回值）。→ 修复：表达式值以 REPL 风格回显（`'字符串'` 带引号、赋值语句不回显）。
2. **多行语句必报错**：`for i in range(3):` 进多行模式后，`>>> ` 前缀被一并送进解释器 → SyntaxError。→ 修复：执行前逐行 strip `>>> ` 前缀。
3. **Console 里 input() 永久挂起**：`__pythonInputShow` 只在 handleRun 注册，Console 直接调用 input() 时输入框永远不出现、协程挂死。→ 修复：挂载时全局注册；触发时自动切回「终端」tab 显示提示语和输入框。
4. **报错信息吓人**：REPL 显示完整 Pyodide 内部 traceback。→ 修复：只显示最后一行异常（如 `ZeroDivisionError: division by zero`）。
5. **多行 print 输出粘连**：batched stdout 不含换行，`行 0行 1行 2` 粘成一行。→ 修复：`stdout.join('\n')`。

### Bug 4：运行结束后输出重复一遍
- **现象**：每个 print 行出现两次（流式输出后，`--- 执行完成 ---` 又把整个 stdout 追加一遍）。
- **修复**（`index.tsx` handleRun）：完成行不再重复追加 stdout，仅在无输出时补「✅ 执行成功」。

### Bug 5：5 秒定时强杀 + 死循环无法中断
- **现象 A**：`SharedArrayBuffer` 中断缓冲 5 秒后被强写 SIGINT —— 超过 5 秒的正常程序（如示例「螺旋线」、speed(1) 动画）会被误杀（实测螺旋线需 5.11s）。
- **现象 B**：线上无 Cross-Origin-Isolation 响应头，`SharedArrayBuffer` 不可用 → 无法中断，死循环直接冻结页面，且没有停止按钮。
- **修复**：移除 5s 定时强杀；新增「停止」按钮（运行中显示），写入中断缓冲触发 `KeyboardInterrupt`（显示「⏹️ 执行已停止」）；无 COI 时点击给出明确提示。
- **部署配套**：`web/nginx/default.conf`、`资料/nginx.example.conf` 已在 COOP 旁补充 `Cross-Origin-Embedder-Policy: credentialless` —— **同步到服务器后** `crossOriginIsolated=true`，停止按钮即可真正中断死循环。

### Bug 6：pygame shim 语法/逻辑错误（新发现）
- `@property def right(self): …` 写在同一行 → **非法 Python 语法**，整个 PYGAME_SHIM 注入失败（线上被 pygame-ce 安装掩盖，但 Console 直接 `import pygame` 会 ModuleNotFoundError）。
- `_pygameMod` 缺 `mouse` 属性 → 渲染补丁注入到一半 AttributeError 中断。
- `init=lambda:None` 类体内 lambda 不接收 self → `pygame.init()` TypeError。
- **最关键**：shim 注入时占住 `sys.modules['pygame']`，导致 `loadPackage('pygame-ce')` 安装的真实模块**永远 import 不到**。
- **修复**：修正语法；补 `_mouse`；`init/quit` 用 `staticmethod`；`pygame-ce` 安装成功后 `sys.modules.pop('pygame')` 再打补丁，并对 `init/quit` 做安全化 patch。实测像素级渲染正确（背景 fill + 圆形颜色精确命中），日志输出 `pygame-ce 2.5.6.dev2`。

### Bug 7：终端报错显示完整内部 traceback（新发现）
- **修复**：`formatPyError()` 浓缩为「第 N 行 · 异常: 说明」，handleRun/选中运行/Console 三处统一。

### 其他修复
- 文件写入改用 `py.FS.writeFile`（避免文件名含引号注入 `open('${name}')` 报错、大数组拼接性能差），失败时回退 Python open() 且文件名 `JSON.stringify` 转义；
- `turtle.color(r,g,b)` 支持 0~1 浮点/0~255 整数（示例「星空」原来直接 TypeError）；`pencolor()/pensize()/speed()` 支持无参读取；
- `turtle.bgcolor()` 真正刷画布背景（原来只存值不生效）；`turtle.write()` 从 print 到终端改为画布绘制并记录 SVG 导出；
- Console 欢迎语与实际行为一致（原提示 Shift+Enter 换行但单行 input 不支持）。

## 二、回归测试

**Node + Pyodide 无头逻辑测试**（`/tmp/shimtest`，与线上相同注入顺序 + 无头 DOM 桩）：39/39 通过
- turtle：import/实例化不开窗、绘制才开窗、reset 不重建、关窗后重建、color/bgcolor/write/fill/circle
- input：桥即时触发、stdout 无污染、返回值正确、只触发一次
- Console：表达式回显、赋值无回显、多行块执行
- pygame：init/quit、mouse/key、Rect 属性、draw 静默绘制
- detectTurtleMode 7 组正负用例

**浏览器端到端**（本地 dev，15 个场景）：全部通过
纯 print 无弹窗且输出不重复 ｜ input 全流程 ｜ Console REPL 全部子项 ｜ turtle 像素级验证（143460 黑色背景像素 + 蓝色线条）｜ 报错「第 2 行 · ZeroDivisionError」｜ 动态文件 import ｜ 关窗重建 ｜ 停止按钮提示 + 7.89s 长程序完整运行 ｜ 示例螺旋线 5.11s ｜ 代码提示 ｜ pygame 像素命中 ｜ 嵌套多行块 ｜ 代码片段 ｜ 无页面 JS 错误 ｜ 冷加载 ~5s（CDN 缓存后）

**生产构建**：`npm run build` 通过。

## 三、全站测试（第二轮）

### Bug 8：公开页 /works 未登录被硬跳 /login（新发现）
- **现象**：未登录访问 `/works`（路由定义为公开页，对齐旧 Vue whiteList）→ 整页跳转到 /login。
- **根因**：`WorkList` 挂载即调用需登录的 `mineWorks`（`GET /teaching/teachingWork/mine`）→ 401 → `handleTokenExpired()` 执行 `location.href='/login'` 整页跳转。
- **修复**：`MineWorks`/`MineWorkTable` 未登录时不发请求（`useQuery enabled`），显示「登录后可查看和管理我的作品 + 去登录」引导；`/works?type=x` 排行榜（公开接口）不受影响。首页「精选作品/最赞作品 → 查看全部」入口指向公开排行榜，未登录可正常浏览。

### Bug 9：学生端首屏主 chunk 2.0MB（性能，新发现）
- **根因**：`router/index.tsx` **静态导入** `AdminLayout` → 静态导入 `SimpleCrud` → `CrudModal` → `RichEditor`（wangeditor 全量）等仅管理端使用的重组件，全部打进学生端首屏。
- **修复**：AdminLayout 改为 `lazy()` + Suspense 包裹，管理端代码与学生端首屏彻底分离。
- **效果**：主 chunk **2,017,907 → 702,128 字节（-65%）**，wangeditor 从主 chunk 剥离（学生端 gzip 传输量约 -65%）。

### 排查为「非 Bug」的项
- courses/news/contest 显示「暂无」：后端接口返回 `records:[]`、字典为空 —— **线上数据为空**，非前端缺陷（接口 `getHomeCourse`/`getDictItems` 直测确认）。
- Landing 首屏封面图偶发加载失败：storage CDN 偶发抖动，刷新自愈，URL 本身 200。
- 注册页用户名查重/手机号校验：实测正常（"用户名已存在!"、"请输入正确的手机号"均正确触发；通过时无提示是 antd 默认行为）。
- auth.store 持久化、token 失效登出链路、`/work-detail`（观看数/点赞/评论）、`/friend-detail` 渲染：无问题。

### 测试覆盖矩阵
| 区域 | 结果 |
|---|---|
| 公开页 `/` `/home` `/works` `/courses` `/news` `/contest` | ✅（修复 /works 硬跳） |
| 详情页 `/work-detail` `/friend-detail` | ✅ |
| 登录/注册（验证码显示、表单校验、查重、密码强度） | ✅ |
| 登录后页 `/center` `/assets` `/settings` `/ppt` `/admin` | 静态审查通过；真实登录态需人工验证（注册依赖短信验证码，无法自动化） |
| 移动端 390px 视口 6 页 | ✅ 无横向溢出 |
| Python IDE | 见第一轮（39/39 + 15 场景） |
| 性能 | 主 chunk -65%；懒加载路由全部正常（生产 preview 冒烟） |

## 四、已知限制（非缺陷，已缓解）
1. 无 COI 头的环境下死循环仍会冻结页面（浏览器单线程限制）：有预运行「while True 缺 break」提示 + 停止按钮明确提示；部署 COEP 后即可真正中断。
2. 内嵌 webview（自动化测试浏览器）中 Pyodide 大内存编译可能触发渲染进程崩溃 —— 桌面 Chrome/Edge 正常。
3. dev 环境 HMR 热重载会重建 Pyodide 实例导致 REPL 变量丢失，仅开发态现象。

## 四、上线步骤
```bash
cd student-web && npm run build && bash scripts/deploy.sh   # 前端 rsync 到服务器
# 服务器 nginx 同步 Cross-Origin-Embedder-Policy: credentialless 后 reload（启用死循环中断）
```
