import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'

export default function Page() {
  const api = crudApi('/sys/position')
  return <CrudList
    urls={{ list: '/sys/position/list', delete: '/sys/position/delete', deleteBatch: '/sys/position/deleteBatch', exportXls: '/sys/position/exportXls', importExcel: '/sys/position/importExcel' }}
    title="职务管理"
    columns={[{title:'编码',dataIndex:'code'},{title:'名称',dataIndex:'name'},{title:'职级',dataIndex:'postRank_dictText'},{title:'公司',dataIndex:'companyId_dictText'}]}
    fields={[{name:'code',label:'编码',required:true},{name:'name',label:'名称',required:true},{name:'postRank',label:'职级'},{name:'companyId',label:'公司'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
