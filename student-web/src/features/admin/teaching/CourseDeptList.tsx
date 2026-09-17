import { useState, useEffect } from 'react'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { getAction } from '@/api/client'

interface Depart { id: string; departName: string }
interface Course { id: string; courseName: string }

export default function Page() {
  const api = crudApi('/teaching/teachingCourseDept')
  const [departOptions, setDepartOptions] = useState<{ label: string; value: string }[]>([])
  const [courseOptions, setCourseOptions] = useState<{ label: string; value: string }[]>([])
  useEffect(() => {
    getAction<Depart[]>('/sys/sysDepart/listAll')
      .then(r => Array.isArray(r) ? r : [])
      .then(list => setDepartOptions(list.map(d => ({ label: d.departName, value: d.id }))))
      .catch(() => {})
    getAction<{ records: Course[] } | Course[]>('/teaching/teachingCourse/list', { pageSize: 999 })
      .then(r => Array.isArray(r) ? r : (r?.records || []))
      .then(list => setCourseOptions(list.map(c => ({ label: c.courseName, value: c.id }))))
      .catch(() => {})
  }, [])
  const fields = [
    { name: 'deptId', label: '部门', required: true, type: 'select' as const, options: departOptions },
    { name: 'courseId', label: '课程', required: true, type: 'select' as const, options: courseOptions },
    { name: 'openTime', label: '开放时间' },
  ]
  return <CrudList
    urls={{ list: '/teaching/teachingCourseDept/list', delete: '/teaching/teachingCourseDept/delete', deleteBatch: '/teaching/teachingCourseDept/deleteBatch', exportXls: '/teaching/teachingCourseDept/exportXls', importExcel: '/teaching/teachingCourseDept/importExcel' }}
    title="班级课程"
    columns={[{title:'部门',dataIndex:'deptId_dictText'},{title:'课程',dataIndex:'courseId_dictText'},{title:'开放时间',dataIndex:'openTime'}]}
    fields={fields}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
