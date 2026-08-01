import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'

export default function Page() {
  const api = crudApi('/sys/fillRule')
  return <CrudList
    urls={{ list: '/sys/fillRule/list', delete: '/sys/fillRule/delete', deleteBatch: '/sys/fillRule/deleteBatch', exportXls: '/sys/fillRule/exportXls', importExcel: '/sys/fillRule/importExcel' }}
    title="填值规则"
    columns={[{title:'规则名称',dataIndex:'ruleName'},{title:'规则编码',dataIndex:'ruleCode'},{title:'实现类',dataIndex:'ruleClass'},{title:'参数',dataIndex:'ruleParams'}]}
    fields={[{name:'ruleName',label:'规则名称',required:true},{name:'ruleCode',label:'规则编码',required:true},{name:'ruleClass',label:'实现类',required:true},{name:'ruleParams',label:'参数',type:'textarea'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
