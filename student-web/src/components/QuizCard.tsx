import React from 'react'
import '../styles/maic-tokens.css'
import '../styles/maic-components.css'

interface QuizCardProps {
  title: string
  status: string
  statusColor?: string
  questionCount: number
  totalScore?: number
  score?: number
  timeLimit?: number
  timeRemaining?: number
  completed?: boolean
  stats?: Array<{ label: string; value: string }>
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export default function QuizCard({
  title,
  status,
  statusColor = 'var(--maic-indigo, #6366f1)',
  questionCount,
  totalScore,
  score,
  timeLimit,
  timeRemaining,
  completed = false,
  stats,
  onClick,
  className = '',
  style,
}: QuizCardProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 20,
        borderRadius: 'var(--card-radius, 14px)',
        background: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--card-border, rgba(0,0,0,0.06))',
        boxShadow: 'var(--card-shadow, 0 1px 3px rgba(0,0,0,0.06))',
        cursor: onClick ? 'pointer' : undefined,
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--card-shadow, 0 1px 3px rgba(0,0,0,0.06))'
          e.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      {/* Header row: title + status badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: '#18181b',
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 10px',
            borderRadius: 9999,
            fontSize: 11,
            fontWeight: 500,
            color: statusColor,
            backgroundColor: `${statusColor}14`,
            whiteSpace: 'nowrap',
          }}
        >
          {status}
        </span>
      </div>

      {/* Main stats row */}
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 11, color: '#a1a1aa' }}>题目数</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#18181b' }}>
            {questionCount}
          </span>
        </div>

        {totalScore !== undefined && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, color: '#a1a1aa' }}>总分</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#18181b' }}>
              {totalScore}
            </span>
          </div>
        )}

        {score !== undefined && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, color: '#a1a1aa' }}>得分</span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: completed ? 'var(--maic-emerald, #10b981)' : '#18181b',
              }}
            >
              {score}
              {totalScore ? (
                <span style={{ fontSize: 12, color: '#a1a1aa', fontWeight: 400 }}>
                  {' '}/ {totalScore}
                </span>
              ) : null}
            </span>
          </div>
        )}

        {timeLimit !== undefined && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, color: '#a1a1aa' }}>时限</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#18181b' }}>
              {timeLimit}
              <span style={{ fontSize: 11, color: '#a1a1aa', fontWeight: 400, marginLeft: 2 }}>
                分钟
              </span>
            </span>
          </div>
        )}

        {timeRemaining !== undefined && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, color: '#a1a1aa' }}>剩余</span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: timeRemaining < 5 ? 'var(--maic-rose, #f43f5e)' : '#18181b',
              }}
            >
              {timeRemaining}
              <span style={{ fontSize: 11, color: '#a1a1aa', fontWeight: 400, marginLeft: 2 }}>
                分钟
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Extra stats */}
      {stats && stats.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 20px',
            paddingTop: 8,
            borderTop: '1px solid var(--card-border, rgba(0,0,0,0.06))',
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 11, color: '#a1a1aa' }}>{stat.label}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#18181b' }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Progress indicator for in-progress quizzes */}
      {timeRemaining !== undefined && !completed && (
        <div
          style={{
            width: '100%',
            height: 4,
            borderRadius: 2,
            backgroundColor: '#e4e4e7',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 2,
              width: `${Math.max(0, Math.min(100, (timeRemaining / (timeLimit ?? 60)) * 100))}%`,
              backgroundColor:
                timeRemaining < 5
                  ? 'var(--maic-rose, #f43f5e)'
                  : 'var(--maic-indigo, #6366f1)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}
    </div>
  )
}
