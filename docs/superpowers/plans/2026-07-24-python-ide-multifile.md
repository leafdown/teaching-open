# Python IDE 多文件+资源获取 集成计划

**Goal:** 将新的 Python IDE（Monaco + Pyodide）集成到平台，支持多文件打开/保存/提交，并能获取 Scratch 素材库中的图像和声音资源。

**Architecture:** 
- `editor.js` 是多文件架构核心，所有文件以 `{name: content}` 字典存储
- 保存时 JSON.stringify 整个字典上传到七牛云（单个文本文件）
- 加载时 fetch → JSON.parse → 恢复多文件
- 资源获取通过 `getScratchAssets` API 实现

**Tech Stack:** Monaco Editor 0.44, Pyodide 0.29, Qiniu Cloud Storage, raw JS

---

## 文件结构

| 文件 | 改动 | 说明 |
|------|------|------|
| `web/public/python/js/editor.js` | **大幅修改** | 添加多文件状态、文件树UI、文件操作、资源获取面板 |
| `web/public/python/index.html` | **小幅修改** | 添加文件树DOM容器、editor-container、加载editor.js |
| `web/public/python/player.html` | **小幅修改** | 支持多文件加载 |
| `web/src/views/home/WorkDetail.vue` | **小幅修改** | player URL中传递workId而非url |

### Task 1: editor.js 多文件改造

**核心改动：**
1. 文件状态管理：`files = {}` + `currentFileName`
2. 文件树 UI：在编辑器左侧新增文件列表面板（新建/删除/重命名）
3. 打包/解包保存格式
4. 资源获取面板

### Task 2: index.html + player.html 适配

**核心改动：**
1. index.html 中添加 `#editor-container` 和 `#file-tree` 容器
2. 加载 `editor.js` 替代旧的 `script.js`
3. player.html 中添加 workId 加载支持

### Task 3: 集成与验证

**核心改动：**
1. 更新 WorkDetail.vue 中 Python 作品的跳转 URL
2. 验证保存 → 加载 → 执行的完整流程
