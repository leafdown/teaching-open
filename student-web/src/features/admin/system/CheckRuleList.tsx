import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'

export default function Page() {
  const api = crudApi('/sys/checkRule')
  return <CrudList
    urls={{ list: '/sys/checkRule/list', delete: '/sys/checkRule/delete', deleteBatch: '/sys/checkRule/deleteBatch', exportXls: '/sys/checkRule/exportXls', importExcel: '/sys/checkRule/importExcel' }}
    title="校验规则"
    columns={[{title:'规则名称',dataIndex:'ruleName'},{title:'规则编码',dataIndex:'ruleCode'},{title:'描述',dataIndex:'ruleDescription'}]}
    fields={[{name:'ruleName',label:'规则名称',required:true},{name:'ruleCode',label:'规则编码',required:true},{name:'ruleJson',label:'规则JSON',type:'textarea',required:true},{name:'ruleDescription',label:'描述',type:'textarea'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
