import { useState } from 'react'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { fileUrl, uploadQiniu } from '@/api/common.api'
import { Modal, Image, message, Space, Form, Input, Select, Upload, Button, Tooltip } from 'antd'
import { EyeOutlined, SoundOutlined, UploadOutlined } from '@ant-design/icons'
import type { CrudFormField } from '@/components/crud/CrudList'

// 素材在七牛上的目录前缀(Scratch 素材库用 assetHost + /internalapi/asset/{md5ext} 抓资源)
const ASSET_DIR = 'internalapi/asset/'

// 生成 32 位 hex 唯一文件名(与旧前端 j-upload uuid 一致)
function genUuid(): string {
  const s: string[] = []
  const hex = '0123456789abcdef'
  for (let i = 0; i < 32; i++) s[i] = hex[Math.floor(Math.random() * 16)]
  return s.join('')
}
// 解析图片真实尺寸,构造 Scratch 造型字段(旋转中心/bitmapResolution)
function getImageMeta(file: File): Promise<{ rotationCenterX: number; rotationCenterY: number; bitmapResolution: number }> {
  const suffix = file.name.split('.').pop()?.toLowerCase() || ''
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      const img = new window.Image()
      img.onload = () => resolve({
        rotationCenterX: Math.floor(img.width / 2),
        rotationCenterY: Math.floor(img.height / 2),
        bitmapResolution: suffix === 'svg' ? 1 : 2,
      })
      img.onerror = () => reject(new Error('图片解析失败'))
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
  })
}

export default function Page() {
  const api = crudApi('/teaching/teachingScratchAssets')
  const [preview, setPreview] = useState<any>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadFileState, setUploadFileState] = useState<File | null>(null)
  const [form] = Form.useForm()

  const ASSET_TYPE_NAMES: Record<number, string> = { 1: '背景', 2: '声音', 3: '造型', 4: '角色' }

  // 渲染预览列(角色 type=4 可能有多个逗号分隔的图片)
  const renderPreview = (v: string, record: any) => {
    if (!v) return <span style={{ color: '#ccc' }}>无文件</span>
    const parts = v.split(',').filter(Boolean)
    const type = record?.assetType
    if (type === 2) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <i className="fas fa-music" style={{ color: '#1890ff' }} />
          <Tooltip title="播放"><a onClick={() => setPreview(record)}><i className="fas fa-play" /></a></Tooltip>
        </div>
      )
    }
    if (parts.length > 1) {
      return (
        <div style={{ display: 'flex', gap: 2 }}>
          {parts.slice(0, 3).map((p, i) => (
            <Image key={i} src={fileUrl(p)} alt=""
              style={{ width: 28, height: 28, objectFit: 'contain', cursor: 'pointer', border: '1px solid #f0f0f0', borderRadius: 2 }}
              preview={{ mask: <EyeOutlined style={{ fontSize: 10 }} /> }} />
          ))}
          {parts.length > 3 && <span style={{ fontSize: 10, color: '#999', alignSelf: 'center' }}>+{parts.length - 3}</span>}
        </div>
      )
    }
    return (
      <Image src={fileUrl(v)} alt="" style={{ maxWidth: 60, maxHeight: 40, objectFit: 'contain', cursor: 'pointer' }}
        preview={{ mask: <EyeOutlined /> }} />
    )
  }

  const fields: CrudFormField[] = [
    { name: 'assetType', label: '类型', type: 'select', required: true, options: [{ label: '背景', value: 1 }, { label: '声音', value: 2 }, { label: '造型', value: 3 }, { label: '角色', value: 4 }] },
    { name: 'assetName', label: '名称', required: true },
    { name: 'tags', label: '标签' },
  ]

  // 自定义新增/编辑表单(带文件上传)
  const renderForm = (record: any | null, onOk: (vals: any) => Promise<void>, onCancel: () => void) => {
    const isEdit = !!record
    return (
      <Modal title={isEdit ? '编辑素材' : '新增素材'} open onCancel={onCancel} onOk={async () => {
        try {
          const vals = await form.validateFields()
          const assetType = Number(vals.assetType ?? record?.assetType)
          let md5Ext = record?.md5Ext || ''
          if (uploadFileState) {
            setUploading(true)
            const ext = uploadFileState.name.split('.').pop()?.toLowerCase() || ''
            const assetId = genUuid()
            const md5ext = `${assetId}.${ext}`
            const key = ASSET_DIR + md5ext
            // 七牛直传到 internalapi/asset/ 目录(与 Scratch 素材库 assetHost 路径对齐)
            await uploadQiniu(uploadFileState, key)
            md5Ext = key
            const tags = (vals.tags || '').split(',').filter(Boolean)
            // 构造 assetData,对齐旧前端数据结构:
            // - 背景(1)/造型(3)/声音(2):扁平对象(md5ext/assetId/dataFormat 直接放顶层)
            // - 角色(4):完整嵌套(isStage/variables/blocks/sounds/costumes)
            if (assetType === 2) {
              vals.assetData = JSON.stringify({ name: vals.assetName, tags, md5ext, assetId, dataFormat: ext, sampleCount: 0, rate: 0 })
            } else if (assetType === 4) {
              let c = { name: vals.assetName, md5ext, assetId, dataFormat: ext, rotationCenterX: 0, rotationCenterY: 0, bitmapResolution: 2 }
              try { c = { ...c, ...(await getImageMeta(uploadFileState)) } } catch { /* 忽略尺寸解析失败 */ }
              vals.assetData = JSON.stringify({ name: vals.assetName, tags, isStage: false, variables: {}, blocks: {}, sounds: [], costumes: [c] })
            } else {
              // 背景(1)/造型(3)
              let c = { name: vals.assetName, tags, md5ext, assetId, dataFormat: ext, rotationCenterX: 0, rotationCenterY: 0, bitmapResolution: 2 }
              if (!ext.startsWith('snd')) {
                try { c = { ...c, ...(await getImageMeta(uploadFileState)) } } catch { /* 忽略尺寸解析失败 */ }
              }
              vals.assetData = JSON.stringify(c)
            }
          } else if (!md5Ext) {
            message.warning('请选择素材文件'); return
          }
          await onOk({ ...vals, md5Ext })
          setUploadFileState(null)
        } catch (e) { message.error('保存失败: ' + ((e as Error)?.message || String(e))) } finally { setUploading(false) }
      }} width={500} destroyOnClose confirmLoading={uploading}>
        <Form form={form} layout="vertical" initialValues={record || {}} preserve={false}>
          {fields.map(f => (
            <Form.Item key={f.name} name={f.name} label={f.label}
              rules={f.required ? [{ required: true, message: `请选择${f.label}` }] : []}>
              {f.type === 'select' ? <Select options={f.options} placeholder={`请选择${f.label}`} /> : <Input placeholder={`请输入${f.label}`} />}
            </Form.Item>
          ))}
          <Form.Item label="文件">
            <Upload beforeUpload={(file) => { setUploadFileState(file); return false }} maxCount={1}
              onRemove={() => setUploadFileState(null)} fileList={uploadFileState ? [{ uid: '-1', name: uploadFileState.name, status: 'done' }] : []}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
            {record?.md5Ext && !uploadFileState && (
              <div style={{ marginTop: 8 }}>
                {record.assetType === 2 ? (
                  <audio src={fileUrl(record.md5Ext.split(',')[0])} controls style={{ width: '100%' }} />
                ) : (
                  <Image src={fileUrl(record.md5Ext.split(',')[0])} style={{ maxWidth: 200, maxHeight: 150, objectFit: 'contain' }} />
                )}
                <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>现有文件: {record.md5Ext}</div>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  return (<>
    <CrudList
      urls={{ list: '/teaching/teachingScratchAssets/list', delete: '/teaching/teachingScratchAssets/delete', deleteBatch: '/teaching/teachingScratchAssets/deleteBatch', exportXls: '/teaching/teachingScratchAssets/exportXls', importExcel: '/teaching/teachingScratchAssets/importExcel' }}
      title="Scratch素材"
      hideEdit
      renderForm={renderForm}
      onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
      columns={[
        {title:'预览',dataIndex:'md5Ext',render: renderPreview},
        {title:'类型',dataIndex:'assetType',render:(v:any)=>ASSET_TYPE_NAMES[v]||v},
        {title:'名称',dataIndex:'assetName'},
        {title:'标签',dataIndex:'tags'},
        {title:'创建时间',dataIndex:'createTime'},
      ]}
      fields={[]}
    />
    <Modal title={preview?.assetName || '预览'} open={!!preview} onCancel={() => setPreview(null)} footer={null} destroyOnClose>
      {preview?.md5Ext && (
        preview.assetType === 2 ? (
          <audio src={fileUrl(preview.md5Ext.split(',')[0])} controls style={{ width: '100%' }} />
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {preview.md5Ext.split(',').filter(Boolean).map((p: string, i: number) => (
              <Image key={i} src={fileUrl(p)} alt="" style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }} />
            ))}
          </div>
        )
      )}
    </Modal>
  </>)
}