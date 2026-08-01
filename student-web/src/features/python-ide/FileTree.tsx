import { useState, ReactNode, useRef } from 'react'
import { Input, Modal, Select, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import {
  FileOutlined, PlusOutlined, FolderOpenOutlined, FolderAddOutlined,
  CloseOutlined, DeleteOutlined, EditOutlined, FolderFilled,
  PictureOutlined, SoundOutlined, CodeOutlined, SwapOutlined,
  FileAddOutlined, UploadOutlined,
} from '@ant-design/icons'

interface Props {
  files: string[]
  activeFile: string
  activeDir: string
  onSelect: (name: string) => void
  onSelectDir: (dirPath: string) => void
  onMoveFile: (oldPath: string, newPath: string) => void
  onAdd: (name: string) => void
  onAddBinary?: (name: string, dataUrl: string, size: number) => void
  onDelete: (name: string) => void
  onRename?: (oldName: string, newName: string) => void
  fileTypes?: Record<string, 'text' | 'binary'>
}

interface TreeNode {
  name: string; path: string; isDir: boolean; children: TreeNode[]
}

function buildTree(paths: string[]): TreeNode[] {
  const root: TreeNode[] = []
  const dirMap: Record<string, TreeNode[]> = { '': root }

  function ensureDir(dirPath: string): TreeNode[] {
    if (dirMap[dirPath]) return dirMap[dirPath]
    if (!dirPath) return root
    const parentPath = dirPath.includes('/') ? dirPath.slice(0, dirPath.lastIndexOf('/')) : ''
    const parentChildren = ensureDir(parentPath)
    const name = dirPath.includes('/') ? dirPath.slice(dirPath.lastIndexOf('/') + 1) : dirPath
    const node: TreeNode = { name, path: dirPath, isDir: true, children: [] }
    if (!parentChildren.some(c => c.path === dirPath && c.isDir)) {
      parentChildren.push(node)
    }
    dirMap[dirPath] = node.children
    return node.children
  }

  const sorted = [...paths].sort((a, b) => a.split('/').length - b.split('/').length || a.localeCompare(b))
  for (const p of sorted) {
    const parts = p.split('/')
    if (parts.length === 1) {
      if (parts[0].includes('.') && !p.endsWith('/')) {
        root.push({ name: p, path: p, isDir: false, children: [] })
      } else {
        const n: TreeNode = { name: p, path: p, isDir: true, children: [] }
        root.push(n); dirMap[p] = n.children
      }
    } else {
      const parentPath = parts.slice(0, -1).join('/'); const baseName = parts[parts.length - 1]
      const pc = ensureDir(parentPath)
      if ((baseName.includes('.') && !p.endsWith('/')) || parts.length > 2) {
        pc.push({ name: baseName, path: p, isDir: false, children: [] })
      } else if (!pc.some(c => c.path === p && c.isDir)) {
        const n: TreeNode = { name: baseName, path: p, isDir: true, children: [] }
        pc.push(n); dirMap[p] = n.children
      }
    }
  }
  return root
}

function fileIcon(name: string, fileTypes?: Record<string, 'text' | 'binary'>): ReactNode {
  const ext = name.split('.').pop()?.toLowerCase() || ''
  if (['png','jpg','jpeg','gif','svg','bmp','webp','ico'].includes(ext))
    return <PictureOutlined style={{ fontSize: 12, color: '#52c41a', flexShrink: 0 }} />
  if (['mp3','wav','ogg','aac','flac','m4a'].includes(ext))
    return <SoundOutlined style={{ fontSize: 12, color: '#1890ff', flexShrink: 0 }} />
  if (ext === 'py') return <CodeOutlined style={{ fontSize: 12, color: '#4ec9b0', flexShrink: 0 }} />
  return <FileOutlined style={{ fontSize: 12, color: '#888', flexShrink: 0 }} />
}

function parentDirPath(path: string): string {
  const i = path.lastIndexOf('/'); return i >= 0 ? path.slice(0, i) : ''
}

function collectDirPaths(nodes: TreeNode[]): string[] {
  const dirs: string[] = []
  for (const n of nodes) { if (n.isDir) { dirs.push(n.path); dirs.push(...collectDirPaths(n.children)) } }
  return dirs
}

export default function FileTree(props: Props) {
  const { files, activeFile, activeDir, onSelect, onSelectDir, onMoveFile, onAdd, onAddBinary, onDelete, onRename, fileTypes } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [adding, setAdding] = useState<'file' | 'dir' | null>(null)
  const [addingDir, setAddingDir] = useState('') // 在哪个目录下新建
  const [newName, setNewName] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [renaming, setRenaming] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState('')
  const [hoverPath, setHoverPath] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [dragOverDir, setDragOverDir] = useState<string | null>(null)
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(
    files.filter(f => !f.includes('.') || f.endsWith('/')).map(f => f.replace(/\/$/, ''))
  ))
  const [moveModalFile, setMoveModalFile] = useState<string | null>(null)
  const [moveTargetDir, setMoveTargetDir] = useState<string>('')
  const [contextPath, setContextPath] = useState<string | null>(null) // 右键点击的路径

  const tree = buildTree(files)

  const toggleDir = (path: string) => setExpandedDirs(prev => {
    const next = new Set(prev); next.has(path) ? next.delete(path) : next.add(path); return next
  })

  const handleDirClick = (path: string) => { toggleDir(path); onSelectDir(path) }

  const startAdd = (mode: 'file' | 'dir', targetDir: string) => {
    setAdding(mode); setAddingDir(targetDir); setNewName('')
  }

  const handleAdd = () => {
    if (!newName.trim()) { setAdding(null); return }
    const fullPath = addingDir ? addingDir + '/' + newName.trim() : newName.trim()
    // 无需验证扩展名（目录可以没有扩展名，文件由后端处理）
    onAdd(fullPath)
    setAdding(null); setNewName('')
    if (addingDir) setExpandedDirs(prev => new Set(prev).add(addingDir))
  }

  const handleRename = (oldName: string) => {
    if (!renameVal.trim()) { setRenaming(null); return }
    onRename?.(oldName, renameVal.trim()); setRenaming(null)
  }

  const handleMoveConfirm = () => {
    if (!moveModalFile) return
    const basename = moveModalFile.split('/').pop() || moveModalFile
    const newPath = moveTargetDir ? moveTargetDir + '/' + basename : basename
    if (newPath !== moveModalFile) onMoveFile(moveModalFile, newPath)
    setMoveModalFile(null); setMoveTargetDir('')
  }

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const targetPath = activeDir ? activeDir + '/' + file.name : file.name
      if (file.name.endsWith('.py')) onAdd(targetPath)
      else if (onAddBinary) onAddBinary(targetPath, dataUrl, file.size)
      else onAdd(targetPath)
    }
    reader.readAsDataURL(file)
    // 重置 input 以便重复选择同一文件
    e.target.value = ''
  }

  // 右键菜单
  const getContextMenu = (path: string, isDir: boolean): MenuProps['items'] => {
    const items: MenuProps['items'] = []
    if (isDir) {
      items.push({ key: 'newFile', icon: <FileAddOutlined />, label: '新建文件', onClick: () => startAdd('file', path) })
      items.push({ key: 'newDir', icon: <FolderAddOutlined />, label: '新建目录', onClick: () => startAdd('dir', path) })
      items.push({ type: 'divider' })
    } else {
      items.push({ key: 'rename', icon: <EditOutlined />, label: '重命名', onClick: () => { setRenaming(path); setRenameVal(path) } })
      items.push({ key: 'move', icon: <SwapOutlined />, label: '移动到...', onClick: () => { setMoveModalFile(path); setMoveTargetDir(parentDirPath(path)) } })
      items.push({ type: 'divider' })
      if (path !== 'main.py') items.push({ key: 'delete', icon: <DeleteOutlined />, label: '删除', danger: true, onClick: () => onDelete(path) })
    }
    if (isDir && path !== '') {
      items.push({ key: 'renameDir', icon: <EditOutlined />, label: '重命名目录', onClick: () => { setRenaming(path); setRenameVal(path) } })
      items.push({ key: 'deleteDir', icon: <DeleteOutlined />, label: '删除目录', danger: true, onClick: () => onDelete(path) })
    }
    return items
  }

  // 拖拽处理
  const handleDragStart = (e: React.DragEvent, path: string) => {
    e.dataTransfer.setData('text/plain', path)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDirDragOver = (e: React.DragEvent, dirPath: string) => {
    e.preventDefault(); e.stopPropagation()
    setDragOverDir(dirPath)
  }

  const handleDirDrop = (e: React.DragEvent, targetDir: string) => {
    e.preventDefault(); e.stopPropagation()
    setDragOverDir(null)
    const filePath = e.dataTransfer.getData('text/plain')
    if (!filePath) return // 可能是外部文件拖放
    const basename = filePath.split('/').pop() || filePath
    const newPath = targetDir ? targetDir + '/' + basename : basename
    if (newPath !== filePath) onMoveFile(filePath, newPath)
  }

  const handleExternalDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragOver(false)
    const droppedFiles = e.dataTransfer.files
    if (!droppedFiles || droppedFiles.length === 0) return
    for (let i = 0; i < droppedFiles.length; i++) {
      const df = droppedFiles[i]; const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        if (df.name.endsWith('.py')) onAdd(df.name)
        else if (onAddBinary) onAddBinary(df.name, dataUrl, df.size)
      }; reader.readAsDataURL(df)
    }
  }

  const renderNode = (node: TreeNode, depth: number): ReactNode => {
    if (node.isDir) {
      const expanded = expandedDirs.has(node.path)
      const isDragTarget = dragOverDir === node.path
      return (
        <div key={node.path}>
          <Dropdown menu={{ items: getContextMenu(node.path, true) }} trigger={['contextMenu']}>
            <div onClick={() => handleDirClick(node.path)}
              onContextMenu={() => setContextPath(node.path)}
              onDragOver={(e) => handleDirDragOver(e, node.path)}
              onDragLeave={() => setDragOverDir(null)}
              onDrop={(e) => handleDirDrop(e, node.path)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 12px', cursor: 'pointer', fontSize: 13,
                color: '#888', paddingLeft: 12 + depth * 16,
                background: isDragTarget ? 'rgba(78,201,176,0.15)' : activeDir === node.path ? '#37373d' : 'transparent',
                outline: isDragTarget ? '1px dashed #4ec9b0' : 'none' }}>
              {renaming === node.path ? (
                <Input size="small" value={renameVal} onChange={e => setRenameVal(e.target.value)}
                  onPressEnter={() => handleRename(node.path)} onBlur={() => handleRename(node.path)}
                  autoFocus style={{ fontSize: 12, height: 22 }} onClick={e => e.stopPropagation()} />
              ) : (<>
                {expanded ? <FolderOpenOutlined style={{ fontSize: 12, color: '#e8a838', flexShrink: 0 }} /> : <FolderFilled style={{ fontSize: 12, color: '#e8a838', flexShrink: 0 }} />}
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.name}</span>
              </>)}
            </div>
          </Dropdown>
          {expanded && node.children.map(c => renderNode(c, depth + 1))}
        </div>
      )
    }
    const isMainPy = node.path === 'main.py'
    return (
      <Dropdown key={node.path} menu={{ items: getContextMenu(node.path, false) }} trigger={['contextMenu']}>
        <div onClick={() => onSelect(node.path)}
          draggable={!isMainPy} onDragStart={(e) => handleDragStart(e, node.path)}
          onContextMenu={() => setContextPath(node.path)}
          style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 12px', cursor: 'pointer',
            fontSize: 13, color: activeFile === node.path ? '#e0e0e0' : '#888',
            background: activeFile === node.path ? '#37373d' : 'transparent', paddingLeft: 12 + depth * 16 }}>
          {fileIcon(node.path, fileTypes)}
          {renaming === node.path ? (
            <Input size="small" value={renameVal} onChange={e => setRenameVal(e.target.value)}
              onPressEnter={() => handleRename(node.path)} onBlur={() => handleRename(node.path)}
              autoFocus style={{ fontSize: 12, height: 22 }} onClick={e => e.stopPropagation()} />
          ) : (
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.name}</span>
          )}
        </div>
      </Dropdown>
    )
  }

  if (collapsed) return (
    <div style={{ width: 36, background: '#252526', borderRight: '1px solid #3e3e42', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, cursor: 'pointer' }} onClick={() => setCollapsed(false)}>
      <FolderOpenOutlined style={{ color: '#888', fontSize: 16 }} />
    </div>
  )

  return (<>
    <div style={{ width: 220, background: '#252526', borderRight: '1px solid #3e3e42', display: 'flex', flexDirection: 'column', flexShrink: 0 }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => { setDragOver(false); setDragOverDir(null) }}
      onDrop={handleExternalDrop}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #3e3e42' }}>
        <span style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>文件</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <PlusOutlined style={{ color: '#888', cursor: 'pointer', fontSize: 12 }} onClick={() => startAdd('file', activeDir)} title="新建文件" />
          <FolderAddOutlined style={{ color: '#888', cursor: 'pointer', fontSize: 12 }} onClick={() => startAdd('dir', activeDir)} title="新建目录" />
          <UploadOutlined style={{ color: '#888', cursor: 'pointer', fontSize: 12 }} onClick={() => fileInputRef.current?.click()} title="上传文件" />
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleUploadFile} />
          <CloseOutlined style={{ color: '#888', cursor: 'pointer', fontSize: 12 }} onClick={() => setCollapsed(true)} />
        </div>
      </div>
      {adding && (
        <div style={{ padding: '4px 8px' }}>
          <Input size="small" placeholder={adding === 'dir' ? '文件夹名' : '文件名.py'} value={newName}
            onChange={e => setNewName(e.target.value)}
            onPressEnter={handleAdd}
            onBlur={() => { if (!newName) setAdding(null); else handleAdd() }}
            autoFocus style={{ fontSize: 12 }} />
          <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>
            {adding === 'dir' ? '输入目录名后回车' : `将创建到 ${addingDir || '(根目录)'}，回车确认`}
          </div>
        </div>
      )}
      <Dropdown menu={{ items: [
        { key: 'newFile', icon: <FileAddOutlined />, label: '新建文件', onClick: () => startAdd('file', '') },
        { key: 'newDir', icon: <FolderAddOutlined />, label: '新建目录', onClick: () => startAdd('dir', '') },
      ]}} trigger={['contextMenu']}>
        <div style={{ flex: 1, overflow: 'auto', padding: '4px 0', position: 'relative' }}
          onContextMenu={() => setContextPath('')}>
          {tree.map(node => renderNode(node, 0))}
          {tree.length === 0 && <div style={{ color: '#555', textAlign: 'center', paddingTop: 24, fontSize: 12 }}>暂无文件 — 右键或点 + 新建</div>}
          {dragOver && (
            <div style={{ position: 'absolute', inset: 0, border: '2px dashed #4ec9b0', borderRadius: 4, background: 'rgba(78, 201, 176, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <span style={{ color: '#4ec9b0', fontSize: 13 }}>拖放文件到此</span>
            </div>
          )}
        </div>
      </Dropdown>
    </div>
    <Modal title="移动文件" open={!!moveModalFile} onOk={handleMoveConfirm} onCancel={() => { setMoveModalFile(null); setMoveTargetDir('') }}
      okText="移动" cancelText="取消"
      styles={{ mask: { background: 'rgba(0,0,0,0.7)' }, content: { background: '#252526', color: '#d4d4d4', border: '1px solid #3e3e42' } }}
      okButtonProps={{ style: { background: '#0e639c', borderColor: '#0e639c' } }}>
      <div style={{ padding: '8px 0' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#888' }}>将 <span style={{ color: '#d4d4d4' }}>{moveModalFile}</span> 移动到：</div>
        <Select value={moveTargetDir} onChange={setMoveTargetDir} options={[{ value: '', label: '(根目录)' }, ...collectDirPaths(tree).map(d => ({ value: d, label: '/' + d }))]}
          style={{ width: '100%' }} />
      </div>
    </Modal>
  </>)
}
