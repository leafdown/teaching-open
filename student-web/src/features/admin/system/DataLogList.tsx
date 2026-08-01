import CrudList from '@/components/crud/CrudList'

export default function Page() {
  return <CrudList
    urls={{ list: '/sys/dataLog/list', delete: '/sys/dataLog/delete', deleteBatch: '/sys/dataLog/deleteBatch', exportXls: '/sys/dataLog/exportXls', importExcel: '/sys/dataLog/importExcel' }}
    title="数据日志"
    hideEdit hideAdd
    columns={[{title:'数据表',dataIndex:'dataTable'},{title:'数据ID',dataIndex:'dataId'},{title:'版本',dataIndex:'dataVersion'},{title:'内容',dataIndex:'dataContent'},{title:'操作人',dataIndex:'createBy'}]}
    fields={[]}
  />
}
