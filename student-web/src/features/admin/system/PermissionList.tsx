import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
export default function PermissionList() {
  const api = crudApi('/sys/permission')
  return <CrudList
    urls={{ list: '/sys/permission/list', delete: '/sys/permission/delete', deleteBatch: '/sys/permission/deleteBatch' }}
    title="菜单管理" isTree
    columns={[{title:'菜单名称',dataIndex:'name'},{title:'图标',dataIndex:'icon'},{title:'组件',dataIndex:'component'},{title:'路径',dataIndex:'url'},{title:'排序',dataIndex:'sortNo'},{title:'类型',dataIndex:'menuType',render:(v)=>v===1?'目录':v===2?'按钮':'菜单'}]}
    fields={[{name:'name',label:'菜单名称',required:true},{name:'parentId',label:'上级菜单'},{name:'menuType',label:'类型',type:'select',options:[{label:'目录',value:1},{label:'菜单',value:0},{label:'按钮',value:2}]},{name:'icon',label:'图标'},{name:'component',label:'组件'},{name:'url',label:'路径'},{name:'sortNo',label:'排序',type:'number'},{name:'perms',label:'权限标识'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
