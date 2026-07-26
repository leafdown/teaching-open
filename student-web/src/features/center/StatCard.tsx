import { ReactNode } from 'react'
import { Card } from 'antd'

interface Props {
  icon: ReactNode
  label: string
  value: number | string
}

export default function StatCard({ icon, label, value }: Props) {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
        <div style={{ fontSize: 28, fontWeight: 600 }}>{value}</div>
        <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>{label}</div>
      </div>
    </Card>
  )
}
