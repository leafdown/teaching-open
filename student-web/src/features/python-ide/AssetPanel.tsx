// Python IDE 资源面板 — 从 Scratch 资源库获取图像、声音等素材
// 点击资源 → 下载并添加到项目文件树(供 Python 代码 open/load 使用)
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input, Spin, Empty, Tag, Pagination, message } from 'antd'
import { SoundOutlined, DownloadOutlined } from '@ant-design/icons'
import { assetList, AssetVO, ASSET_TYPES } from '@/api/asset.api'
import { fileUrl } from '@/api/common.api'

const PAGE_SIZE = 20

// AssetPanel 接受的 props
interface AssetPanelProps {
  onAddFile: (name: string, dataUrl: string, size: number) => void
}

// 获取文件扩展名和 MIME
function getFileInfo(url: string): { ext: string; mime: string } {
  const ext = url.split('.').pop()?.toLowerCase() || 'png'
  const mimeMap: Record<string, string> = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif',
    svg: 'image/svg+xml', bmp: 'image/bmp', webp: 'image/webp',
    mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', aac: 'audio/aac',
    mp4: 'video/mp4',
  }
  return { ext, mime: mimeMap[ext] || 'application/octet-stream' }
}

// 素材预览
function AssetPreview({ asset, imgStyle }: { asset: AssetVO; imgStyle: React.CSSProperties }) {
  if (!asset.md5Ext) return <span style={{ color: '#555', fontSize: 12 }}>无预览</span>
  if (asset.assetType === 2) {
    return <SoundOutlined style={{ fontSize: 28, color: '#1890ff' }} />
  }
  if (asset.assetType === 4) {
    const parts = String(asset.md5Ext).split(',').filter(Boolean)
    if (parts.length === 0) return <span style={{ color: '#555', fontSize: 12 }}>无预览</span>
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {parts.map((p, i) => <img key={i} src={fileUrl(p)} alt="" style={imgStyle} />)}
      </div>
    )
  }
  return <img src={fileUrl(asset.md5Ext)} alt={asset.assetName || ''} style={imgStyle} />
}

export default function AssetPanel({ onAddFile }: AssetPanelProps) {
  const [type, setType] = useState<number | undefined>(undefined)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)

  const q = useQuery({
    queryKey: ['python-ide-assets', type, keyword, page],
    queryFn: () => assetList({ pageNo: page, pageSize: PAGE_SIZE, assetType: type, assetName: keyword || undefined }),
    retry: false,
  })

  // 下载资源并添加到项目文件树
  const addAssetToProject = async (asset: AssetVO) => {
    if (!asset.md5Ext) { message.warning('该资源无文件'); return }
    const firstFile = asset.md5Ext.split(',')[0]
    const url = fileUrl(firstFile)
    const { ext } = getFileInfo(firstFile)
    const fileName = (asset.assetName || 'asset') + '.' + ext

    try {
      const resp = await fetch(url)
      const blob = await resp.blob()
      // 转 dataURL
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      onAddFile(fileName, dataUrl, blob.size)
      message.success(`已添加: ${fileName}`)
    } catch (e: any) {
      message.error(`下载失败: ${e.message}`)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 搜索 */}
      <div style={{ padding: '8px 8px 4px', flexShrink: 0 }}>
        <Input.Search
          size="small" placeholder="搜索素材..."
          allowClear value={keyword}
          onChange={e => { setKeyword(e.target.value); setPage(1) }}
          onSearch={() => setPage(1)}
        />
      </div>
      {/* 分类标签 */}
      <div style={{ padding: '0 8px', flexShrink: 0, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        <Tag.CheckableTag checked={type === undefined} onChange={() => { setType(undefined); setPage(1) }} style={{ fontSize: 11 }}>全部</Tag.CheckableTag>
        {ASSET_TYPES.map(t => (
          <Tag.CheckableTag key={t.value} checked={type === t.value}
            onChange={(c) => { setType(c ? t.value : undefined); setPage(1) }}
            style={{ fontSize: 11, color: t.color, borderColor: t.color }}>
            {t.label}
          </Tag.CheckableTag>
        ))}
      </div>
      {/* 素材列表 */}
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 8px' }}>
        {q.isLoading ? (
          <div style={{ textAlign: 'center', paddingTop: 40 }}><Spin /></div>
        ) : !q.data?.records?.length ? (
          <Empty description="暂无素材" style={{ paddingTop: 40 }} />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {q.data.records.map((a: AssetVO) => {
              const at = ASSET_TYPES.find(t => t.value === a.assetType)
              return (
                <div key={a.id}
                  onClick={() => addAssetToProject(a)}
                  title="点击添加到项目文件树"
                  style={{
                    background: '#2d2d2d', borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
                    border: '1px solid #3e3e42', transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#4ec9b0')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#3e3e42')}
                >
                  <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', overflow: 'hidden' }}>
                    <AssetPreview asset={a} imgStyle={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: '4px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: '#ccc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {a.assetName}
                    </span>
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 4 }}>
                      <DownloadOutlined style={{ fontSize: 11, color: '#888' }} title="添加到项目" />
                    </div>
                  </div>
                  <div style={{ padding: '0 6px 4px' }}>
                    <Tag color={at?.color} style={{ fontSize: 10, margin: 0 }}>{at?.label}</Tag>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {/* 分页 */}
      {(q.data?.total || 0) > PAGE_SIZE && (
        <div style={{ padding: '4px 8px', flexShrink: 0, textAlign: 'center' }}>
          <Pagination size="small" current={page} pageSize={PAGE_SIZE} total={q.data?.total || 0}
            onChange={setPage} showSizeChanger={false} />
        </div>
      )}
    </div>
  )
}
