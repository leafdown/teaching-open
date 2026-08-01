import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'

export default function Page() {
  const api = crudApi('/sys/annountCement')
  return <CrudList
    urls={{ list: '/sys/annountCement/list', delete: '/sys/annountCement/delete', deleteBatch: '/sys/annountCement/deleteBatch', exportXls: '/sys/annountCement/exportXls', importExcel: '/sys/annountCement/importExcel' }}
    title="公告管理"
    columns={[{title:'标题',dataIndex:'title'},{title:'类型',dataIndex:'msgCategory_dictText'},{title:'优先级',dataIndex:'priority'},{title:'状态',dataIndex:'sendStatus_dictText'},{title:'发布时间',dataIndex:'sendTime'}]}
    fields={[{name:'title',label:'标题',required:true},{name:'msgCategory',label:'消息类型',type:'select',options:[{label:'通知公告',value:'1'},{label:'系统消息',value:'2'}]},{name:'priority',label:'优先级',type:'select',options:[{label:'高',value:'H'},{label:'中',value:'M'},{label:'低',value:'L'}]},{name:'msgAbstract',label:'摘要',type:'textarea'},{name:'msgContent',label:'内容',type:'richtext'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
