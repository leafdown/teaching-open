import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'

export default function Page() {
  const api = crudApi('/sys/dataSource')
  return <CrudList
    urls={{ list: '/sys/dataSource/list', delete: '/sys/dataSource/delete', deleteBatch: '/sys/dataSource/deleteBatch', exportXls: '/sys/dataSource/exportXls', importExcel: '/sys/dataSource/importExcel' }}
    title="数据源管理"
    columns={[{title:'编码',dataIndex:'code'},{title:'名称',dataIndex:'name'},{title:'数据库类型',dataIndex:'dbType_dictText'},{title:'驱动',dataIndex:'dbDriver'},{title:'URL',dataIndex:'dbUrl'},{title:'库名',dataIndex:'dbName'},{title:'用户名',dataIndex:'dbUsername'}]}
    fields={[{name:'code',label:'编码',required:true},{name:'name',label:'名称',required:true},{name:'dbType',label:'数据库类型',required:true},{name:'dbDriver',label:'驱动'},{name:'dbUrl',label:'URL',required:true},{name:'dbName',label:'库名'},{name:'dbUsername',label:'用户名'},{name:'dbPassword',label:'密码'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
