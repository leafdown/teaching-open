# Student Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal center dashboard at `/center` that aggregates user stats, recent works, courses, and quick-create actions, replacing the "我的作品" nav entry.

**Architecture:** A new `features/center/` page with sub-components (StatCard, WorkCard). Leverages existing APIs (`mineWorks`, `leaderboard`, course API). Top nav modified in `StudentLayout.tsx`. Route added to `router/index.tsx`.

**Tech Stack:** React 18, Ant Design 5, TanStack React Query 5, Zustand, React Router 6

## File Structure

```
student-web/src/
├── features/center/
│   ├── index.tsx              # 主页面 — 组合所有模块
│   ├── StatCard.tsx            # 统计数字卡片 (作品数/获赞数/课程数)
│   └── WorkCard.tsx            # 单个作品卡片(封面+名称+类型)
├── router/index.tsx            # + /center 路由
└── layouts/StudentLayout.tsx   # 导航 "我的作品" → "个人中心"
```

## Global Constraints

- Follow existing code patterns (Zustand stores, TanStack Query, Ant Design 5)
- Use `@/` import aliases
- All new components must be lazily loaded in router
- Nav labels and icons follow existing layout conventions
- Build must pass with `npx vite build` (zero errors)

---

### Task 1: Add /center route and update nav

**Files:**
- Modify: `student-web/src/router/index.tsx`
- Modify: `student-web/src/layouts/StudentLayout.tsx`

- [ ] **Add Center lazy import and route**

In `router/index.tsx`:
```tsx
const Center = lazy(() => import('@/features/center'))
```

In auth-required StudentLayout routes:
```tsx
{ path: 'center', element: <Lazy><Center /></Lazy> },
```

- [ ] **Update nav in StudentLayout.tsx**

Change line 61: `label: '我的作品'` → `label: '个人中心'`, `onClick: () => nav('/works')` → `nav('/center')`

- [ ] **Update current path detection**

```tsx
const current = loc.pathname.startsWith('/center') ? 'center' :
```

- [ ] **Build check**: `cd student-web && npx vite build`

- [ ] **Commit**: `git add ... && git commit -m "feat: add /center route"`

---

### Task 2: StatCard component

**Files:** Create: `student-web/src/features/center/StatCard.tsx`

```tsx
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
```

- [ ] Create file, build check, commit

---

### Task 3: WorkCard component

**Files:** Create: `student-web/src/features/center/WorkCard.tsx`

```tsx
import { Card, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { WorkVO } from '@/api/work.api'

interface Props { work: WorkVO }

const TYPE_MAP: Record<number, { label: string; color: string }> = {
  1: { label: 'Scratch', color: '#fa8c16' },
  2: { label: 'Scratch', color: '#fa8c16' },
  3: { label: 'ScratchJr', color: '#52c41a' },
  4: { label: 'Python', color: '#4ec9b0' },
  10: { label: 'Blockly', color: '#722ed1' },
}

export default function WorkCard({ work }: Props) {
  const nav = useNavigate()
  const type = TYPE_MAP[work.workType || 2] || { label: '未知', color: '#888' }
  return (
    <Card hoverable size="small" onClick={() => nav(`/work-detail?id=${work.id}`)}
      cover={
        <div style={{ height: 100, background: '#f5f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <span style={{ fontSize: 36, opacity: 0.3 }}>{work.workType === 4 ? '🐍' : '🧩'}</span>
        </div>
      }>
      <Card.Meta title={<span style={{ fontSize: 13 }}>{work.workName}</span>} />
      <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
        <Tag color={type.color} style={{ fontSize: 10 }}>{type.label}</Tag>
        {work.starNum != null && <span style={{ fontSize: 11, color: '#999' }}>⭐ {work.starNum}</span>}
      </div>
    </Card>
  )
}
```

- [ ] Create file, build check, commit

---

### Task 4: Center main page

**Files:** Create: `student-web/src/features/center/index.tsx`

Main page combines:
1. User info card (avatar, name, signature, "编辑资料" button)
2. Stats row (works count, stars, courses, days) using StatCard
3. Quick create buttons (Scratch/Python/ScratchJr/Blockly)
4. Recent works grid (4 cards) using WorkCard, fetched via `mineWorks({pageNo:1, pageSize:4})`
5. My courses section (placeholder for now)

- [ ] Create file, build check, commit

---

### Task 5: Final build & verify

- [ ] `cd student-web && npx vite build` — zero errors
- [ ] Test: nav shows "个人中心", `/center` loads with data, quick create works, links work
