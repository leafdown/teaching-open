import { useState } from 'react'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { putAction } from '@/api/client'
import { Space, Modal, Input, message, Popconfirm } from 'antd'

export default function UserList() {
  const api = crudApi('/sys/user')
  const [pwdUser, setPwdUser] = useState<any>(null)
  const [pwd, setPwd] = useState('')
  const changePwd = async () => {
    if (!pwd) { message.warning('请输入新密码'); return }
    await putAction('/sys/user/changePassword', { username: pwdUser.username, password: pwd })
    message.success('密码已修改'); setPwdUser(null); setPwd('')
  }
  const frozen = async (record: any) => {
    await putAction('/sys/user/frozenBatch', { ids: record.id, status: record.status === 1 ? 2 : 1 })
    message.success('操作成功')
  }
  return <>
    <CrudList
      urls={{ list: '/sys/user/list', delete: '/sys/user/delete', deleteBatch: '/sys/user/deleteBatch', exportXls: '/sys/user/exportXls', importExcel: '/sys/user/importExcel' }}
      title="用户管理"
      searchFields={[{name:'username',label:'账号'},{name:'realname',label:'姓名'},{name:'phone',label:'手机'}]}
      columns={[{title:'账号',dataIndex:'username'},{title:'姓名',dataIndex:'realname'},{title:'性别',dataIndex:'sex_dictText'},{title:'手机',dataIndex:'phone'},{title:'部门',dataIndex:'orgCodeTxt'},{title:'状态',dataIndex:'status_dictText'},{title:'创建时间',dataIndex:'createTime'}]}
      fields={[{name:'username',label:'账号',required:true},{name:'realname',label:'姓名',required:true},{name:'password',label:'密码'},{name:'phone',label:'手机'},{name:'email',label:'邮箱'},{name:'sex',label:'性别',type:'select',options:[{label:'男',value:1},{label:'女',value:2}]},{name:'orgCode',label:'部门编码'},{name:'status',label:'状态',type:'select',options:[{label:'正常',value:1},{label:'冻结',value:2}]}]}
      onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
      extraActions={(record:any)=> (
        <Space>
          {record.username !== 'admin' && <Popconfirm title={record.status===1?'确认冻结?':'确认解冻?'} onConfirm={()=>frozen(record)}><a>{record.status===1?'冻结':'解冻'}</a></Popconfirm>}
          <a onClick={()=>{ setPwdUser(record); setPwd('') }}>改密</a>
        </Space>
      )}
    />
    <Modal title={`修改密码: ${pwdUser?.username||''}`} open={!!pwdUser} onCancel={()=>setPwdUser(null)} onOk={changePwd} destroyOnClose>
      <Input.Password placeholder="新密码" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
    </Modal>
  </>
}
