import { useState, useEffect } from 'react'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { getAction } from '@/api/client'
import { useDictOptions, toOptions } from '@/hooks/use-dict-options'

interface Depart { id: string; departName: string }

export default function Page() {
  const api = crudApi('/sys/position')
  const postRankOptions = useDictOptions('post_rank')
  const [companyOptions, setCompanyOptions] = useState<{ label: string; value: string }[]>([])
  useEffect(() => {
    getAction<Depart[]>('/sys/sysDepart/listAll')
      .then(r => Array.isArray(r) ? r : [])
      .then(list => setCompanyOptions(list.map(d => ({ label: d.departName, value: d.id }))))
      .catch(() => {})
  }, [])
  const fields = [
    { name: 'code', label: '编码', required: true },
    { name: 'name', label: '名称', required: true },
    { name: 'postRank', label: '职级', type: 'select' as const, options: toOptions(postRankOptions.data) },
    { name: 'companyId', label: '公司', type: 'select' as const, options: companyOptions },
  ]
  return <CrudList
    urls={{ list: '/sys/position/list', delete: '/sys/position/delete', deleteBatch: '/sys/position/deleteBatch', exportXls: '/sys/position/exportXls', importExcel: '/sys/position/importExcel' }}
    title="职务管理"
    columns={[{title:'编码',dataIndex:'code'},{title:'名称',dataIndex:'name'},{title:'职级',dataIndex:'postRank_dictText'},{title:'公司',dataIndex:'companyId_dictText'}]}
    fields={fields}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
