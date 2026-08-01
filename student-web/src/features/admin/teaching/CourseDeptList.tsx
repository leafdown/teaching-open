import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
export default function Page() {
  const api = crudApi('/teaching/teachingCourseDept')
  return <CrudList
    urls={{ list: '/teaching/teachingCourseDept/list', delete: '/teaching/teachingCourseDept/delete', deleteBatch: '/teaching/teachingCourseDept/deleteBatch', exportXls: '/teaching/teachingCourseDept/exportXls', importExcel: '/teaching/teachingCourseDept/importExcel' }}
    title="班级课程"
    columns={[{title:'部门',dataIndex:'deptId_dictText'},{title:'课程',dataIndex:'courseId_dictText'},{title:'开放时间',dataIndex:'openTime'}]}
    fields={[{name:'deptId',label:'部门',required:true},{name:'courseId',label:'课程',required:true},{name:'openTime',label:'开放时间'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
