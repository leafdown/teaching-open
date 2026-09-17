import { useState } from 'react'
import CrudList from '@/components/crud/CrudList'
import { postAction, getAction, putAction } from '@/api/client'
import { sendWorkToUsers } from '@/api/work.api'
import { Space, Modal, Rate, Input, message, List, Tabs, Avatar, Tag, Select, Tooltip } from 'antd'

interface Comment { id: string; comment?: string; username?: string; avatar?: string; createTime?: string }
interface Correct { id: string; teacherScore?: number; teacherComment?: string; createTime?: string; createBy?: string }

// 预览配置:按 workType 分发不同的 player/IDE URL
function previewUrl(record: any): { src: string; width: number; height: number } {
  const wt = Number(record.workType) || 2
  switch (wt) {
    case 1:
    case 2:
      return { src: `/scratch3/player.html?workId=${record.id}`, width: 620, height: 500 }
    case 3:
      return { src: `/scratchjr/editor.html?mode=look&workFile=${record.workFileKey_url || ''}`, width: 1500, height: 700 }
    case 4:
      return { src: `/python/player.html?lang=turtle&url=${record.workFileKey_url || ''}`, width: 620, height: 600 }
    case 10:
      return { src: `/blockly/index.html?lang=zh-hans&workId=${record.id}`, width: 1500, height: 700 }
    default:
      return { src: `/scratch3/player.html?workId=${record.id}`, width: 620, height: 500 }
  }
}

export default function WorkList() {
  const [correct, setCorrect] = useState<any>(null)
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [corrects, setCorrects] = useState<Correct[]>([])
  const [sendModal, setSendModal] = useState<{ workId: string; workName: string } | null>(null)
  const [targetUsers, setTargetUsers] = useState<string[]>([])
  const [sendUserOptions, setUserOptions] = useState<{ label: string; value: string }[]>([])
  const [sending, setSending] = useState(false)
  // 预览
  const [previewRecord, setPreviewRecord] = useState<any>(null)

  const openCorrect = async (record: any) => {
    setCorrect(record); setScore(record.teacherScore || 0); setComment(record.teacherComment || '')
    setComments([]); setCorrects([])
    // 拉评论 + 批改记录
    try { const c = await getAction<Comment[]>('/teaching/teachingWork/queryTeachingWorkCommentByMainId', { id: record.id }); setComments(Array.isArray(c) ? c : []) } catch {}
    try { const r = await getAction<Correct[]>('/teaching/teachingWork/queryTeachingWorkCorrectByMainId', { id: record.id }); setCorrects(Array.isArray(r) ? r : []) } catch {}
  }
  const doCorrect = async () => {
    await postAction('/teaching/teachingWork/submit', { id: correct.id, workType: correct.workType, workStatus: correct.workStatus, teacherScore: score, teacherComment: comment, workScene: correct.workScene })
    message.success('批改完成'); setCorrect(null)
  }

  const doSendWork = async () => {
    if (!sendModal || targetUsers.length === 0) { message.warning('请选择目标用户'); return }
    setSending(true)
    try {
      const res = await sendWorkToUsers(sendModal.workId, targetUsers)
      message.success(`已发送给 ${res.count} 位学生`)
      setSendModal(null); setTargetUsers([])
    } catch (e: any) {
      message.error('发送失败: ' + (e.message || ''))
    } finally { setSending(false) }
  }

  return (<>
    <CrudList
      urls={{ list: '/teaching/teachingWork/list', delete: '/teaching/teachingWork/delete', deleteBatch: '/teaching/teachingWork/deleteBatch', exportXls: '/teaching/teachingWork/exportXls' }}
      title="作品管理"
      hideEdit
      searchFields={[{name:'workName',label:'作品名'},{name:'username',label:'账号'}]}
      columns={[
        {title:'账号',dataIndex:'username'},{title:'姓名',dataIndex:'realname'},{title:'作品名',dataIndex:'workName'},
        {title:'类型',dataIndex:'workType_dictText'},{title:'状态',dataIndex:'workStatus_dictText'},{title:'来源',dataIndex:'workScene'},
        {title:'标签',dataIndex:'workTag',render:(v:string)=>v?v.split(',').map((t:string)=><Tag key={t}>{t}</Tag>):'—'},
        {title:'观看',dataIndex:'viewNum'},{title:'点赞',dataIndex:'starNum'},{title:'创建时间',dataIndex:'createTime'},
      ]}
      extraActions={(record:any)=> (
        <Space size="middle">
          <Tooltip title="预览"><a onClick={() => setPreviewRecord(record)}><i className="fas fa-eye" /></a></Tooltip>
          <Tooltip title="编辑"><a onClick={() => {
            const wt = Number(record.workType) || 2
            if (wt === 4) {
              window.open(`/ide?workType=4&workId=${record.id}`, '_blank')
            } else if (wt === 10) {
              window.open(`/blockly/index.html?lang=zh-hans&workId=${record.id}&scene=edit`, '_blank')
            } else if (wt === 3) {
              window.open(`/scratchjr/editor.html?mode=edit&workFile=${record.workFileKey_url || ''}`, '_blank')
            } else {
              window.open(`/scratch3/index.html?scene=edit&workId=${record.id}`, '_blank')
            }
          }}><i className="fas fa-pen" /></a></Tooltip>
          <Tooltip title="发送"><a onClick={() => setSendModal({ workId: record.id, workName: record.workName || '' })}><i className="fas fa-paper-plane" /></a></Tooltip>
          <Tooltip title="批改"><a onClick={()=>openCorrect(record)}><i className="fas fa-check-circle" /></a></Tooltip>
          <Tooltip title="设为精选"><a onClick={async () => {
            try {
              await putAction('/teaching/teachingWork/edit', { id: record.id, workStatus: 4 })
              message.success('已设为精选')
            } catch { message.error('设置失败') }
          }}><i className="fas fa-star" /></a></Tooltip>
          <Tooltip title="取消精选"><a onClick={async () => {
            try {
              await putAction('/teaching/teachingWork/edit', { id: record.id, workStatus: 3 })
              message.success('已取消精选')
            } catch { message.error('操作失败') }
          }}><i className="fas fa-star" style={{ color: '#faad14' }} /></a></Tooltip>
        </Space>
      )}
    />
    <Modal title={`批改: ${correct?.workName||''}`} open={!!correct} onCancel={()=>setCorrect(null)} onOk={doCorrect} width={700} destroyOnClose>
      {correct && (
        <Tabs items={[
          { key: 'correct', label: '批改', children: (
            <div>
              <div style={{ marginBottom: 12 }}><span style={{ marginRight: 8 }}>评分:</span><Rate value={score} onChange={setScore} allowHalf /></div>
              <Input.TextArea rows={4} value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="评语" />
              {corrects.length > 0 && <div style={{ marginTop: 12 }}><h4>历史批改</h4>{corrects.map((c,i)=><div key={i} style={{fontSize:13,color:'#666',padding:'4px 0',borderBottom:'1px solid #f0f0f0'}}>{c.createBy} {c.createTime}: ⭐{c.teacherScore} {c.teacherComment}</div>)}</div>}
            </div>
          )},
          { key: 'comments', label: `评论(${comments.length})`, children: (
            <List dataSource={comments} renderItem={(c:Comment)=>(
              <List.Item><List.Item.Meta avatar={<Avatar>{c.username?.[0]}</Avatar>} title={c.username} description={<>{c.comment}<div style={{fontSize:12,color:'#999'}}>{c.createTime}</div></>} /></List.Item>
            )} />
          )},
        ]} />
      )}
    </Modal>
      {/* 作品预览 Modal */}
      {previewRecord && (() => {
        const cfg = previewUrl(previewRecord)
        return (
          <Modal title={`预览: ${previewRecord.workName || ''}`} open onCancel={() => setPreviewRecord(null)}
            footer={null} width={cfg.width + 50} destroyOnClose
          >
            <iframe key={previewRecord.id} src={cfg.src} style={{ width: cfg.width, height: cfg.height, border: 'none' }} title="preview" />
          </Modal>
        )
      })()}
      {/* 发送作品给学生的弹窗 */}
      <Modal title={`发送作品: ${sendModal?.workName || ''}`} open={!!sendModal} onCancel={()=>{setSendModal(null);setTargetUsers([]);setUserOptions([])}}
        onOk={doSendWork} confirmLoading={sending} destroyOnClose>
        <div style={{ marginBottom: 8, color: '#666' }}>选择要发送给哪些学生（搜索用户名）：</div>
        <Select mode="multiple" placeholder="输入用户名搜索"
          value={targetUsers} onChange={setTargetUsers}
          style={{ width: '100%' }}
          filterOption={(input, option) => (option?.label as string || '').toLowerCase().includes(input.toLowerCase())}
          onSearch={async (val) => {
            if (val.length < 2) return
            try {
              const res: any = await getAction<any>('/sys/user/list', { username: val, pageNo: 1, pageSize: 20 })
              setUserOptions((Array.isArray(res) ? res : res?.records || []).map((u: any) => ({ label: `${u.realname || u.username} (${u.username})`, value: u.id })))
            } catch {}
          }}
          options={sendUserOptions}
          notFoundContent="输入至少2个字符搜索"
        />
      </Modal>
    </>
  )
}