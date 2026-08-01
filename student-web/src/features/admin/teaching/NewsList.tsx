import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
export default function Page() {
  const api = crudApi('/teaching/teachingNews')
  return <CrudList
    urls={{ list: '/teaching/teachingNews/list', delete: '/teaching/teachingNews/delete', deleteBatch: '/teaching/teachingNews/deleteBatch', exportXls: '/teaching/teachingNews/exportXls', importExcel: '/teaching/teachingNews/importExcel' }}
    title="资讯管理"
    columns={[{title:'标题',dataIndex:'newsTitle'},{title:'内容',dataIndex:'newsContent'},{title:'状态',dataIndex:'newsStatus_dictText'},{title:'创建时间',dataIndex:'createTime'}]}
    fields={[{name:'newsTitle',label:'标题',required:true},{name:'newsContent',label:'内容',type:'richtext',required:true},{name:'newsStatus',label:'状态',type:'select',options:[{label:'草稿',value:0},{label:'发布',value:1}]}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
