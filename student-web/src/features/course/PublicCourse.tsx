import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Card, Row, Col, Select, Input, Button, Modal, Spin, Empty, Typography, Space } from 'antd'
import { getHomeCourse, CourseVO } from '@/api/course.api'
import { fileUrl } from '@/api/common.api'
import { getDictItems } from '@/api/system.api'
import { DictItem } from '@/api/types'
import { SafeHtml } from '@/utils/safe-html'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const { Title } = Typography
const PAGE_SIZE = 12

/** 加载字典选项, staleTime Infinity 避免重复请求 */
function useDictOptions(code: string) {
  return useQuery({
    queryKey: ['dict', code],
    queryFn: () => getDictItems(code),
    staleTime: Infinity,
  })
}

function toOptions(items?: DictItem[]) {
  return items?.map((d) => ({ value: d.value, label: d.text })) ?? []
}

function CourseCard({ course, onClick }: { course: CourseVO; onClick: () => void }) {
  return (
    <Card
      hoverable
      styles={{ body: { padding: 0 } }}
      onClick={onClick}
      style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
    >
      <div style={{ height: 160, background: '#f5f5f5', overflow: 'hidden' }}>
        {course.courseCover ? (
          <img
            src={fileUrl(course.courseCover)}
            alt={course.courseName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#bbb' }}>
            暂无封面
          </div>
        )}
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {course.courseName}
        </div>
        {course.teacherName && (
          <div style={{ fontSize: 13, color: '#999', marginTop: 4 }}>教师：{course.teacherName}</div>
        )}
      </div>
    </Card>
  )
}

export default function PublicCourse() {
  const nav = useNavigate()
  const [courseCategory, setCourseCategory] = useState<string | undefined>(undefined)
  const [courseType, setCourseType] = useState<string | undefined>(undefined)
  const [courseName, setCourseName] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [current, setCurrent] = useState<CourseVO | null>(null)
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)

  const categoryOptions = useDictOptions('course_category')
  const typeOptions = useDictOptions('course_type')

  const query = useInfiniteQuery({
    queryKey: ['homeCourse', { courseCategory, courseType, courseName }],
    queryFn: ({ pageParam }) =>
      getHomeCourse({
        pageNo: pageParam,
        pageSize: PAGE_SIZE,
        courseCategory,
        courseType,
        courseName: courseName || undefined,
        orderBy: 'time',
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.records.length, 0)
      return loaded < lastPage.total ? allPages.length + 1 : undefined
    },
  })

  const courses = query.data?.pages.flatMap((p) => p.records) ?? []
  const hasMore = query.hasNextPage

  const openDetail = (course: CourseVO) => {
    setCurrent(course)
    setModalOpen(true)
  }

  const goToCourse = () => {
    if (current?.id) {
      setModalOpen(false)
      nav(`/course/${current.id}`)
    }
  }

  return (
    <div style={{ padding: '24px 0' }}>
      {/* 筛选区 */}
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Space wrap size="middle" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Select
            style={{ width: isMobile ? '100%' : 200 }}
            placeholder="请选择课程分类"
            allowClear
            value={courseCategory}
            onChange={setCourseCategory}
            loading={categoryOptions.isLoading}
            options={toOptions(categoryOptions.data)}
          />
          <Select
            style={{ width: isMobile ? '100%' : 200 }}
            placeholder="请选择课程性质"
            allowClear
            value={courseType}
            onChange={setCourseType}
            loading={typeOptions.isLoading}
            options={toOptions(typeOptions.data)}
          />
          <Input.Search
            style={{ width: isMobile ? '100%' : 220 }}
            placeholder="请输入课程名称"
            allowClear
            onSearch={setCourseName}
          />
        </Space>
      </Card>

      <Title level={5} style={{ marginBottom: 16, marginTop: 0 }}>推荐课程</Title>

      {query.isLoading && (
        <div style={{ textAlign: 'center', padding: 48 }}>
          <Spin />
        </div>
      )}

      {!query.isLoading && courses.length === 0 && <Empty description="暂无课程" />}

      {courses.length > 0 && (
        <Row gutter={[24, 24]}>
          {courses.map((c) => (
            <Col key={c.id} xs={24} sm={12} md={8} lg={6}>
              <CourseCard course={c} onClick={() => openDetail(c)} />
            </Col>
          ))}
        </Row>
      )}

      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button loading={query.isFetchingNextPage} onClick={() => query.fetchNextPage()}>
            加载更多……
          </Button>
        </div>
      )}

      <Modal
        title={current?.courseName}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={goToCourse}
        okText="去上课"
        cancelText="关闭"
        width={560}
      >
        <SafeHtml html={current?.courseDesc || '暂无描述'} />
      </Modal>
    </div>
  )
}
