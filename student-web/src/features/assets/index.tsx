import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, Row, Col, Input, Spin, Empty, Tag, Pagination, Modal, Button } from 'antd'
import { SoundOutlined } from '@ant-design/icons'
import { assetList, AssetVO, ASSET_TYPES } from '@/api/asset.api'
import { fileUrl } from '@/api/common.api'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const PAGE_SIZE = 24

// 按素材类型渲染预览(对齐旧 Vue TeachingScratchAssetsList 的 assetSlot):
// 声音(type=2)用 audio;角色(type=4)md5Ext 逗号分隔多图;背景/造型用 img
function renderAssetPreview(a: AssetVO, imgStyle: React.CSSProperties) {
  if (!a.md5Ext) return <span style={{ color: '#ccc' }}>无预览</span>
  if (a.assetType === 2) {
    return <SoundOutlined style={{ fontSize: 32, color: '#1890ff' }} />
  }
  if (a.assetType === 4) {
    const parts = String(a.md5Ext).split(',').filter(Boolean)
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {parts.map((p, i) => <img key={i} src={fileUrl(p)} alt="" style={imgStyle} loading="lazy" />)}
      </div>
    )
  }
  return <img src={fileUrl(a.md5Ext)} alt={a.assetName || ''} style={imgStyle} loading="lazy" />
}

export default function Assets() {
  const [type, setType] = useState<number | undefined>(undefined)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [preview, setPreview] = useState<AssetVO | null>(null)
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)

  const q = useQuery({
    queryKey: ['assets', type, keyword, page],
    queryFn: () => assetList({ pageNo: page, pageSize: PAGE_SIZE, assetType: type, assetName: keyword || undefined })
  })

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>素材库</h2>

      {/* 分类标签 */}
      <div style={{ marginBottom: 16 }}>
        <Tag.CheckableTag checked={type === undefined} onChange={() => { setType(undefined); setPage(1) }}>全部</Tag.CheckableTag>
        {ASSET_TYPES.map(t => (
          <Tag.CheckableTag key={t.value} checked={type === t.value} onChange={(c) => { setType(c ? t.value : undefined); setPage(1) }}>{t.label}</Tag.CheckableTag>
        ))}
      </div>

      {/* 搜索 */}
      <Input.Search placeholder="搜索素材名" allowClear style={{ width: isMobile ? '100%' : 300, marginBottom: 16 }}
        onSearch={(v) => { setKeyword(v); setPage(1) }} />

      {q.isLoading ? <Spin /> : (
        <>
          <Row gutter={[16, 16]}>
            {(q.data?.records || []).map((a) => {
              const at = ASSET_TYPES.find(t => t.value === a.assetType)
              return (
                <Col key={a.id} xs={12} sm={8} md={6} lg={4}>
                  <Card size="small" hoverable cover={
                    <div style={{ height: 100, background: '#f5f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {renderAssetPreview(a, { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' })}
                    </div>
                  } onClick={() => setPreview(a)}>
                    <Card.Meta title={<span style={{ fontSize: 13 }}>{a.assetName}</span>} />
                    <div style={{ marginTop: 4 }}><Tag color={at?.color}>{at?.label}</Tag></div>
                  </Card>
                </Col>
              )
            })}
            {(!q.data?.records?.length) && <Empty description="暂无素材" />}
          </Row>
          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Pagination current={page} pageSize={PAGE_SIZE} total={q.data?.total || 0} onChange={setPage} showSizeChanger={false} />
          </div>
        </>
      )}

      {/* 预览弹窗 */}
      <Modal title={preview?.assetName} open={!!preview} onCancel={() => setPreview(null)} footer={[
        preview?.md5Ext ? <Button key="dl" type="primary" href={fileUrl(preview.md5Ext.split(',')[0])} target="_blank">下载</Button> : null,
      ]}>
        {preview && (
          <div style={{ textAlign: 'center' }}>
            {preview.assetType === 2 ? (
              // 声音:音频播放器
              preview.md5Ext ? <audio src={fileUrl(preview.md5Ext)} controls style={{ width: '100%' }} /> : <Empty description="无音频" />
            ) : renderAssetPreview(preview, { maxWidth: '100%', maxHeight: 300, objectFit: 'contain' })}
            {preview.tags && <div style={{ marginTop: 12, color: '#666' }}>标签:{preview.tags}</div>}
            <div style={{ color: '#999', fontSize: 13, marginTop: 4 }}>上传者:{preview.createBy} · {preview.createTime}</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
