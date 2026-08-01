// Python 播放器 — 只读查看已提交作品(显示源码 + 可播放)
import { useState, useRef, useEffect } from 'react'
import { Button, message } from 'antd'
import { ArrowLeftOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { usePyodide } from './usePyodide'
import TurtleCanvas from './TurtleCanvas'
import JSZip from 'jszip'

interface Props { code?: string; workFile?: string; onBack?: () => void }

// 解析 ZIP / JSON / 纯文本 → 合并代码(用于播放)
async function parseCode(raw: string): Promise<string> {
  if (!raw || !raw.trim()) return raw || ''
  // ZIP 格式(data: URL)
  if (raw.startsWith('data:')) {
    try {
      const resp = await fetch(raw)
      const blob = await resp.blob()
      const zip = await JSZip.loadAsync(blob)
      // 按 main.py > 其他 .py 排序
      const pyFiles: { name: string; code: string }[] = []
      const promises: Promise<void>[] = []
      zip.forEach((relPath, entry) => {
        if (!entry.dir && relPath.endsWith('.py')) {
          promises.push(
            entry.async('text').then(text => {
              pyFiles.push({ name: relPath, code: text })
            })
          )
        }
      })
      await Promise.all(promises)
      pyFiles.sort((a, b) => {
        if (a.name === 'main.py') return -1
        if (b.name === 'main.py') return 1
        return a.name.localeCompare(b.name)
      })
      if (pyFiles.length > 0) {
        return pyFiles.map((f, i) => {
          if (i === 0) return f.code
          return `\n# --- ${f.name} ---\n${f.code}`
        }).join('\n')
      }
    } catch {}
  }
  // JSON 多文件格式(旧版)
  try {
    const parsed = JSON.parse(raw)
    if (parsed.files && Array.isArray(parsed.files) && parsed.files.length > 0) {
      return parsed.files.map((f: any, i: number) => {
        const fileCode = f.code || ''
        if (f.name === 'main.py' || i === 0) return fileCode
        return `\n# --- ${f.name} ---\n${fileCode}`
      }).join('\n')
    }
  } catch {}
  return raw // 纯文本
}

export default function PythonPlayer({ code: propCode, workFile, onBack }: Props) {
  const [params] = useSearchParams()
  const { isReady, loading, error, init, runCode, progress, resetTurtle } = usePyodide()
  const [output, setOutput] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const [code, setCode] = useState('')
  const [tab, setTab] = useState<'code' | 'output'>('code')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const title = params.get('workName') || 'Python 播放器'
  const autoPlayedRef = useRef(false)

  const handleRunRef = useRef<() => void>(() => {})
  const runningRef = useRef(false)

  // 刷新 ref 指向最新的 handleRun
  useEffect(() => { handleRunRef.current = handleRun })

  useEffect(() => {
    if (propCode) { parseCode(propCode).then(setCode); return }
    const url = params.get('url') || workFile
    if (!url) return
    // 加载作品代码的同时预加载 Pyodide
    const initPromise = !isReady ? init() : Promise.resolve()
    const abort = new AbortController()
    fetch(url, { signal: abort.signal }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text() }).then(async t => {
      const parsedCode = await parseCode(t)
      setCode(parsedCode)
      initPromise.then(() => {
        if (!autoPlayedRef.current) { autoPlayedRef.current = true; setTimeout(() => handleRunRef.current(), 300) }
      })
    }).catch((e) => {
      if (e?.name === 'AbortError') return
      setOutput(prev => [...prev, '⚠️ 加载作品代码失败，请检查网络'])
    })
    return () => abort.abort()
  }, [propCode, workFile, params.get('url')])

  const handleRun = async () => {
    if (!code.trim() || runningRef.current) return
    runningRef.current = true
    autoPlayedRef.current = true
    try {
      await init().catch(() => message.error('加载失败'))
      setRunning(true); setOutput([]); setTab('output')
      try {
        const result = await runCode(code, /\bturtle\b/.test(code) || /\bpygame\b/.test(code))
        setOutput(prev => [...prev, ...(result.output.length ? result.output : ['✅ 执行完成'])])
      } catch (e: any) {
        setOutput(prev => [...prev, `❌ ${(e?.message || String(e) || '').replace(/File "<exec>",?\s*/g, '').replace(/, in <exec>/g, '').trim()}`])
      } finally { setRunning(false); runningRef.current = false }
    } catch { runningRef.current = false }
  }

  if (error) return <div style={{padding:48,textAlign:'center',color:'#f87171'}}>❌ {error}</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#1e1e1e', color: '#d4d4d4' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: '#252526', flexShrink: 0 }}>
        {onBack && <Button icon={<ArrowLeftOutlined />} onClick={onBack} size="small" />}
        <span style={{color:'#4ec9b0',fontWeight:600}}>{title}</span>
        <div style={{display:'flex',gap:4,marginLeft:12}}>
          <span onClick={()=>setTab('code')} style={{padding:'2px 8px',fontSize:12,cursor:'pointer',borderBottom:tab==='code'?'2px solid #4ec9b0':'2px solid transparent',color:tab==='code'?'#e0e0e0':'#888'}}>代码</span>
          <span onClick={()=>setTab('output')} style={{padding:'2px 8px',fontSize:12,cursor:'pointer',borderBottom:tab==='output'?'2px solid #4ec9b0':'2px solid transparent',color:tab==='output'?'#e0e0e0':'#888'}}>输出</span>
        </div>
        <div style={{flex:1}} />
        {loading && <span style={{fontSize:11,color:'#888',marginRight:8}}>⏳ 加载 Python {Math.min(progress,99)}%</span>}
        <Button icon={<PlayCircleOutlined/>} onClick={handleRun} loading={running} size="small"
          style={{background:'#2ea043',color:'#fff',border:'none'}}>播放</Button>
      </div>
      <div style={{flex:1,overflow:'hidden'}}>
        {tab === 'code' ? (
          code ? (
            <Editor height="100%" language="python" theme="vs-dark" value={code}
              options={{readOnly:true,fontSize:13,minimap:{enabled:false},scrollBeyondLastLine:false,automaticLayout:true}} />
          ) : (
            <div style={{color:'#888',textAlign:'center',paddingTop:60}}>暂无代码</div>
          )
        ) : (
          <div style={{display:'flex',height:'100%'}}>
            {(/\bturtle\b/.test(code||'') || /\bpygame\b/.test(code||'')) && (
              <TurtleCanvas canvasRef={canvasRef} width={380} height={360} showHeader={false} />
            )}
            <div style={{flex:1,overflow:'auto',padding:12,fontFamily:"'Fira Code',monospace",fontSize:13,whiteSpace:'pre-wrap',height:'100%'}}>
              {loading && output.length === 0 ? (
                <div style={{color:'#888',textAlign:'center',paddingTop:60}}>
                  <div style={{fontSize:24,marginBottom:12}}>⏳</div>
                  <div>加载 Python 运行环境 {Math.min(progress,99)}%</div>
                  <div style={{width:200,height:4,background:'#3e3e42',borderRadius:2,overflow:'hidden',margin:'12px auto'}}>
                    <div style={{width:progress+'%',height:'100%',background:'#4ec9b0',transition:'width 0.5s'}} />
                  </div>
                </div>
              ) : output.length === 0 ? (
                <div style={{color:'#888',textAlign:'center',paddingTop:60}}>
                  <div style={{fontSize:48,marginBottom:8}}>▶</div>
                  <div>点击「播放」运行代码</div>
                </div>
              ) : output.map((l,i)=><div key={i} style={{color:l.startsWith('❌')?'#f87171':'#d4d4d4'}}>{l}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
