import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { List, Radio, Card, Tag, Button, Rate, Tooltip, Modal, Input, Upload, message, Empty, Spin, Form } from 'antd'
import { mineAdditionalWork, submitWork, WorkVO } from '@/api/work.api'
import { uploadFile, fileUrl, coverUrl } from '@/api/common.api'

export default function AdditionalWork() {
  const qc = useQueryClient()
  const [submit, setSubmit] = useState<undefined | boolean>(undefined)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<WorkVO | null>(null)
  const [workName, setWorkName] = useState('')
  const [workFile, setWorkFile] = useState('')

  const q = useQuery({
    queryKey: ['additionalWork', submit, page],
    queryFn: () => mineAdditionalWork({ pageNo: page, pageSize: 10, submit: submit === undefined ? undefined : String(submit) })
  })

  const submitMut = useMutation({
    mutationFn: () => submitWork({ workName, workFile, departId: modal?.departId, additionalId: modal?.additionalId, workType: 0, workStatus: 1, workScene: 'additional' }),
    onSuccess: () => { message.success('提交成功'); setModal(null); qc.invalidateQueries({ queryKey: ['additionalWork'] }) }
  })

  const onUpload = async (file: File) => {
    const res = await uploadFile(file, file.name, 'work')
    setWorkFile(res.url)
    if (!workName) setWorkName(file.name.replace(/\.[^.]+$/, ''))
    message.success('文件已上传')
    return false
  }

  const goIDE = (w: WorkVO) => {
    const wt = (w as any).codeType || 2
    const scene = 'additional'
    const base = `scene=${scene}&additionalId=${w.additionalId}&departId=${w.departId}&workName=${encodeURIComponent(w.workName || '')}`
    if (wt === 0) { setModal(w); setWorkName(w.workName || ''); setWorkFile(''); return }
    if (wt === 3) window.open(`/scratchjr/editor.html?mode=edit&${base}&workFile=${w.workUrl_url || ''}`, '_blank')
    else if (wt === 4) window.open(`/ide?workType=4&${base}`, '_blank')
    else if (wt === 10) window.open(`/blockly/index.html?lang=zh-hans&${base}&workId=${w.id}`, '_blank')
    else window.open(`/scratch3/index.html?${base}&workId=${w.id}`, '_blank')
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <h2>附加作业</h2>
      <Radio.Group value={submit} onChange={(e) => { setSubmit(e.target.value); setPage(1) }} style={{ marginBottom: 16 }}>
        <Radio.Button value={undefined}>全部</Radio.Button>
        <Radio.Button value={false}>未提交</Radio.Button>
        <Radio.Button value={true}>已提交</Radio.Button>
      </Radio.Group>

      {q.isLoading ? <Spin /> : (
        <List dataSource={q.data?.records || []} locale={{ emptyText: <Empty description="暂无附加作业" /> }} renderItem={(w: WorkVO) => (
          <Card size="small" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 80, height: 80, background: '#f0f0f0', flexShrink: 0, overflow: 'hidden', borderRadius: 4 }}>
                {w.workCover && <img src={coverUrl(w)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{w.workName} <Tag>{Number(w.workType) === 4 ? "Python" : Number(w.workType) === 3 ? "ScratchJr" : "Scratch"}</Tag></div>
                <div style={{ color: '#999', fontSize: 13 }}>{(w as any).description}</div>
                {(w as any).teacherScore != null && (
                  <div style={{ marginTop: 4 }}><Rate disabled value={(w as any).teacherScore} /> {w.teacherComment && <Tooltip title={w.teacherComment}><span style={{ color: '#999' }}>评语</span></Tooltip>}</div>
                )}
                <div style={{ marginTop: 8 }}>
                  {w.mineWorkStatus == null && <Button type="primary" size="small" onClick={() => goIDE(w)}>去做作业</Button>}
                  {w.mineWorkStatus != null && w.mineWorkStatus < 2 && <Button size="small" onClick={() => goIDE(w)}>重做</Button>}
                  {w.mineWorkStatus != null && w.mineWorkStatus > 1 && <Button size="small" disabled>修改作业</Button>}
                </div>
              </div>
            </div>
          </Card>
        )} />
      )}

      <Modal title="文件上传作业" open={!!modal} onCancel={() => setModal(null)} onOk={() => submitMut.mutate()} confirmLoading={submitMut.isPending} okButtonProps={{ disabled: !workFile }}>
        <Form layout="vertical">
          <Form.Item label="作业名" required>
            <Input value={workName} onChange={(e) => setWorkName(e.target.value)} />
          </Form.Item>
          <Form.Item label="作业文件" required>
            <Upload beforeUpload={onUpload} showUploadList maxCount={1}>
              <Button>选择文件(≤10MB)</Button>
            </Upload>
            {workFile && <div style={{ marginTop: 8, color: '#52c41a' }}>已上传</div>}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
