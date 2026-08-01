import { useState, useEffect } from 'react'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { getAction, postAction } from '@/api/client'
import { Modal, Tree, message, Spin } from 'antd'
import type { DataNode } from 'antd/es/tree'

interface MenuNode { key: string; title: string; children?: MenuNode[] }

export default function Page() {
  const api = crudApi('/sys/role')
  const [authRole, setAuthRole] = useState<any>(null)
  const [tree, setTree] = useState<DataNode[]>([])
  const [checked, setChecked] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const openAuth = async (record: any) => {
    setAuthRole(record); setTree([]); setChecked([]); setLoading(true)
    try {
      const [treeList, permIds] = await Promise.all([
        getAction<any[]>('/sys/role/queryTreeList'),
        getAction<string[]>('/sys/permission/queryRolePermission', { roleId: record.id })
      ])
      setTree(toTree(treeList || []))
      setChecked((permIds || []) as string[])
    } catch {} finally { setLoading(false) }
  }
  const toTree = (list: any[]): DataNode[] => list.map(n => ({
    key: String(n.key || n.id), title: n.title || n.name,
    children: n.children?.length ? toTree(n.children) : undefined
  }))
  const saveAuth = async () => {
    await postAction('/sys/permission/saveRolePermission', { roleId: authRole.id, permissionIds: checked.join(',') })
    message.success('授权成功'); setAuthRole(null)
  }

  return <>
    <CrudList
      urls={{ list: '/sys/role/list', delete: '/sys/role/delete', deleteBatch: '/sys/role/deleteBatch', exportXls: '/sys/role/exportXls', importExcel: '/sys/role/importExcel' }}
      title="角色管理"
      columns={[{title:'角色名称',dataIndex:'roleName'},{title:'角色编码',dataIndex:'roleCode'},{title:'描述',dataIndex:'description'},{title:'创建时间',dataIndex:'createTime'}]}
      fields={[{name:'roleName',label:'角色名称',required:true},{name:'roleCode',label:'角色编码',required:true},{name:'description',label:'描述',type:'textarea'}]}
      onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
      extraActions={(record:any)=> <a onClick={()=>openAuth(record)}>授权</a>}
    />
    <Modal title={`角色授权: ${authRole?.roleName||''}`} open={!!authRole} onCancel={()=>setAuthRole(null)} onOk={saveAuth} width={500}>
      {loading ? <Spin /> : <Tree checkable defaultExpandAll treeData={tree} checkedKeys={checked} onCheck={(keys)=>setChecked((keys as string[]))} />}
    </Modal>
  </>
}
