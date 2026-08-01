// 富文本编辑器(基于 wangeditor v5),受控组件 value/onChange,可直接用于 antd Form.Item
// 图片/视频上传对齐旧 JEditor.vue:local 走 /sys/common/upload,qiniu 直传,其余降级 base64
import '@wangeditor/editor/dist/css/style.css'
import { useEffect, useMemo, useState } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { useConfig } from '@/stores/config.store'
import { uploadJeditor, uploadQiniu } from '@/api/common.api'
import { message } from 'antd'

interface Props {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  height?: number
  readOnly?: boolean
}

// 生成简单唯一文件名(wangeditor customUpload 不提供,对齐旧 uuidGenerator 用途)
function uuidName(file: File): string {
  const ext = file.name.match(/\.[^.]+$/)?.[0] || ''
  return 'jeditor-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10) + ext
}

export default function RichEditor({ value, onChange, placeholder = '请输入内容...', height = 300, readOnly = false }: Props) {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const uploadType = useConfig((s) => s.sysConfig?.uploadType) || 'local'

  // 上传:按 sysConfig.uploadType 分发,失败报错
  const uploadFn = async (file: File): Promise<string> => {
    try {
      if (uploadType === 'qiniu') {
        return await uploadQiniu(file, uuidName(file))
      }
      // local / 其他 -> 走后端 /sys/common/upload
      return await uploadJeditor(file)
    } catch (e) {
      message.error('上传失败: ' + String(e))
      throw e
    }
  }

  const editorConfig = useMemo<Partial<IEditorConfig>>(() => ({
    placeholder,
    readOnly,
    MENU_CONF: {
      uploadImage: {
        async customUpload(file: File, insertFn: (url: string, alt?: string, href?: string) => void) {
          const url = await uploadFn(file)
          insertFn(url, file.name, url)
        },
      },
      uploadVideo: {
        async customUpload(file: File, insertFn: (url: string, poster?: string) => void) {
          const url = await uploadFn(file)
          insertFn(url, '')
        },
      },
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [uploadType, placeholder, readOnly])

  const toolbarConfig = useMemo<Partial<IToolbarConfig>>(() => ({}), [])

  // 及时销毁 editor,避免重复创建/内存泄漏
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div style={{ border: '1px solid #d9d9d9', zIndex: 100, borderRadius: 6, overflow: 'hidden' }}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #d9d9d9' }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={value || ''}
        onCreated={setEditor}
        onChange={(ed) => onChange?.(ed.getHtml())}
        mode="default"
        style={{ height, overflowY: 'hidden' }}
      />
    </div>
  )
}
