import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'

export default function Page() {
  const api = crudApi('/sys/category')
  return <CrudList
    urls={{ list: '/sys/category/rootList', delete: '/sys/category/delete', deleteBatch: '/sys/category/deleteBatch', exportXls: '/sys/category/exportXls', importExcel: '/sys/category/importExcel' }}
    title="系统分类"
    columns={[{title:'名称',dataIndex:'name'},{title:'编码',dataIndex:'code'},{title:'值',dataIndex:'value'}]}
    fields={[{name:'name',label:'名称',required:true},{name:'code',label:'编码',required:true},{name:'value',label:'值'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
