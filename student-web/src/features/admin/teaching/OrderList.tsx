import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
export default function Page() {
  const api = crudApi('/teaching/teachingOrder')
  return <CrudList
    urls={{ list: '/teaching/teachingOrder/list', delete: '/teaching/teachingOrder/delete', deleteBatch: '/teaching/teachingOrder/deleteBatch', exportXls: '/teaching/teachingOrder/exportXls', importExcel: '/teaching/teachingOrder/importExcel' }}
    title="订单管理"
    columns={[{title:'订单号',dataIndex:'orderNo'},{title:'用户',dataIndex:'userId'},{title:'金额',dataIndex:'price'},{title:'实付',dataIndex:'payPrice'},{title:'状态',dataIndex:'status_dictText'},{title:'支付方式',dataIndex:'method_dictText'},{title:'创建时间',dataIndex:'createTime'}]}
    fields={[{name:'orderNo',label:'订单号',required:true},{name:'userId',label:'用户'},{name:'price',label:'金额',type:'number'},{name:'payPrice',label:'实付',type:'number'},{name:'status',label:'状态'},{name:'method',label:'支付方式'},{name:'comment',label:'备注',type:'textarea'}]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
