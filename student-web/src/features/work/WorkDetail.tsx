import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Spin, Card, Button, Avatar, List, Input, message, Row, Col, Statistic, Popover } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { studentWorkInfo, starWork, getWorkComments, saveComment, WorkVO } from '@/api/work.api'
import { QRCodeCanvas } from 'qrcode.react'
import { fileUrl, coverUrl, workFileUrl } from '@/api/common.api'
import PythonPlayer from '@/features/python-ide/Player'
import TouchKeypad from '@/components/TouchKeypad'
import { RESPONSIVE, contentWrapper } from '@/utils/responsive-utils'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

function playerContent(w: WorkVO, scratchSrc: string, refCallback?: (el: HTMLIFrameElement | null) => void): React.ReactNode {
  const t = Number(w.workType)
  if (t === 4) return <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}><PythonPlayer workFile={workFileUrl(w)} /></div>
  if (t === 3) return <iframe ref={refCallback} src={`/scratchjr/editor.html?mode=look&workFile=${w.workFile||''}`} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} title="player" />
  if (t === 10) return <iframe ref={refCallback} src={`/blockly/index.html?lang=zh-hans&workId=${w.id}`} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} title="player" />
  return <iframe ref={refCallback} src={scratchSrc} scrolling="no" title="player"
    style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:'100%',height:'100%',border:'none',overflow:'hidden'}} />
}

export default function WorkDetail() {
  const [params] = useSearchParams()
  const id = params.get('id') || ''
  const qc = useQueryClient()
  const [comment, setComment] = useState('')
  const [cmtPage, setCmtPage] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false)
    }
    const onScroll = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [fullscreen])

  const handleKeyEvent = useCallback((key: string, code: string, type: 'keydown' | 'keyup') => {
    const keyCodeMap: Record<string, number> = {
      ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40,
      Space: 32, Enter: 13, Escape: 27,
      KeyW: 87, KeyA: 65, KeyS: 83, KeyD: 68,
    }
    const which = keyCodeMap[code] || 0

    const eventInit: KeyboardEventInit = {
      key, code, which, keyCode: which,
      bubbles: true, cancelable: true,
    }

    document.dispatchEvent(new KeyboardEvent(type, eventInit))

    const iframe = iframeRef.current
    if (iframe?.contentWindow) {
      iframe.contentWindow.dispatchEvent(new KeyboardEvent(type, eventInit))
      try {
        iframe.contentDocument?.dispatchEvent(new KeyboardEvent(type, eventInit))
      } catch { /* 跨域忽略 */ }
    }
  }, [])

  const iframeCallback = useCallback((el: HTMLIFrameElement | null) => {
    iframeRef.current = el
  }, [])

  const q = useQuery({ queryKey: ['work', id], queryFn: () => studentWorkInfo(id) })
  const cmts = useQuery({ queryKey: ['comments', id, cmtPage], queryFn: () => getWorkComments(id, cmtPage) })
  const star = useMutation({ mutationFn: () => starWork(id), onSuccess: (res) => { message.success(res?.message || '已点赞'); qc.invalidateQueries({ queryKey: ['work', id] }) } })
  const postCmt = useMutation({ mutationFn: () => saveComment(id, comment), onSuccess: () => { setComment(''); qc.invalidateQueries({ queryKey: ['comments', id, cmtPage] }); message.success('评论成功') } })

  if (q.isLoading) return <div style={{ padding: 24, textAlign: 'center' }}><Spin /></div>
  const w = q.data
  if (!w) return <div style={{ padding: 24 }}>作品不存在</div>

  // workType: 1/2=scratch3, 3=scratchjr, 4=python, 10=blockly
  // nofs=1:该页自带 AntD 全屏按钮,关闭 player.html 内置的 Scratch 全屏按钮,避免重复
  const isScratch = Number(w.workType) === 1 || Number(w.workType) === 2
  const scratchSrc = `/scratch3/player.html?workId=${w.id}${isScratch ? '&nofs=1' : ''}`

  return (
    <div style={contentWrapper}>
      <Row gutter={16}>
        <Col {...RESPONSIVE.colSidebar}>
          <Card styles={{ body: { padding: 0 } }} style={{ overflow: 'hidden' }}>
            {fullscreen ? (
              <div ref={playerRef} style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: '#111', zIndex: 9999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: '100%', height: '100%', maxWidth: 'calc(100vh * 4 / 3)', maxHeight: 'calc(100vw * 3 / 4)' }}>
                  {playerContent(w, scratchSrc, iframeCallback)}
                </div>
                <Button type="primary" size="large" icon={<FullscreenExitOutlined />} shape="circle"
                  onClick={() => setFullscreen(false)}
                  style={{ position: 'absolute', top: 16, right: 16 }} />
              </div>
            ) : (
              <div style={{ position: 'relative', width: '100%', paddingBottom: '75%' }}>
                {playerContent(w, scratchSrc, iframeCallback)}
                {isScratch && (
                  <Button icon={<FullscreenOutlined />} onClick={() => setFullscreen(true)}
                    style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }} />
                )}
              </div>
            )}
          </Card>
          {isMobile && Number(w.workType) !== 3 && !fullscreen && (
            <TouchKeypad onKey={handleKeyEvent} />
          )}
        </Col>
        <Col {...RESPONSIVE.colSidePanel}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Avatar src={w.workCover ? coverUrl(w) : undefined} />
              <strong>{w.workName}</strong>
            </div>
            <Row gutter={16}>
              <Col span={12}><Statistic title="观看" value={w.viewNum ?? w.viewCount ?? 0} /></Col>
              <Col span={12}><Statistic title="点赞" value={w.starNum ?? w.starCount ?? 0} /></Col>
            </Row>
            <Button type="primary" block style={{ marginTop: 12 }} onClick={() => star.mutate()} loading={star.isPending}>点赞</Button>
            <Popover content={<QRCodeCanvas value={location.href} size={160} />} title="扫码分享" placement="bottom">
              <Button block style={{ marginTop: 8 }}>分享二维码</Button>
            </Popover>
            <div style={{ marginTop: 12, fontSize: 12, color: '#999' }}>创建时间:{w.createTime}</div>
          </Card>
        </Col>
      </Row>

      <Card title="评论" style={{ marginTop: 16 }}>
        <Input.TextArea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="说点什么..." />
        <Button style={{ marginTop: 8 }} type="primary" disabled={!comment.trim()} onClick={() => postCmt.mutate()} loading={postCmt.isPending}>发表</Button>
        <List style={{ marginTop: 12 }} dataSource={cmts.data || []} renderItem={(c) => (
          <List.Item><List.Item.Meta avatar={<Avatar src={coverUrl(c) as string} >{(c.realname || c.username || '?')[0]}</Avatar>} title={c.realname || c.username} description={<>{c.comment}<div style={{ fontSize: 12, color: '#999' }}>{c.createTime}</div></>} /></List.Item>
        )} />
        <Button type="link" loading={cmts.isFetching} onClick={() => setCmtPage((p) => p + 1)}>加载更多</Button>
      </Card>
    </div>
  )
}
