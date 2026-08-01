// Python IDE 主组件 — 多文件 + FileTree + 终端内联输入 + Turtle
import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Spin, message, Dropdown, Modal } from 'antd'
import { PlayCircleOutlined, BugOutlined, EyeOutlined, ShareAltOutlined, CheckOutlined, CloudUploadOutlined, FormatPainterOutlined, CodeOutlined, ArrowLeftOutlined, FolderAddOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { QRCodeCanvas } from 'qrcode.react'
import Editor from '@monaco-editor/react'
import { usePyodide } from './usePyodide'
import FileTree from './FileTree'
import OutputPanel from './OutputPanel'
import { submitWork, studentWorkInfo } from '@/api/work.api'
import { workFileUrl, fileUrl, uploadFile } from '@/api/common.api'
import AssetPanel from './AssetPanel'
import { saveDraft, loadDraft, removeDraft } from '@/utils/draftStorage'
import JSZip from 'jszip'

const DEFAULT_CODE = `print("Welcome to Python IDE!")
name = input("What's your name? ")
print(f"Hello, {name}!")`

// 文件类型: text(源码/文本) 或 binary(图片/声音等资源)
interface FileItem {
  name: string
  code: string
  type?: 'text' | 'binary'
  dataUrl?: string // binary 文件的 dataURL(base64)
  size?: number
}

// 代码片段模板
const SNIPPETS = [
  { key:'print', label:'print()', code:"print()\n" },
  { key:'for', label:'for 循环', code:"for i in range(10):\n    print(i)\n" },
  { key:'if', label:'if 判断', code:"if x > 0:\n    print('positive')\nelse:\n    print('negative')\n" },
  { key:'func', label:'函数定义', code:"def my_function(param):\n    \"\"\"文档字符串\"\"\"\n    return param\n" },
  { key:'class', label:'类定义', code:"class MyClass:\n    def __init__(self):\n        pass\n" },
  { key:'turtle', label:'🐢 Turtle 模板', code:"import turtle\nt = turtle.Turtle()\nt.speed(3)\nt.color('blue')\n\nfor i in range(4):\n    t.forward(100)\n    t.right(90)\n\n# 注意: Pyodide 下不需要 turtle.done()\n" },
  { key:'pygame', label:'🎮 Pygame 模板', code:"import pygame\npygame.init()\nscreen = pygame.display.set_mode((400,300))\npygame.display.set_caption('My Game')\n\n# Game loop\nrunning = True\nwhile running:\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT:\n            running = False\n    screen.fill((255,255,255))\n    pygame.draw.circle(screen,(255,0,0),(200,150),50)\n    pygame.display.flip()\n\npygame.quit()\n" },
]

// 教学示例
const EXAMPLES: { key: string; label: string; code: string }[] = [
  {key:'spiral', label:'🌀 螺旋线', code:`import turtle
t = turtle.Turtle()
t.speed(10)
colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
for i in range(100):
    t.pencolor(colors[i % 6])
    t.forward(i)
    t.right(59)
`},
  {key:'star', label:'⭐ 星空', code:`import turtle, random
t = turtle.Turtle()
t.speed(0)
turtle.bgcolor('black')
t.pensize(2)
for _ in range(50):
    x = random.randint(-180, 180)
    y = random.randint(-180, 180)
    size = random.randint(5, 30)
    t.penup(); t.goto(x, y); t.pendown()
    t.color(random.random(), random.random(), random.random())
    for _ in range(5):
        t.forward(size); t.right(144)
t.hideturtle()
`},
  {key:'tree', label:'🌳 分形树', code:`import turtle
t = turtle.Turtle()
t.speed(0)
t.left(90)
t.color('brown')

def branch(len):
    if len < 10: return
    t.forward(len)
    t.left(30); branch(len * 0.7); t.right(60)
    branch(len * 0.7); t.left(30)
    t.backward(len)

branch(60)
t.hideturtle()
`},
  {key:'pattern', label:'🌸 彩色花', code:`import turtle
t = turtle.Turtle()
t.speed(10)
turtle.bgcolor('black')
for i in range(36):
    t.color(f'hsl({i*10}, 100%, 60%)')
    for _ in range(4):
        t.forward(100); t.right(90)
    t.right(10)
t.hideturtle()
`},
  {key:'snowflake', label:'❄️ 雪花', code:`import turtle
t = turtle.Turtle()
t.speed(0)
t.pensize(2)
t.color('cyan')
turtle.bgcolor('navy')

def koch(len, depth):
    if depth == 0:
        t.forward(len); return
    for angle in [60, -120, 60, 0]:
        koch(len/3, depth-1); t.right(angle)

for _ in range(3):
    koch(120, 3); t.right(120)
t.hideturtle()
`},
]

// Console 欢迎语
const CONSOLE_WELCOME = 'Python 3.12 (Pyodide) — 输入代码后回车执行, Shift+Enter 换行'

// Monaco 补全模块列表
const COMPLETION_MODULES = ['turtle','pygame','numpy','math','random','time','datetime','json','os','sys','re','collections','itertools','functools','pathlib']
const COMPLETION_BUILTINS = ['print','input','len','range','int','str','float','list','dict','set','tuple','open','type','isinstance','enumerate','zip','map','filter','sorted','reversed','abs','max','min','sum','round']
const COMPLETION_TURTLE = ['turtle.Turtle','turtle.Screen','turtle.forward','turtle.backward','turtle.right','turtle.left','turtle.penup','turtle.pendown','turtle.color','turtle.speed','turtle.goto','turtle.circle','turtle.begin_fill','turtle.end_fill','turtle.write']
const COMPLETION_PYGAME = ['pygame.init','pygame.display.set_mode','pygame.display.set_caption','pygame.display.flip','pygame.draw.rect','pygame.draw.circle','pygame.draw.line','pygame.event.get','pygame.quit','pygame.Rect','pygame.Surface','pygame.image.load','pygame.font.SysFont','pygame.time.delay','pygame.mixer.Sound','pygame.key.get_pressed']
const COMPLETION_NUMPY = ['np.array','np.zeros','np.ones','np.arange','np.linspace','np.reshape','np.random.rand','np.random.randint','np.sum','np.mean','np.max','np.min','np.sqrt','np.sin','np.cos','np.pi','np.exp']

let _completionRegistered = false
function registerPythonCompletion(monaco: any) {
  if (_completionRegistered) return
  _completionRegistered = true
  monaco.languages.registerCompletionItemProvider('python', {
    triggerCharacters: ['.', '('],
    provideCompletionItems: function(model: any, position: any) {
      const word = model.getWordUntilPosition(position)
      const range = { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn }
      const suggestions: any[] = [
        ...COMPLETION_MODULES.map((m: string) => ({
          label: m, kind: monaco.languages.CompletionItemKind.Module, insertText: m, range, detail: 'Python 模块'
        })),
        ...COMPLETION_BUILTINS.map((f: string) => ({
          label: f, kind: monaco.languages.CompletionItemKind.Function, insertText: f+'()', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range, detail: '内置函数'
        })),
        ...COMPLETION_TURTLE.map((f: string) => ({
          label: f, kind: monaco.languages.CompletionItemKind.Function, insertText: f.replace('turtle.',''), range, detail: 'turtle'
        })),
        ...COMPLETION_PYGAME.map((f: string) => ({
          label: f, kind: monaco.languages.CompletionItemKind.Function, insertText: f.replace('pygame.',''), range, detail: 'pygame'
        })),
        ...COMPLETION_NUMPY.map((f: string) => ({
          label: f, kind: monaco.languages.CompletionItemKind.Function, insertText: f.replace('np.',''), range, detail: 'numpy'
        })),
      ]
      return { suggestions }
    }
  })
}

export default function PythonIDE({ readOnly = false }: { readOnly?: boolean }) {
  const [params] = useSearchParams()
  const { isReady, loading, init, runCode, progress, resetTurtle, runConsoleLine, statusText, error } = usePyodide()
  const [files, setFiles] = useState<FileItem[]>([{ name: 'main.py', code: params.get('code') || DEFAULT_CODE }])
  const workName = params.get('workName') || 'Python作品'
  const additionalId = params.get('additionalId') || undefined
  const departId = params.get('departId') || undefined
  const [activeFile, setActiveFile] = useState('main.py')
  const [activeDir, setActiveDir] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const [awaitingInput, setAwaitingInput] = useState(false)
  const [inputBuffer, setInputBuffer] = useState('')
  const [submitResult, setSubmitResult] = useState<{ id: string } | null>(null)
  const editorRef = useRef<any>(null)
  const inputResolveRef = useRef<((v: string) => void) | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const saveTimerRef = useRef<number | null>(null)
  const runningRef = useRef(false)
  const [showAssets, setShowAssets] = useState(false)

  // 从资源库添加文件到项目(固定放入 resources/ 目录)
  const addAssetFile = (name: string, dataUrl: string, size: number) => {
    const fullPath = 'resources/' + name
    setFiles(prev => [...prev, { name: fullPath, code: '', type: 'binary', dataUrl, size }])
  }

  const currentFile = files.find(f => f.name === activeFile) || files[0]
  const currentCode = currentFile?.code || ''

  // 从路径中提取文件名(用于 tab 显示)
  const basename = (path: string) => path.split('/').pop() || path

  // 序列化多文件为 ZIP: 所有 .py + 资源文件打包
  const serializeFiles = async (): Promise<string> => {
    if (files.length === 1 && files[0].name === 'main.py' && files[0].type !== 'binary') {
      return files[0].code // 单文件纯文本向后兼容
    }
    const zip = new JSZip()
    for (const f of files) {
      if (f.type === 'binary' && f.dataUrl) {
        const base64 = f.dataUrl.split(',')[1] || ''
        zip.file(f.name, base64, { base64: true })
      } else {
        zip.file(f.name, f.code)
      }
    }
    zip.file('__manifest__.json', JSON.stringify({
      files: files.map(f => ({ name: f.name, type: f.type || 'text' })),
      order: files.map(f => f.name),
    }))
    const blob = await zip.generateAsync({ type: 'blob' })
    const fileName = `python_${Date.now()}.zip`
    // 上传 ZIP 到服务器
    try {
      const res = await uploadFile(blob, fileName, 'python-work')
      return res.key || res.url || fileName
    } catch (e: any) {
      message.error('上传文件失败: ' + (e.message || ''))
      throw e
    }
  }

  // 解析 ZIP 或纯文本
  const deserializeFiles = async (raw: string): Promise<FileItem[] | null> => {
    if (!raw || !raw.trim()) return null
    // 尝试 ZIP (dataURL 或服务器文件路径)
    // 如果是服务器文件路径(非 dataURL, 非纯 Python 代码)
    const isLikelyZipPath = !raw.startsWith('data:') && !raw.startsWith('#') && !raw.includes('def ') &&
      !raw.includes('import ') && !raw.includes('print(') && raw.length > 5 && /[a-zA-Z0-9]/.test(raw)

    let zipData: Blob | null = null

    if (raw.startsWith('data:')) {
      try {
        const resp = await fetch(raw)
        zipData = await resp.blob()
      } catch {}
    } else if (isLikelyZipPath) {
      // 服务器文件路径: 先下载
      try {
        const url = fileUrl(raw)
        const resp = await fetch(url)
        if (resp.ok && resp.headers.get('content-type')?.includes('zip')) {
          zipData = await resp.blob()
        }
      } catch {}
    }

    if (zipData) {
      try {
        const zip = await JSZip.loadAsync(zipData)
        const manifestStr = zip.file('__manifest__.json')
        let manifest: { files: { name: string; type: string }[]; order: string[] } | null = null
        if (manifestStr) {
          try {
            const text = await manifestStr.async('text')
            manifest = JSON.parse(text)
          } catch {}
        }
        if (manifest?.files) {
          const result: FileItem[] = []
          for (const mf of manifest.files) {
            const file = zip.file(mf.name)
            if (!file) continue
            if (mf.type === 'binary') {
              const blob = await file.async('blob')
              const dataUrl = await new Promise<string>(resolve => {
                const r = new FileReader()
                r.onload = () => resolve(r.result as string)
                r.readAsDataURL(blob)
              })
              result.push({ name: mf.name, code: '', type: 'binary', dataUrl, size: blob.size })
            } else {
              const text = await file.async('text')
              result.push({ name: mf.name, code: text, type: 'text' })
            }
          }
          return result
        }
        // ZIP 无 manifest: 尝试提取所有 .py 文件
        const entries: FileItem[] = []
        const pyFiles: string[] = []
        const resourceFiles: string[] = []
        zip.forEach((relPath, entry) => {
          if (!entry.dir) {
            if (relPath.endsWith('.py')) pyFiles.push(relPath)
            else if (relPath !== '__manifest__.json') resourceFiles.push(relPath)
          }
        })
        for (const p of pyFiles.sort()) {
          const content = await zip.file(p)?.async('text') || ''
          entries.push({ name: p, code: content, type: 'text' })
        }
        for (const r of resourceFiles) {
          const file = zip.file(r)
          if (file) {
            const blob = await file.async('blob')
            const dataUrl = await new Promise<string>(resolve => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result as string)
              reader.readAsDataURL(blob)
            })
            entries.push({ name: r, code: '', type: 'binary', dataUrl, size: blob.size })
          }
        }
        if (entries.length > 0) return entries
      } catch {}
    }
    // 纯文本格式(向后兼容)
    return null
  }

  // 自动保存草稿到 IndexedDB（防抖 2s）
  useEffect(() => {
    if (readOnly) return
    const workId = params.get('workId')
    const key = workId ? 'python_ide_draft_' + workId : 'python_ide_draft'
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = window.setTimeout(() => {
      if (files.some(f => f.code.trim() || f.type === 'binary')) {
        const toSave = files.map(f => ({
          name: f.name, code: f.code, type: f.type, dataUrl: f.dataUrl, size: f.size,
        }))
        saveDraft(key, { files: toSave, updatedAt: Date.now() }).catch(() => {
          // IndexedDB 也失败时降级存文件名
          const slimFiles = files.map(f => ({
            name: f.name, code: f.code, type: f.type,
            dataUrl: f.type === 'binary' ? '__TOO_LARGE__' : undefined, size: f.size,
          }))
          saveDraft(key, { files: slimFiles, updatedAt: Date.now() }).catch(() => {})
        })
      }
    }, 2000)
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current) }
  }, [readOnly, files, params.get('workId')])

    // 加载已有作品(workId) 或恢复草稿
  useEffect(() => {
    let cancelled = false
    const workId = params.get('workId')
    if (!workId) {
      loadDraft<any>('python_ide_draft').then(draft => {
        if (cancelled || !draft) return
        if (draft.files && draft.files.length > 0 && currentCode === DEFAULT_CODE) {
          setFiles(draft.files.map((f: any) => ({
            name: f.name, code: f.code || '', type: f.type || 'text',
            dataUrl: f.dataUrl, size: f.size,
          })))
          const firstPy = draft.files.find((f: any) => f.name.endsWith('.py'))
          if (firstPy) setActiveFile(firstPy.name)
        } else if (draft.code && draft.code.trim() && currentCode === DEFAULT_CODE) {
          setFiles(prev => [{ ...prev[0], code: draft.code }])
        }
      }).catch(() => {})
      return
    }
    if (params.get('code')) return
    loadDraft<any>('python_ide_draft_' + workId).then(draft => {
      if (cancelled || !draft) return
      if (draft.files && draft.files.length > 0) {
        setFiles(draft.files.map((f: any) => ({
          name: f.name, code: f.code || '', type: f.type || 'text',
          dataUrl: f.dataUrl, size: f.size,
        })))
        const firstPy = draft.files.find((f: any) => f.name.endsWith('.py'))
        if (firstPy) setActiveFile(firstPy.name)
        return
      } else if (draft.code && draft.code.trim()) {
        setFiles(prev => [{ ...prev[0], code: draft.code }])
        return
      }
      loadFromServer(workId)
    }).catch(() => loadFromServer(workId))
    return () => { cancelled = true }
  }, [params, params.get('workId')])

  function loadFromServer(workId: string) {
    studentWorkInfo(workId).then(w => {
      if (!w) return
      const url = workFileUrl(w)
      if (url) {
        const isZipUrl = url.match(/\.zip/i) || url.includes('python-work')
        if (isZipUrl) {
          fetch(url).then(async r => {
            const blob = await r.blob()
            const reader = new FileReader()
            reader.onload = async () => {
              const dataUrl = reader.result as string
              const parsed = await deserializeFiles(dataUrl)
              if (parsed && parsed.length > 0) {
                setFiles(parsed)
                const firstPy = parsed.find(f => f.name.endsWith('.py'))
                if (firstPy) setActiveFile(firstPy.name)
              }
            }
            reader.readAsDataURL(blob)
          }).catch(() => setOutput(prev => [...prev, '\u26a0\ufe0f \u52a0\u8f7d\u4f5c\u54c1\u6587\u4ef6\u5931\u8d25']))
          return
        }
        fetch(url).then(r => r.text()).then(async t => {
          if (t && t.trim()) {
            const parsed = await deserializeFiles(t)
            if (parsed && parsed.length > 0) {
              setFiles(parsed)
              const firstPy = parsed.find(f => f.name.endsWith('.py'))
              if (firstPy) setActiveFile(firstPy.name)
              return
            }
            setFiles(prev => [{ ...prev[0], code: t }])
          }
        }).catch(() => setOutput(prev => [...prev, '\u26a0\ufe0f \u52a0\u8f7d\u4f5c\u54c1\u6587\u4ef6\u5931\u8d25']))
      }
    }).catch(() => {
      setOutput(prev => [...prev, '\u26a0\ufe0f \u52a0\u8f7d\u4f5c\u54c1\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u6216\u91cd\u65b0\u767b\u5f55'])
    })
  }const handleInputSubmit = () => {
    const val = inputBuffer
    // 优先用 window.__pythonInputResolve (Pyodide input() 桥接)
    const globalResolve = (window as any).__pythonInputResolve
    if (globalResolve) {
      globalResolve(val)
      setAwaitingInput(false)
      setInputBuffer('')
      setOutput(prev => [...prev.slice(0, -1), (prev[prev.length - 1] || '') + val])
      return
    }
    // fallback: 旧 inputResolveRef 方式
    if (!inputResolveRef.current) return
    const resolve = inputResolveRef.current
    inputResolveRef.current = null
    setAwaitingInput(false)
    setInputBuffer('')
    resolve(val)
    setOutput(prev => [...prev.slice(0, -1), (prev[prev.length - 1] || '') + val])
  }

  // Console 状态
  const [consoleMultiline, setConsoleMultiline] = useState(false) // 多行输入模式
  const [consoleMultiBuffer, setConsoleMultiBuffer] = useState('') // 多行缓存
  const [consoleHistory, setConsoleHistory] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem('python_console_history')
      return saved ? JSON.parse(saved) : [CONSOLE_WELCOME]
    } catch { return [CONSOLE_WELCOME] }
  })
  const [consoleInput, setConsoleInput] = useState('')
  const [consoleMode, setConsoleMode] = useState(false) // false=输出 tab, true=Console tab
  const [consoleHistoryIndex, setConsoleHistoryIndex] = useState(-1) // ↑ 历史索引

  // Console 历史持久化(sessionStorage, tab 切换保留)
  useEffect(() => {
    try { sessionStorage.setItem('python_console_history', JSON.stringify(consoleHistory)) } catch {}
  }, [consoleHistory])

  const handleConsoleSubmit = useCallback(async () => {
    await init().catch(() => {})

    // 多行输入模式
    if (consoleMultiline) {
      const newBuffer = consoleMultiBuffer + '\n' + consoleInput
      setConsoleMultiBuffer(newBuffer)
      setConsoleInput('')

      // 空行 + 缩进归零 → 执行
      if (!consoleInput.trim()) {
        const fullCode = newBuffer
        setConsoleHistory(prev => [...prev, ...fullCode.split('\n').slice(1)]) // 显示完整代码块（去掉第一行）
        setConsoleMultiline(false)
        setConsoleMultiBuffer('')
        try {
          const res = await runConsoleLine(fullCode)
          if (res) setConsoleHistory(prev => [...prev, res])
        } catch (e: any) {
          setConsoleHistory(prev => [...prev, `❌ ${(e?.message || String(e)).replace(/File "<exec>",?\s*/g, '').replace(/, in <exec>/g, '').trim()}`])
        }
      }
      return
    }

    // 单行模式
    const line = consoleInput
    if (!line.trim()) return
    setConsoleHistory(prev => [...prev, `>>> ${line}`])
    setConsoleInput('')
    setConsoleHistoryIndex(-1)

    if (line.endsWith(':')) {
      setConsoleMultiline(true)
      setConsoleMultiBuffer(`>>> ${line}`)
      return
    }

    try {
      const res = await runConsoleLine(line)
      if (res) setConsoleHistory(prev => [...prev, res])
    } catch (e: any) {
      setConsoleHistory(prev => [...prev, `❌ ${(e?.message || String(e)).replace(/File "<exec>",?\s*/g, '').replace(/, in <exec>/g, '').trim()}`])
    }
  }, [init, runConsoleLine, consoleInput, consoleMultiline, consoleMultiBuffer])

  const handleRun = useCallback(async () => {
    if (runningRef.current) return
    runningRef.current = true
    const py = await init().catch(() => { message.error('Python 环境加载失败'); return null })
    if (!py) { runningRef.current = false; return }
    setRunning(true); setOutput([]); setAwaitingInput(false)
    // 清理 pending 的 input 等待
    if (inputResolveRef.current) { inputResolveRef.current(''); inputResolveRef.current = null }
    // 注册 Python input() 回调
    ;(window as any).__pythonInputShow = (prompt: string) => {
      setAwaitingInput(true)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
    // 多文件: 通过 Pyodide 的 Python 文件 API 写入虚拟文件系统
    // 先收集所有目录，一次性创建（包括空目录）
    const dirsToCreate = new Set<string>()
    for (const f of files) {
      if (f.name === 'main.py') continue
      // 尝试从文件路径推断目录
      let dir = ''
      if (f.name.includes('/')) {
        dir = f.name.substring(0, f.name.lastIndexOf('/'))
        dirsToCreate.add(dir)
        // 如果是深层目录，父目录也要创建
        let parent = dir
        while (parent.includes('/')) {
          parent = parent.substring(0, parent.lastIndexOf('/'))
          dirsToCreate.add(parent)
        }
      }
    }
    if (dirsToCreate.size > 0) {
      const cmds = Array.from(dirsToCreate).map(d => `os.makedirs('${d}', exist_ok=True)`).join('\n')
      await py.runPythonAsync(`import os\n${cmds}`)
    }
    for (const f of files) {
      if (f.name === 'main.py') continue
      try {
        if (f.type === 'binary' && f.dataUrl) {
          const resp = await fetch(f.dataUrl)
          const blob = await resp.blob()
          const arr = new Uint8Array(await blob.arrayBuffer())
          await py.runPythonAsync(`open('${f.name}', 'wb').write(bytes(${JSON.stringify(Array.from(arr))}))`)
          setOutput(prev => [...prev, `📦 加载资源: ${f.name} (${blob.size} bytes)`])
        } else {
          await py.runPythonAsync(`open('${f.name}', 'w').write(${JSON.stringify(f.code)})`)
        }
      } catch (e: any) {
        setOutput(prev => [...prev, `⚠️ 写入文件 ${f.name} 失败: ${e.message}`])
      }
    }
    const startTime = performance.now()
    try {
      // 只执行 main.py, 其他文件通过 fs.writeFile 写入后被 Python import 机制自动加载
      const mainCode = files.find(f => f.name === 'main.py')?.code || ''
      let fullCode = mainCode
      // 如果只有 main.py 且无二进制资源, 用原有拼接方式保持向后兼容(无 import 场景)
      const hasExtraPyFiles = files.some(f => f.name !== 'main.py' && f.type !== 'binary')
      if (!hasExtraPyFiles) {
        fullCode = files.map(f => f.name === 'main.py' ? f.code : `# --- ${f.name} ---\n${f.code}`).join('\n\n')
      }
      // 代码质量检测
      const hints: string[] = []
      if (fullCode.includes('turtle.done()')) hints.push('💡 turtle.done() 会自动跳过，不必手动调用')
      if (/while\s+True\s*:/.test(fullCode) && !/break/.test(fullCode)) hints.push('⚠️ while True 循环缺少 break，可能无限循环')
      if (/except\s*:/.test(fullCode) && !/except\s+\w/.test(fullCode)) hints.push('💡 建议: except: 会捕获所有异常，最好指定异常类型')
      if (/\binput\b/.test(fullCode) && !/int\(|float\(/.test(fullCode)) hints.push('💡 input() 返回字符串，数字运算前需用 int() 或 float() 转换')
      const useTurtle = /\bturtle\b/.test(fullCode) || /\bpygame\b/.test(fullCode)
      if (hints.length > 0) setOutput(prev => [...prev, '', '── 代码提示 ──', ...hints, ''])
      const result = await runCode(fullCode, useTurtle, (line) => {
        setOutput(prev => [...prev, line])
      })
      const duration = ((performance.now() - startTime) / 1000).toFixed(2)
      setOutput(prev => [...prev, '', `--- 执行完成 (${duration}s) ---`, ...(result.output.length ? result.output : ['✅ 执行成功'])])
    } catch (e: any) {
      setOutput(prev => [...prev, `❌ ${(e?.message || String(e) || '未知错误').replace(/File "<exec>",?\s*/g, '').replace(/, in <exec>/g, '').trim()}`])
    } finally { setRunning(false); runningRef.current = false }
  }, [init, runCode, files])
  const handleRunRef = useRef(handleRun)
  handleRunRef.current = handleRun

  const updateCode = (val: string | undefined) => { setFiles(prev => prev.map(f => f.name === activeFile ? { ...f, code: val || '' } : f)) }
  const addFile = (name: string) => {
    if (files.find(f => f.name === name)) { message.warning('文件已存在'); return }
    setFiles(prev => [...prev, { name, code: '' }]); setActiveFile(name)
  }
  const deleteFile = (name: string) => {
    if (files.length <= 1 || name === 'main.py') { message.warning('不能删除主文件'); return }
    // 如果是目录，删除所有以该目录开头的文件
    const isDir = !name.includes('.') || name.endsWith('/')
    const prefix = name.replace(/\/$/, '') + '/'
    setFiles(prev => prev.filter(f => f.name !== name && !(isDir && f.name.startsWith(prefix))))
    if (activeFile === name || (isDir && activeFile.startsWith(prefix))) setActiveFile('main.py')
  }
  const renameFile = (oldName: string, newName: string) => {
    // 如果是目录重命名，级联更新所有子文件路径
    const isDir = !oldName.includes('.') || oldName.endsWith('/')
    const oldPrefix = oldName.replace(/\/$/, '') + '/'
    setFiles(prev => prev.map(f => {
      if (f.name === oldName) return { ...f, name: newName }
      if (isDir && f.name.startsWith(oldPrefix)) return { ...f, name: f.name.replace(oldPrefix, newName + '/') }
      return f
    }))
    if (activeFile === oldName) setActiveFile(newName)
    else if (isDir && activeFile.startsWith(oldPrefix)) setActiveFile(activeFile.replace(oldPrefix, newName + '/'))
  }
  const handleMoveFile = (oldPath: string, newPath: string) => {
    setFiles(prev => prev.map(f => f.name === oldPath ? { ...f, name: newPath } : f))
    if (activeFile === oldPath) setActiveFile(newPath)
  }
  const insertSnippet = (snippet: string) => {
    const editor = editorRef.current
    if (editor) {
      const pos = editor.getPosition()
      editor.executeEdits('snippet', [{ range: new (window as any).monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column), text: snippet }])
      editor.focus()
    } else {
      setFiles(prev => prev.map(f => f.name === activeFile ? { ...f, code: f.code + '\n' + snippet } : f))
    }
  }

  // 示例代码库
  const loadExample = (code: string) => {
    setFiles(prev => [{ ...prev[0], code }])
    setActiveFile('main.py')
    setOutput(prev => [...prev, '', `── 已加载示例 ──`])
  }

  // ZIP 打包下载
  const downloadZip = async () => {
    const zip = new JSZip()
    for (const f of files) {
      if (f.type === 'binary' && f.dataUrl) {
        const resp = await fetch(f.dataUrl)
        const blob = await resp.blob()
        zip.file(f.name, blob)
      } else {
        zip.file(f.name, f.code)
      }
    }
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'python_project.zip'; a.click()
    URL.revokeObjectURL(url)
    message.success('项目已打包下载')
  }

  // 文件上传处理
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = '' // 允许重复选择同文件
    const name = file.name

    // Zip 文件: 展开为项目
    if (name.endsWith('.zip')) {
      try {
        const zip = await JSZip.loadAsync(file)
        const entries: FileItem[] = []
        const pyFiles: string[] = []
        const resourceFiles: string[] = []
        const dirs = new Set<string>()
        zip.forEach((relPath, entry) => {
          if (entry.dir) {
            // 记录空目录（如 resources/fonts/）
            const dirPath = relPath.replace(/\/$/, '')
            if (dirPath) dirs.add(dirPath)
          } else {
            if (relPath.endsWith('.py')) pyFiles.push(relPath)
            else resourceFiles.push(relPath)
          }
        })
        for (const p of pyFiles.sort()) {
          const content = await zip.file(p)?.async('text') || ''
          entries.push({ name: p, code: content, type: 'text' })
        }
        for (const r of resourceFiles) {
          const entry = zip.file(r)
          if (entry) {
            const blob = await entry.async('blob')
            const dataUrl = await new Promise<string>(resolve => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result as string)
              reader.readAsDataURL(blob)
            })
            entries.push({ name: r, code: '', type: 'binary', dataUrl, size: blob.size })
          }
        }
        // 空目录标记为文本文件（无内容，仅占位）
        for (const d of dirs) {
          if (!entries.some(e => e.name.startsWith(d + '/'))) {
            entries.push({ name: d + '/.empty', code: '', type: 'text' })
          }
        }
        if (entries.length > 0) {
          setFiles(entries)
          // 只打开根目录的 .py 文件，子目录的文件不预先打开
          const rootPy = entries.find(f => f.name.endsWith('.py') && !f.name.includes('/'))
          if (rootPy) setActiveFile(rootPy.name)
          message.success(`已导入 ${entries.length} 个文件`)
          return
        }
      } catch { message.error('ZIP 解析失败') }
      return
    }

    // 单个文件: 放入当前选中目录
    const isImage = /\.(png|jpg|jpeg|gif|svg|bmp|webp|ico)$/i.test(name)
    const isAudio = /\.(mp3|wav|ogg|aac|flac)$/i.test(name)
    const isPy = name.endsWith('.py')
    const fullPath = activeDir ? (activeDir + '/' + name) : name

    if (isImage || isAudio) {
      const dataUrl = await new Promise<string>(resolve => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
      if (files.find(f => f.name === fullPath)) {
        message.warning('文件已存在')
        return
      }
      setFiles(prev => [...prev, { name: fullPath, code: '', type: 'binary', dataUrl, size: file.size }])
      setActiveFile(fullPath)
      message.success(`已添加资源: ${name}`)
    } else if (isPy) {
      const text = await file.text()
      if (files.find(f => f.name === fullPath)) {
        message.warning('文件已存在')
        return
      }
      setFiles(prev => [...prev, { name: fullPath, code: text, type: 'text' }])
      if (fullPath.endsWith('.py')) setActiveFile(fullPath)
      message.success(`已添加: ${name}`)
    } else {
      message.info('支持 .py / .zip / 图片 / 音频 文件')
    }
  }

  const uploadFileInput = <input ref={fileInputRef} type="file" style={{ display: 'none' }}
    accept=".py,.zip,.jpg,.jpeg,.png,.gif,.bmp,.svg,.webp,.mp3,.wav,.ogg" onChange={handleFileUpload} />

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#1e1e1e', color: '#d4d4d4', overflow: 'hidden' }}>
      {/* 工具栏 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 16px', background: '#252526', borderBottom: '1px solid #3e3e42', flexShrink: 0 }}>
        {!readOnly && (
          <ArrowLeftOutlined style={{ color: '#888', cursor: 'pointer', fontSize: 14 }} onClick={() => history.back()} />
        )}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#4ec9b0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        <span style={{ fontWeight: 600, color: '#4ec9b0', marginLeft: 4 }}>Python</span>
        <div style={{ flex: 1 }} />
        {readOnly ? <span style={{ color: '#888', fontSize: 13 }}><EyeOutlined /> 只读</span> : (
          <>{loading && <Spin size="small" style={{ marginRight: 4 }} />}
            {loading && <div style={{width:80,height:4,background:'#3e3e42',borderRadius:2,overflow:'hidden',marginRight:4,verticalAlign:'middle',display:'inline-block'}}><div style={{width:progress+'%',height:'100%',background:'#4ec9b0',transition:'width 0.5s'}} /></div>}
            {loading && <span style={{fontSize:11,color:'#888',marginRight:4}}>{Math.min(progress,99)}%</span>}
            {loading && statusText && <span style={{fontSize:11,color:'#888',marginRight:8}}>{statusText}</span>}
            {!loading && error && <span style={{fontSize:11,color:'#f87171',marginRight:8}}>❌ {error}</span>}
            <Button size="small" icon={<PlayCircleOutlined />} onClick={handleRun} loading={running} disabled={loading}
            style={{ background: '#2ea043', borderColor: '#2ea043', color: '#fff', border: 'none' }}>运行</Button>
            <Button size="small" icon={<BugOutlined />} onClick={() => {
              const tips = [
                '── Python 调试技巧 ──',
                '1. 用 print() 输出变量值来调试',
                '2. 用 type(variable) 检查变量类型',
                '3. 用 dir(object) 查看对象属性和方法',
                '4. 用 import pdb; pdb.set_trace() 设置断点（实验性）',
                '5. 用 try/except 捕获异常并打印错误信息',
              ]
              setOutput(prev => [...prev, '', ...tips])
            }}
            style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>调试</Button>
            <Button size="small" icon={<FormatPainterOutlined />} onClick={() => {
              const lines = currentCode.split('\n')
              const formatted = lines.map(l => l.replace(/\t/g, '    ').replace(/\s+$/, '')).join('\n')
              const newFiles = files.map(f => f.name === activeFile ? { ...f, code: formatted } : f)
              setFiles(newFiles)
              message.success('已格式化')
            }}
            style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>格式化</Button>
            <Dropdown menu={{items: SNIPPETS.map(s => ({key:s.key, label:s.label, onClick:()=>insertSnippet(s.code)}))}} trigger={['click']}>
              <Button size="small" icon={<CodeOutlined />} style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>代码片段</Button>
            </Dropdown>
            <Button size="small" icon={<ShareAltOutlined />} onClick={() => {
              const allCode = files.map(f => `# --- ${f.name} ---\n${f.code}`).join('\n\n')
              const md = '' + location.href + '\n\n```python\n' + allCode.slice(0, 2000) + '\n```'
              navigator.clipboard?.writeText(md).then(() => message.success('链接+代码已复制')).catch(() => message.success('链接已复制'))
            }} style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>分享</Button>
            <Button size="small" icon={<CloudUploadOutlined />} onClick={async () => {
              try {
                const workFile = await serializeFiles()
                const res = await submitWork({ workName, workType: 4, workStatus: 1, workFile, workScene: 'python-ide', additionalId, departId })
                setSubmitResult(res)
                // 提交成功后清除草稿缓存
                const workId = params.get('workId')
                removeDraft(workId ? "python_ide_draft_" + workId : "python_ide_draft")
                message.success('提交成功')
              } catch(e: any) {
                const msg = (e?.message || '') as string
                if (/Token|登录|未登录|过期/i.test(msg)) {
                  message.warning('登录已过期，请在右上方重新登录后再提交。草稿已自动保存到本地。')
                } else {
                  message.error('提交失败: ' + msg)
                }
              }
            }} style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>提交</Button>
            <Button size="small" icon={<CheckOutlined />} onClick={async () => {
              try {
                const workFile = await serializeFiles()
                await submitWork({ workName, workType: 4, workStatus: 0, workFile, workScene: 'python-ide', additionalId, departId })
                // 存草稿成功后清除 localStorage 草稿
                const workId = params.get('workId')
                removeDraft(workId ? "python_ide_draft_" + workId : "python_ide_draft")
                message.success('已存草稿')
              } catch(e: any) {
                const msg = (e?.message || '') as string
                if (/Token|登录|未登录|过期/i.test(msg)) {
                  message.warning('登录已过期，草稿已保存到本地，请登录后再同步到服务器。')
                } else {
                  message.error('保存失败: ' + msg)
                }
              }
            }} style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>存草稿</Button>
            <Dropdown menu={{items: EXAMPLES.map(ex => ({key:ex.key, label:ex.label, onClick:()=>loadExample(ex.code)}))}} trigger={['click']}>
              <Button size="small" icon={<CodeOutlined />} style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>示例</Button>
            </Dropdown>
            <Button size="small" icon={<CodeOutlined />} onClick={async () => {
              if (consoleMode) { setConsoleMode(false); return }
              await init().catch(() => {}); setConsoleMode(true)
            }}
              style={{ background: consoleMode ? '#007acc' : '#3e3e42', border: 'none', color: '#ccc' }}>{consoleMode ? '关闭 Console' : 'Console'}</Button>
            <Button size="small" icon={<EyeOutlined />} onClick={() => setShowAssets(!showAssets)}
              style={{ background: showAssets ? '#007acc' : '#3e3e42', border: 'none', color: '#ccc' }}>资源</Button>
            <Button size="small" icon={<UploadOutlined />} onClick={() => fileInputRef.current?.click()}
              style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>上传</Button>
            <Button size="small" icon={<DownloadOutlined />} onClick={downloadZip}
              style={{ background: '#3e3e42', border: 'none', color: '#ccc' }}>下载</Button></>
        )}
        <span style={{ fontSize: 12, color: isReady ? '#4ec9b0' : '#888', marginLeft: 2 }}>{loading ? '' : isReady ? '● Python' : ''}</span>
      </div>
      {uploadFileInput}
      {/* 主区域: 文件树 | 编辑器 | 输出/Console/Turtle */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <FileTree files={files.map(f=>f.name)} activeFile={activeFile} activeDir={activeDir} onSelect={setActiveFile} onSelectDir={setActiveDir} onMoveFile={handleMoveFile} onAdd={addFile} onDelete={deleteFile} onRename={renameFile}
          onAddBinary={addAssetFile}
          fileTypes={Object.fromEntries(files.filter(f=>f.type==='binary').map(f=>[f.name,'binary']))} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', background: '#252526', borderBottom: '1px solid #3e3e42', flexShrink: 0, overflow: 'hidden' }}>
            {files.map(f => {
              const isBinary = f.type === 'binary'
              return (
                <div key={f.name} onClick={() => setActiveFile(f.name)}
                  style={{ padding: '5px 12px', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                    borderBottom: activeFile === f.name ? '2px solid #4ec9b0' : '2px solid transparent',
                    color: activeFile === f.name ? '#e0e0e0' : '#888', background: activeFile === f.name ? '#1e1e1e' : 'transparent' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%',
                    background: isBinary ? '#52c41a' : f.code.trim() ? '#4ec9b0' : '#555' }} />
                  {basename(f.name)}
                </div>
              )
            })}
          </div>
          <div style={{ flex: 1 }}>
            {currentFile?.type === 'binary' && currentFile.dataUrl ? (
              // 二进制文件预览
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e1e1e', overflow: 'auto' }}>
                {currentFile.name.match(/\.(png|jpg|jpeg|gif|svg|bmp|webp|ico)$/i) ? (
                  <img src={currentFile.dataUrl} alt={currentFile.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                ) : currentFile.name.match(/\.(mp3|wav|ogg|aac|flac)$/i) ? (
                  <audio src={currentFile.dataUrl} controls style={{ width: '80%' }} />
                ) : (
                  <div style={{ color: '#888', textAlign: 'center' }}>
                    <div style={{ fontSize: 48, marginBottom: 8 }}>📄</div>
                    <div>{currentFile.name}</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>{((currentFile.size || 0) / 1024).toFixed(1)} KB</div>
                  </div>
                )}
              </div>
            ) : (
              <Editor height="100%" language="python" theme="vs-dark" value={currentCode} onChange={updateCode}
                onMount={(editor) => {
                editorRef.current = editor
                const monaco = (window as any).monaco
                if (monaco) registerPythonCompletion(monaco)
                editor.addAction({ id: 'run', label: '运行 (Ctrl+Enter)', keybindings: [2048|13], run: () => handleRunRef.current() })
                editor.addAction({ id: 'runSelected', label: '运行选中代码', contextMenuGroupId: 'navigation', contextMenuOrder: 1,
                  run: async (ed) => {
                    const sel = ed.getSelection()
                    if (!sel) { message.info('请先选中要运行的代码'); return }
                    const txt = ed.getModel()?.getValueInRange(sel)
                    if (!txt || !txt.trim()) { message.info('请先选中要运行的代码'); return }
                    const py = await init().catch(() => { message.error('加载失败'); return null })
                    if (!py) return
                    setRunning(true); setOutput([])
                    try {
                      const st = performance.now(); const r = await runCode(txt, /\bturtle\b/.test(txt) || /\bpygame\b/.test(txt))
                      const d = ((performance.now() - st) / 1000).toFixed(2)
                      setOutput(prev => [...prev, `--- 选中代码执行完成 (${d}s) ---`, ...(r.output.length ? r.output : ['✅ 执行成功'])])
                    } catch (e: any) { setOutput(prev => [...prev, `❌ ${(e?.message || '').replace(/File "<exec>",?\s*/g, '').replace(/, in <exec>/g, '').trim()}`]) }
                    finally { setRunning(false) }
                  }
                })
                editor.addAction({ id: 'save', label: '保存 (Ctrl+S)', keybindings: [2048|49], run: async () => {
                  try {
                    const workFile = await serializeFiles()
                    await submitWork({workName,workType:4,workStatus:0,workFile,workScene:'python-ide', additionalId, departId})
                    message.success('已保存')
                    const workId = params.get('workId')
                    removeDraft(workId ? "python_ide_draft_" + workId : "python_ide_draft")
                  } catch (e: any) {
                    const msg = e?.message || ''
                    if (/Token|登录|未登录|过期/i.test(msg)) {
                      message.warning('登录已过期，请重新登录后再保存。代码已保留在编辑器中。')
                    } else {
                      message.error('保存失败: ' + msg)
                    }
                  }
                }})
              }}
              options={{ readOnly, fontSize: 14, minimap: { enabled: true }, scrollBeyondLastLine: false, automaticLayout: true,
                fontFamily: "'Fira Code','JetBrains Mono',monospace", cursorBlinking: 'smooth', smoothScrolling: true }} />
            )}
          </div>
        </div>
        {/* 右侧面板: 上 Turtle(按需) | 下 终端/Console(tab切换) */}
        <div style={{ width: 400, minWidth: 300, borderLeft: '1px solid #3e3e42', display: 'flex', flexDirection: 'column', background: '#1e1e1e', flexShrink: 0 }}>
          {/* 右下: 终端/Console/资源 tab切换 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', background: '#252526', borderBottom: '1px solid #3e3e42', flexShrink: 0, alignItems: 'center' }}>
              {!showAssets ? (<>
                <span onClick={() => setConsoleMode(false)}
                  style={{ padding: '4px 12px', fontSize: 12, cursor: 'pointer',
                    borderBottom: !consoleMode ? '2px solid #4ec9b0' : '2px solid transparent', color: !consoleMode ? '#e0e0e0' : '#888' }}>终端</span>
                <span onClick={() => setConsoleMode(true)}
                  style={{ padding: '4px 12px', fontSize: 12, cursor: 'pointer',
                    borderBottom: consoleMode ? '2px solid #4ec9b0' : '2px solid transparent', color: consoleMode ? '#e0e0e0' : '#888' }}>💻 Console</span>
              </>) : (
                <span style={{ padding: '4px 12px', fontSize: 12, color: '#e0e0e0',
                  borderBottom: '2px solid #4ec9b0' }}>📦 资源库</span>
              )}
            </div>
            {showAssets ? (
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <AssetPanel onAddFile={addAssetFile} />
              </div>
            ) : (<>
              <div style={{ flex: 1, overflow: 'auto', display: !consoleMode ? 'block' : 'none', fontFamily: "'Fira Code',monospace", fontSize: 13, whiteSpace: 'pre-wrap' }}>
                <OutputPanel output={output} running={running} awaitingInput={awaitingInput}
                  inputBuffer={inputBuffer} onInputChange={setInputBuffer} onInputSubmit={handleInputSubmit} inputRef={inputRef} />
              </div>
              <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px', fontFamily: "'Fira Code',monospace", fontSize: 13, whiteSpace: 'pre-wrap', background: '#1e1e1e', display: consoleMode ? 'block' : 'none' }}>
                {consoleHistory.map((l, i) => <div key={i} style={{ color: l.startsWith('❌') ? '#f87171' : l.startsWith('>>>') ? '#4ec9b0' : '#d4d4d4', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{l}</div>)}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  <span style={{ color: '#4ec9b0' }}>{consoleMultiline ? '...' : '>>>'}</span>
                  <input value={consoleInput} onChange={e => setConsoleInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleConsoleSubmit() }
                      if (e.key === 'ArrowUp') { e.preventDefault()
                        const cmds = consoleHistory.filter(l => l.startsWith('>>> ')).map(l => l.slice(4))
                        if (cmds.length > 0) { const idx = consoleHistoryIndex === -1 ? cmds.length - 1 : Math.max(0, consoleHistoryIndex - 1); setConsoleHistoryIndex(idx); setConsoleInput(cmds[idx] || '') } }
                      if (e.key === 'ArrowDown') { e.preventDefault()
                        const cmds = consoleHistory.filter(l => l.startsWith('>>> ')).map(l => l.slice(4))
                        if (cmds.length > 0 && consoleHistoryIndex >= 0) { const idx = consoleHistoryIndex + 1; if (idx >= cmds.length) { setConsoleHistoryIndex(-1); setConsoleInput('') } else { setConsoleHistoryIndex(idx); setConsoleInput(cmds[idx] || '') } } }
                    }}
                    placeholder={consoleMultiline ? '输入代码... 空行执行' : '输入 Python 代码, 回车执行'}
                    autoFocus style={{ flex: 1, background: 'transparent', border: 'none', color: '#d4d4d4', outline: 'none', fontFamily: "'Fira Code',monospace", fontSize: 13 }} />
                </div>
              </div>
            </>)}
          </div>
        </div>
      </div>
      {/* 底部状态栏 */}
      <div style={{display:'flex',alignItems:'center',gap:12,padding:'2px 12px',background:'#1e1e1e',color:'#888',fontSize:11,flexShrink:0,borderTop:'1px solid #3e3e42'}}>
        <span style={{color:'#4ec9b0'}}>Python 3.12</span>
        <span style={{color:'#555'}}>|</span>
        <span>{isReady ? '● 就绪' : loading ? '⏳ 加载中' : '○ 未连接'}</span>
        <span style={{color:'#555'}}>|</span>
        <span>{currentCode.split('\n').length} 行</span>
        <span style={{color:'#555'}}>|</span>
        <span>{currentCode.length} 字符</span>
        <span style={{color:'#555'}}>|</span>
        <span>{files.length} 文件</span>
        <div style={{flex:1}} />
        {running && <span>▶ 执行中...</span>}
      </div>
      {/* 提交成功弹窗 */}
      <Modal title={<span style={{color:'#4ec9b0'}}>✓ 提交成功</span>} open={!!submitResult} onCancel={()=>setSubmitResult(null)}
        footer={[<Button key="close" onClick={()=>setSubmitResult(null)} style={{background:'#3e3e42',border:'none',color:'#ccc'}}>关闭</Button>]}
        destroyOnClose
        styles={{mask:{background:'rgba(0,0,0,0.7)'}, content:{background:'#252526',color:'#d4d4d4',border:'1px solid #3e3e42'}}}>
        <div style={{textAlign:'center',padding:16}}>
          <p style={{marginBottom:16}}>作品已提交，扫码或复制链接分享：</p>
          <QRCodeCanvas value={location.origin + '/work-detail?id=' + (submitResult?.id || '')} size={180} />
          <p style={{marginTop:12,fontSize:12,color:'#888',wordBreak:'break-all'}}>
            {location.origin}/work-detail?id={submitResult?.id || ''}
          </p>
          <Button size="small" onClick={()=>{
            navigator.clipboard?.writeText(location.origin + '/work-detail?id=' + (submitResult?.id || ''))
            message.success('链接已复制')
          }} style={{background:'#3e3e42',border:'none',color:'#ccc'}}>复制链接</Button>
        </div>
      </Modal>
    </div>
  )
}
