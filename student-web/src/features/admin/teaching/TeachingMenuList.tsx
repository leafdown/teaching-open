import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
export default function Page() {
  const api = crudApi('/teaching/menu')
  return <CrudList
    urls={{ list: '/teaching/menu/list', delete: '/teaching/menu/delete', deleteBatch: '/teaching/menu/deleteBatch', exportXls: '/teaching/menu/exportXls', importExcel: '/teaching/menu/importExcel' }}
    title="教师菜单"
    columns={[{title:'名称',dataIndex:'name'},{title:'图标',dataIndex:'icon'},{title:'路径',dataIndex:'url'},{title:'排序',dataIndex:'sortNo'}]}
    fields={[{name:'name',label:'名称',required:true},{name:'parentId',label:'上级菜单'},{name:'icon',label:'图标'},{name:'url',label:'路径'},{name:'component',label:'组件'},{name:'sortNo',label:'排序',type:'number'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
