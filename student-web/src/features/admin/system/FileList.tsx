import { Tooltip } from 'antd'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { getFilePreview } from '@/api/common.api'
import { useDictOptions, toOptions } from '@/hooks/use-dict-options'

export default function Page() {
  const api = crudApi('/system/sysFile')
  const fileTypeOptions = useDictOptions('file_type')
  const fileLocationOptions = useDictOptions('file_location')
  const fields = [
    { name: 'fileName', label: '文件名', required: true },
    { name: 'fileType', label: '文件类型', type: 'select' as const, options: toOptions(fileTypeOptions.data) },
    { name: 'fileLocation', label: '存储位置', type: 'select' as const, options: toOptions(fileLocationOptions.data) },
    { name: 'fileTag', label: '标签' },
    { name: 'filePath', label: '文件路径' },
  ]
  return <CrudList
    urls={{ list: '/system/sysFile/list', delete: '/system/sysFile/delete', deleteBatch: '/system/sysFile/deleteBatch', exportXls: '/system/sysFile/exportXls', importExcel: '/system/sysFile/importExcel' }}
    title="文件管理"
    columns={[{title:'文件类型',dataIndex:'fileType_dictText'},{title:'文件名',dataIndex:'fileName'},{title:'存储位置',dataIndex:'fileLocation_dictText'},{title:'标签',dataIndex:'fileTag'},{title:'预览',dataIndex:'filePath',render:(v:string)=> v ? <Tooltip title="预览"><a href={getFilePreview(v)} target="_blank" rel="noreferrer"><i className="fas fa-eye" /></a></Tooltip> : '—'}]}
    fields={fields}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
