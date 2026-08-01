# Online Python IDE

一个现代化的在线 Python 编程环境，提供完整的编辑、运行和分享功能。

![Language](https://img.shields.io/badge/language-Python%20%7C%20JavaScript-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 功能特性

### 🎯 核心功能
- **代码编辑**: 使用 Monaco Editor（VS Code 编辑器）
- **Python 执行**: 基于 Pyodide 的客户端 Python 运行环境，无需后端服务
- **实时输出**: 代码执行结果实时显示
- **代码保存**: 自动保存到本地存储（LocalStorage）
- **代码下载**: 支持 .py 文件下载
- **文件上传**: 支持上传本地 Python 文件
- **代码分享**: 生成可分享的链接，包含完整代码
- **代码格式化**: 基本的 Python 代码验证

### 🎨 用户界面
- **现代化设计**: Dark Theme（深色主题）
- **响应式布局**: 支持桌面和平板显示
- **编辑器快捷键**:
  - `Ctrl+Enter` / `Cmd+Enter`: 运行代码
  - `Ctrl+S` / `Cmd+S`: 保存代码
- **状态栏**: 显示光标位置、字符数、执行时间

### 🚀 性能优化
- **客户端执行**: 无需服务器，加载快速
- **自动保存**: 自动保存代码到浏览器本地存储
- **执行时间显示**: 显示代码执行耗时

## 🛠 技术栈

### 前端技术
- **Monaco Editor** (`v0.44.0`): 代码编辑器，支持语法高亮、自动完成
- **Pyodide** (`v0.23.4`): 在浏览器中运行 Python，基于 WebAssembly
- **HTML5 + CSS3 + JavaScript (ES6+)**

### 核心依赖
- Monaco Editor CDN
- Pyodide CDN
- Font Awesome 6.4.0（图标库）

## 📦 项目结构

```
pythonide/
├── index.html          # 主 HTML 文件，包含 UI 结构和样式
├── app.js              # 应用逻辑，包括编辑器初始化和代码执行
├── favicon.svg         # 网站图标
└── README.md           # 项目说明文档
```

## 🚀 快速开始

### 在线访问
直接在浏览器中打开 `index.html` 文件即可使用。

### 本地使用
由于 Pyodide 需要 WASM 支持，建议使用 HTTP 服务器运行：

```bash
# 使用 Python 内置服务器
cd pythonide
python3 -m http.server 8000

# 然后访问 http://localhost:8000
```

或使用其他 HTTP 服务器（如 `http-server`、`live-server` 等）。

## 💻 使用指南

### 编写代码
1. 在编辑器区域编写 Python 代码
2. 支持所有标准 Python 语法和常用库

### 运行代码
- 点击 **Run** 按钮
- 或使用快捷键 `Ctrl+Enter` / `Cmd+Enter`

### 查看输出
- 代码执行结果显示在右侧 **Output** 区域
- 支持彩色输出（成功、错误、警告等）
- 显示执行时间

### 保存和下载
- **自动保存**: 代码自动保存到浏览器本地存储
- **下载**: 点击菜单中的 **Download** 下载 .py 文件
- **上传**: 点击菜单中的 **Upload** 选择本地 .py 文件

### 分享代码
1. 点击 **Share** 按钮
2. 复制生成的分享链接
3. 将链接分享给他人，他们可以看到你的代码

### 代码格式化
点击菜单中的 **Format** 验证代码是否符合 Python 语法。

## 📝 Python 环境说明

### 支持的库
由于使用 Pyodide，支持的库包括：
- 标准库（大部分模块）
- NumPy
- Pandas
- Matplotlib（部分功能）
- 其他 WASM 兼容的 Python 包

### 不支持的功能
- 网络请求（requests 库）
- 文件系统操作（只有虚拟文件系统）
- 某些系统级别的功能

## 🎓 示例代码

### 基础打印
```python
print("Hello, World!")
```

### 列表操作
```python
numbers = [1, 2, 3, 4, 5]
print(f"Numbers: {numbers}")
print(f"Sum: {sum(numbers)}")
print(f"Average: {sum(numbers)/len(numbers)}")
```

### 函数定义
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

### 数据处理
```python
# 字典操作
person = {"name": "Alice", "age": 30, "city": "Beijing"}
for key, value in person.items():
    print(f"{key}: {value}")
```

## 🔧 配置选项

可以在 `app.js` 中修改编辑器配置：

```javascript
editor = monaco.editor.create(document.getElementById('editor'), {
    value: getDefaultCode(),
    language: 'python',
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 4,
    // ... 更多选项
});
```

## 🌐 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 其他支持 WebAssembly 的现代浏览器

## 📄 License

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 反馈

如有问题或建议，请提交 Issue。

---

**开发日期**: 2024
**版本**: 1.0.0
