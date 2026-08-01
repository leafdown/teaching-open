import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'

export default function Page() {
  const api = crudApi('/sys/quartzJob')
  return <CrudList
    urls={{ list: '/sys/quartzJob/list', delete: '/sys/quartzJob/delete', deleteBatch: '/sys/quartzJob/deleteBatch', exportXls: '/sys/quartzJob/exportXls', importExcel: '/sys/quartzJob/importExcel' }}
    title="定时任务"
    columns={[{title:'任务类名',dataIndex:'jobClassName'},{title:'Cron表达式',dataIndex:'cronExpression'},{title:'参数',dataIndex:'parameter'},{title:'状态',dataIndex:'status_dictText'},{title:'描述',dataIndex:'description'}]}
    fields={[{name:'jobClassName',label:'任务类名',required:true},{name:'cronExpression',label:'Cron表达式',required:true},{name:'parameter',label:'参数'},{name:'description',label:'描述',type:'textarea'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
