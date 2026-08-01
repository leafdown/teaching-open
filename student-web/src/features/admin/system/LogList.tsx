import CrudList from '@/components/crud/CrudList'

export default function Page() {
  return <CrudList
    urls={{ list: '/sys/log/list', delete: '/sys/log/delete', deleteBatch: '/sys/log/deleteBatch', exportXls: '/sys/log/exportXls', importExcel: '/sys/log/importExcel' }}
    title="系统日志"
    hideEdit hideAdd
    columns={[{title:'日志内容',dataIndex:'logContent'},{title:'用户名',dataIndex:'username'},{title:'IP',dataIndex:'ip'},{title:'耗时',dataIndex:'costTime'},{title:'类型',dataIndex:'logType_dictText'},{title:'操作',dataIndex:'operateType_dictText'},{title:'时间',dataIndex:'createTime'}]}
    fields={[]}
  />
}
