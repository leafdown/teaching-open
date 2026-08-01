// IDE 分发:按 workType 选择编辑器
// 1/2=scratch3, 3=scratchjr, 4=python(React), 10=blockly
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import PythonIDE from '@/features/python-ide'

function ideSrc(params: URLSearchParams): string {
  const scene = params.get('scene') || 'create'
  const workId = params.get('workId') || ''
  const unitId = params.get('unitId') || ''
  const additionalId = params.get('additionalId') || ''
  const departId = params.get('departId') || ''
  const workName = encodeURIComponent(params.get('workName') || '')
  const workFile = params.get('workFile') || ''
  const url = params.get('url') || ''
  const wt = Number(params.get('workType') || '2')

  const q = (extra: string) => {
    const base = `scene=${scene}`
    const parts = [base]
    if (workId) parts.push(`workId=${workId}`)
    if (unitId) parts.push(`unitId=${unitId}`)
    if (additionalId) parts.push(`additionalId=${additionalId}`)
    if (departId) parts.push(`departId=${departId}`)
    if (workName) parts.push(`workName=${workName}`)
    if (workFile) parts.push(`workFile=${workFile}`)
    if (url) parts.push(`url=${url}`)
    if (extra) parts.push(extra)
    return parts.join('&')
  }

  if (wt === 3) return `/scratchjr/editor.html?mode=edit&${q('')}`
  if (wt === 10) return `/blockly/index.html?lang=zh-hans&${q('')}`
  return `/scratch3/index.html?${q('')}`
}

export default function IDE() {
  const [params] = useSearchParams()
  const wt = Number(params.get('workType') || '2')

  // Python (workType=4) 使用 React 原生 IDE
  if (wt === 4) {
    return <PythonIDE key={params.get('workId') || 'new'} readOnly={params.get('readOnly') === 'true'} />
  }

  const src = useMemo(() => ideSrc(params), [params])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#fff' }}>
      <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 10 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => history.back()}>返回</Button>
      </div>
      <iframe src={src} style={{ width: '100%', height: '100%', border: 'none' }} title="IDE" />
    </div>
  )
}
