import { useState, useRef } from 'react'
import { Upload, Button, Spin, message, Card } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { parseSb3, PptOutline } from '@/utils/sb3-parser'
import { generateSlides, SlideData } from './slide-generator'
import { RevealViewer } from './RevealViewer'

const { Dragger } = Upload

export default function PptGenerator() {
  const [outline, setOutline] = useState<PptOutline | null>(null)
  const [slides, setSlides] = useState<SlideData[]>([])
  const [loading, setLoading] = useState(false)
  const [showViewer, setShowViewer] = useState(false)

  const handleFile = async (file: File) => {
    setLoading(true)
    try {
      const o = await parseSb3(file)
      setOutline(o)
      const s = generateSlides(o)
      setSlides(s)
      message.success(`解析成功:${o.spriteCount} 个角色,${o.totalBlocks} 个积木`)
    } catch (e) {
      message.error('解析失败: ' + String(e))
    } finally { setLoading(false) }
    return false
  }

  if (showViewer && slides.length) {
    return <RevealViewer slides={slides} onBack={() => setShowViewer(false)} />
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>AI 教学 PPT 生成</h2>
      <p style={{ color: '#666', marginBottom: 24 }}>上传 Scratch 作品(sb3 文件),自动生成教学讲解 PPT</p>

      {!outline && !loading && (
        <Dragger accept=".sb3" showUploadList={false} beforeUpload={handleFile} style={{ padding: 40 }}>
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">点击或拖拽上传 .sb3 文件</p>
          <p className="ant-upload-hint">支持 Scratch 3.0 项目文件</p>
        </Dragger>
      )}

      {loading && <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" tip="解析中..." /></div>}

      {outline && (
        <div>
          <Card title="项目解析结果" style={{ marginBottom: 16 }}>
            <p>角色数:{outline.spriteCount} | 积木总数:{outline.totalBlocks}</p>
            <div style={{ marginTop: 12 }}>
              <strong>知识点分布:</strong>
              <div style={{ marginTop: 8 }}>
                {Object.entries(outline.knowledgePoints).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                  <span key={k} style={{ display: 'inline-block', margin: '0 8px 8px 0', padding: '4px 12px', background: '#f0f5ff', borderRadius: 12, fontSize: 13 }}>
                    {k}: {v}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>角色列表:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
                {outline.sprites.map(s => (
                  <Card key={s.name} size="small" style={{ width: 120 }} cover={
                    s.thumbnail ? <img src={s.thumbnail} alt={s.name} style={{ height: 80, objectFit: 'contain', background: '#f5f5f5' }} /> : <div style={{ height: 80, background: '#f5f5f5' }} />
                  }>
                    <div style={{ fontSize: 12, textAlign: 'center' }}>{s.name}({s.blockCount})</div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          <div style={{ textAlign: 'center' }}>
            <Button type="primary" size="large" onClick={() => setShowViewer(true)} disabled={!slides.length}>
              生成 PPT({slides.length} 页)
            </Button>
            <Button style={{ marginLeft: 12 }} onClick={() => { setOutline(null); setSlides([]) }}>
              重新上传
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
