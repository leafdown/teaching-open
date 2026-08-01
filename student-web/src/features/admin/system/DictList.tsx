import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'

export default function Page() {
  const api = crudApi('/sys/dict')
  return <CrudList
    urls={{ list: '/sys/dict/list', delete: '/sys/dict/delete', deleteBatch: '/sys/dict/deleteBatch', exportXls: '/sys/dict/exportXls', importExcel: '/sys/dict/importExcel' }}
    title="数据字典"
    columns={[{title:'字典名称',dataIndex:'dictName'},{title:'字典编码',dataIndex:'dictCode'},{title:'描述',dataIndex:'description'}]}
    fields={[{name:'dictName',label:'字典名称',required:true},{name:'dictCode',label:'字典编码',required:true},{name:'description',label:'描述',type:'textarea'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
