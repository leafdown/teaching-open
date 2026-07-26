import { Card, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function Center() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <Card>
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <UserOutlined style={{ fontSize: 64, color: '#1890ff' }} />
          <Typography.Title level={3} style={{ marginTop: 16 }}>个人中心</Typography.Title>
          <Typography.Text type="secondary">功能开发中，敬请期待</Typography.Text>
        </div>
      </Card>
    </div>
  )
}
