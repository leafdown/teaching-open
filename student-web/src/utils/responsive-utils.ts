// 响应式布局工具 — 统一列模式断点定义
// 所有页面引用此处，确保断点一致性，修改一处全域生效

import type { ColProps } from 'antd'

/** Ant Design Col 响应式列模式（基于 24 栏网格） */
export const RESPONSIVE: Record<string, ColProps> = {
  /** 4列 → 2列 → 1列: 作品/课程卡片网格 */
  col4: { xs: 24, sm: 12, md: 8, lg: 6 },
  /** 3列 → 1列: 编辑器入口卡片 */
  col3: { xs: 24, sm: 8 },
  /** 6列 → 3列 → 2列: 排行榜密集网格 */
  col6: { xs: 12, sm: 8, md: 6, lg: 4 },
  /** 2列 → 1列: 统计卡片/快捷按钮 */
  col2: { xs: 12, md: 6 },
  /** 左栏（主内容）: 全宽→2/3 */
  colSidebar: { xs: 24, md: 16 },
  /** 右栏（侧面板）: 全宽→1/3 */
  colSidePanel: { xs: 24, md: 8 },
}

/** 内容区通用 wrapper 样式 */
export const contentWrapper: React.CSSProperties = {
  maxWidth: 'var(--content-max-width, 1100px)',
  margin: '0 auto',
  padding: 'var(--content-padding, 24px)',
}
