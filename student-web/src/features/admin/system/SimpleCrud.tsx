import { useSearchParams } from 'react-router-dom'
import CrudList from '@/components/crud/CrudList'
import { Empty, Typography } from 'antd'

const { Text } = Typography

// 兜底:后端菜单 component 未在前端注册专用页时使用
// - 若 URL 带 ?baseUrl= 则用通用 CrudList 渲染标准 CRUD
// - 否则显示「未实现」提示
export default function SimpleCrud({ componentPath }: { componentPath?: string; baseUrl?: string }) {
  const [params] = useSearchParams()
  const baseUrl = params.get('baseUrl')
  if (!baseUrl) {
    return (
      <Empty description={false} style={{ padding: 48 }}>
        <div style={{ marginTop: 16 }}>
          <Typography.Title level={4}>页面 {componentPath} 暂未实现</Typography.Title>
          <Text type="secondary">
            该菜单在前端尚无对应组件。若为标准 CRUD,可通过 URL 传 <Text code>?baseUrl=/模块/资源</Text> 试用通用列表。
          </Text>
        </div>
      </Empty>
    )
  }
  return (
    <CrudList
      urls={{ list: `${baseUrl}/list`, delete: `${baseUrl}/delete`, deleteBatch: `${baseUrl}/deleteBatch`, exportXls: `${baseUrl}/exportXls`, importExcel: `${baseUrl}/importExcel` }}
      columns={[]}
      fields={[]}
      title={componentPath || '通用列表'}
    />
  )
}
