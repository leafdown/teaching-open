# Online Python IDE - 完整项目文档

## 📖 项目概览

**Online Python IDE** 是一个功能完整的在线 Python 编程环境，允许用户在浏览器中编写、运行和分享 Python 代码。项目采用现代 Web 技术，提供类似 pythononline.io 的功能体验。

### 核心特性
- ✅ 实时代码编辑（Monaco Editor）
- ✅ 客户端代码执行（Pyodide）
- ✅ 自动保存和本地存储
- ✅ 代码分享功能
- ✅ 响应式界面设计
- ✅ 无需后端服务

---

## 📁 项目结构详解

```
pythonide/
│
├── 📄 index.html                 # 主页面 (HTML + CSS)
│   ├── 编辑器容器
│   ├── 输出显示区域
│   ├── 顶部工具栏
│   └── 底部状态栏
│
├── 📜 app.js                     # 核心应用逻辑
│   ├── Monaco Editor 初始化
│   ├── Pyodide Python 环境初始化
│   ├── 事件处理器设置
│   ├── 代码执行逻辑
│   ├── 文件管理功能
│   ├── 代码分享功能
│   └── 本地存储管理
│
├── 📜 advanced.js                # 高级功能模块（可选）
│   ├── 主题管理
│   ├── 字体大小调整
│   ├── 代码验证
│   ├── 代码统计
│   ├── 导出功能
│   └── 快捷键辅助
│
├── 🎨 favicon.svg                # 网站图标
│
├── 📝 README.md                  # 项目说明
│   ├── 功能特性
│   ├── 技术栈
│   ├── 使用指南
│   └── 示例代码
│
├── 🚀 DEPLOYMENT.md              # 部署指南
│   ├── 本地开发
│   ├── Docker 部署
│   ├── 生产环境配置
│   ├── 性能优化
│   └── 故障排查
│
├── 📚 QUICKREF.md                # 快速参考
│   ├── 快捷键列表
│   ├── 代码示例
│   ├── 常见错误
│   └── 学习资源
│
├── 📦 package.json               # npm 配置
│   ├── 依赖管理
│   ├── npm 脚本
│   └── 项目元数据
│
├── 🐳 Dockerfile                 # Docker 配置
│   └── 容器化部署
│
├── 🐳 docker-compose.yml         # Docker Compose
│   └── 本地容器编排
│
├── 📋 nginx.conf                 # Nginx 配置
│   ├── 缓存策略
│   ├── 压缩设置
│   └── 安全头
│
└── 📝 .gitignore                 # Git 忽略规则
```

---

## 🔧 技术栈详解

### 前端框架和库

| 技术 | 版本 | 用途 |
|------|------|------|
| **Monaco Editor** | v0.44.0 | 代码编辑器，支持语法高亮、自动完成 |
| **Pyodide** | v0.23.4 | 在浏览器中运行 Python（WebAssembly） |
| **Font Awesome** | 6.4.0 | 图标库 |
| **HTML5** | ES6 | 页面结构 |
| **CSS3** | - | 样式设计 |
| **JavaScript** | ES6+ | 应用逻辑 |

### 其他技术

| 组件 | 用途 |
|------|------|
| **Nginx** | Web 服务器和反向代理 |
| **Docker** | 容器化部署 |
| **LocalStorage API** | 本地数据存储 |
| **URL API** | 代码分享链接生成 |

---

## 🎯 核心功能模块

### 1. 编辑器模块 (`app.js`)

**功能**:
- 初始化 Monaco Editor
- 支持 Python 语法高亮
- 实时更新状态栏
- 快捷键支持

**关键函数**:
```javascript
editor = monaco.editor.create()      // 创建编辑器
editor.getValue()                    // 获取代码
editor.setValue()                    // 设置代码
editor.onDidChangeModelContent()     // 监听变化
```

### 2. Python 执行模块 (`app.js`)

**功能**:
- Pyodide 初始化
- 代码解析和执行
- 输出捕获和显示
- 错误处理

**关键函数**:
```javascript
initPyodide()                        // 初始化 Python 环境
runCode()                            // 执行用户代码
addOutput()                          // 显示输出
```

### 3. 文件管理模块 (`app.js`)

**功能**:
- 创建新文件
- 上传本地文件
- 下载代码文件
- 文件名管理

**关键函数**:
```javascript
newFile()                            // 新建文件
uploadFile()                         // 上传文件
downloadFile()                       // 下载文件
```

### 4. 代码分享模块 (`app.js`)

**功能**:
- 生成分享链接
- Base64 编码代码
- 从 URL 加载代码

**关键函数**:
```javascript
shareCode()                          // 生成分享链接
copyShareLink()                      // 复制链接到剪贴板
loadFromLocalStorage()               // 从 URL 加载代码
```

### 5. 本地存储模块 (`app.js`)

**功能**:
- 自动保存代码
- 恢复之前的代码
- 存储用户设置

**关键函数**:
```javascript
saveToLocalStorage()                 // 保存到本地
loadFromLocalStorage()               // 从本地加载
```

### 6. 高级功能模块 (`advanced.js`)

**功能**:
- 主题切换
- 字体大小调整
- 代码验证
- 代码导出

**关键函数**:
```javascript
applyTheme()                         // 切换主题
applyFontSize()                      // 调整字体
validateCode()                       // 验证代码
exportAs()                           // 导出代码
```

---

## 📊 数据流

```
用户输入代码
    ↓
[ Monaco Editor ]
    ↓
监听 onChange 事件
    ↓
自动保存到 LocalStorage
    ↓
用户点击 Run
    ↓
[ 代码执行引擎 ]
    ↓
Pyodide 执行 Python 代码
    ↓
捕获 stdout/stderr
    ↓
[ 输出显示 ]
    ↓
处理结果显示在输出区域
    ↓
显示执行时间和状态
```

---

## 🌐 API 和集成

### 本地 API 使用

```javascript
// LocalStorage
localStorage.setItem(key, value)
localStorage.getItem(key)
localStorage.removeItem(key)
localStorage.clear()

// URL API
new URLSearchParams(window.location.search)

// Performance API
performance.now()

// Clipboard API
navigator.clipboard.writeText(text)
```

### 外部库 API

```javascript
// Monaco Editor
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(...)
})

// Pyodide
pyodide = await loadPyodide()
await pyodide.runPythonAsync(code)
```

---

## 🔐 安全性考虑

### 已实现的安全措施

1. **XSS 防护**
   - HTML 内容转义
   - 使用 textContent 而不是 innerHTML

2. **代码执行隔离**
   - Pyodide 在 WebAssembly 沙箱中运行
   - 无法访问主机文件系统

3. **URL 安全**
   - 代码通过 Base64 编码
   - URL 长度限制

### 建议的额外安全措施

```javascript
// 1. 内容安全策略 (CSP)
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' cdn.jsdelivr.net">

// 2. 输入验证
function validateCode(code) {
    if (code.length > 1000000) {
        throw new Error("Code too large");
    }
}

// 3. 执行超时控制
const timeout = 5000; // 5 seconds
```

---

## 📈 性能指标

### 目标指标

| 指标 | 目标 | 状态 |
|------|------|------|
| 首屏加载时间 | < 3s | ✅ |
| 代码执行响应 | < 1s | ✅ |
| 内存占用 | < 100MB | ✅ |
| 支持代码大小 | > 1MB | ✅ |

### 优化建议

1. **资源优化**
   - 懒加载 advanced.js
   - 使用 CDN 加速资源

2. **代码优化**
   - 代码分割
   - Tree shaking

3. **缓存优化**
   - 长期缓存静态资源
   - Service Worker 离线支持

---

## 🧪 测试建议

### 单元测试

```javascript
// 测试 app.js 中的函数
describe('IDE Functions', () => {
    test('getDefaultCode should return valid Python', () => {
        const code = getDefaultCode();
        expect(code).toContain('print');
    });
});
```

### 集成测试

```javascript
// 测试完整工作流
describe('Code Execution', () => {
    test('should execute code and show output', async () => {
        // ...
    });
});
```

### 性能测试

```javascript
// 性能基准
performance.mark('execution-start');
await runCode();
performance.mark('execution-end');
performance.measure('execution', 'execution-start', 'execution-end');
```

---

## 🚀 扩展和定制

### 添加新功能

#### 1. 添加代码片段库
```javascript
const snippets = {
    hello: 'print("Hello, World!")',
    fibonacci: 'def fib(n): ...'
};

// 在编辑器中添加
editor.setPosition({ lineNumber: 1, column: 1 });
editor.executeEdits('', [{
    range: new monaco.Range(1, 1, 1, 1),
    text: snippets.hello
}]);
```

#### 2. 添加协作编辑
```javascript
// 使用 Yjs 实现实时协作
import * as Y from 'yjs';

const ydoc = new Y.Doc();
const ytext = ydoc.getText('shared-text');
// 连接到 WebSocket 提供者
```

#### 3. 添加 AI 代码完成
```javascript
// 集成 Copilot 或其他 AI 服务
monaco.languages.registerCompletionItemProvider('python', {
    provideCompletionItems: async (model, position) => {
        // 调用 AI API
    }
});
```

### 自定义主题

```javascript
// 在 advanced.js 中添加
monaco.editor.defineTheme('myTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'comment', foreground: '6A9955' },
        // ...
    ],
    colors: {
        'editor.background': '#1e1e1e'
    }
});
```

---

## 📞 常见问题 (FAQ)

### Q: 如何支持更多 Python 库？
A: Pyodide 支持许多纯 Python 库。可以通过 `micropip` 安装：
```python
import micropip
await micropip.install('numpy')
```

### Q: 如何增加执行超时时间？
A: 在 `app.js` 中修改：
```javascript
const executionTimeout = 10000; // 10 seconds
```

### Q: 可以离线使用吗？
A: 可以通过 Service Worker 实现离线支持。

### Q: 如何保证数据隐私？
A: 所有代码在本地执行，不发送到服务器。

### Q: 支持哪些浏览器？
A: 需要 WebAssembly 支持，现代浏览器都支持。

---

## 📚 相关资源

### 官方文档
- [Monaco Editor 文档](https://microsoft.github.io/monaco-editor/)
- [Pyodide 文档](https://pyodide.org/)
- [Python 官方文档](https://docs.python.org/)

### 开源项目参考
- [Replit](https://replit.com/)
- [Colab](https://colab.research.google.com/)
- [JupyterHub](https://jupyter.org/)

### 学习资源
- [Web API 文档](https://developer.mozilla.org/en-US/docs/Web/API)
- [JavaScript 高级特性](https://www.typescriptlang.org/docs/)

---

## 📝 版本历史

### v1.0.0 (2024-11-24)
- ✅ 初始版本发布
- ✅ 基础编辑和执行功能
- ✅ 代码分享和下载
- ✅ 本地存储支持
- ✅ 响应式设计

### 计划的功能
- [ ] 多文件支持
- [ ] 项目管理
- [ ] 代码版本控制
- [ ] 实时协作编辑
- [ ] 在线代码分享平台
- [ ] AI 代码补全
- [ ] 调试器支持

---

## 👥 贡献指南

### 如何贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范

- 遵循 ESLint 规则
- 添加注释和文档
- 提交前测试功能
- 更新相关文档

---

## 📄 License

MIT License - 详见 LICENSE 文件

---

## 📞 联系方式

- **项目主页**: https://github.com/open-scratch/teaching-open
- **问题反馈**: GitHub Issues
- **邮箱**: support@lanqu.com

---

**维护者**: 蓝趣教育团队
**最后更新**: 2024-11-24
**版本**: 1.0.0
