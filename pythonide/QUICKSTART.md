# 🚀 Online Python IDE - 快速启动指南

## ⚡ 最快启动 (30秒)

```bash
cd pythonide
python3 -m http.server 8000
```

然后访问: **http://localhost:8000**

---

## 🔧 按操作系统启动

### macOS / Linux

**使用 Python3** (推荐)
```bash
./start.sh python3
```

**使用 Python2**
```bash
./start.sh python
```

### Windows

**使用 PowerShell** (推荐)
```powershell
python -m http.server 8000
```

**或者**
```powershell
python3 -m http.server 8000
```

---

## 🐳 使用 Docker (最佳)

```bash
./start.sh docker
```

然后访问: **http://localhost:8080**

---

## 🧪 验证 IDE 工作正常

IDE 启动后应该看到:

1. **浏览器显示**
   - 深色主题编辑器
   - 左侧代码编辑区
   - 右侧输出区

2. **浏览器控制台** (按 F12 查看)
   ```
   ✅ Monaco Editor 初始化成功
   ✅ Python 环境加载成功
   ✅ 应用初始化完成
   ```

3. **输出区显示**
   ```
   ✅ 欢迎使用 Online Python IDE!
   💡 提示: Ctrl+Enter 快速执行代码
   ```

---

## 🎯 快速测试

在编辑区输入以下代码:

```python
print("Hello, Python IDE!")
numbers = [1, 2, 3, 4, 5]
print(f"Sum: {sum(numbers)}")
```

点击 **Run** 按钮或按 **Ctrl+Enter**

应该看到输出:
```
▶️ 执行代码...
Hello, Python IDE!
Sum: 15
✅ 执行完成 (0.123s)
```

---

## 🆘 常见问题

### 问题1: 页面加载很慢

**原因**: Pyodide (~40MB) 首次加载需要时间

**解决方案**:
- 等待几秒钟
- 清除浏览器缓存
- 检查网络连接

### 问题2: 控制台出现 CORB 错误

**已修复** ✅

- Monaco Editor CSS 现在通过 JavaScript 动态加载
- 所有跨域资源都来自可信 CDN

### 问题3: 编辑器显示为空白

**解决方案**:
1. 按 F5 刷新页面
2. 清除浏览器缓存: `Ctrl+Shift+Delete` (Win) 或 `Cmd+Shift+Delete` (Mac)
3. 尝试其他浏览器

### 问题4: 代码无法执行

**检查项**:
1. 代码是否有 Python 语法错误?
2. 是否超过 30 秒? (超时)
3. 检查浏览器控制台的错误信息

---

## 💡 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Enter` | 执行代码 |
| `Ctrl+S` | 自动保存到本地存储 |
| `Ctrl+A` | 全选 |
| `Ctrl+Z` | 撤销 |
| `Ctrl+Y` | 重做 |

---

## 📚 更多资源

- **完整文档**: 查看 `README.md`
- **特色功能**: 查看 `QUICKREF.md`
- **部署指南**: 查看 `DEPLOYMENT.md`
- **开发文档**: 查看 `PROJECT_DOCUMENTATION.md`
- **修复日志**: 查看 `BUGFIX.md`

---

## ✅ 完整功能清单

- ✅ 在线 Python 编程环境
- ✅ 实时代码执行
- ✅ 代码自动保存
- ✅ 代码分享 (URL 编码)
- ✅ 代码导出 (.py 文件)
- ✅ 黑暗模式
- ✅ 响应式设计
- ✅ 离线支持
- ✅ 零后端依赖

---

## 🎓 学习资源

### Python 基础

```python
# 打印输出
print("Hello, World!")

# 变量和类型
x = 10
y = "Hello"
z = [1, 2, 3]

# 条件语句
if x > 5:
    print("x 大于 5")

# 循环
for i in range(5):
    print(i)

# 函数
def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))
```

### 高级示例

```python
# 列表推导式
squares = [x**2 for x in range(10)]
print(squares)

# 字典操作
person = {"name": "Alice", "age": 30}
print(person["name"])

# 字符串处理
text = "Python is awesome!"
print(text.upper())
print(text.split())

# 处理异常
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

---

## 🌐 浏览器兼容性

| 浏览器 | 支持 |
|--------|------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| IE 11 | ❌ |

---

## 📞 需要帮助?

1. 查看浏览器控制台 (F12) 的错误信息
2. 尝试使用其他浏览器
3. 清除缓存并刷新页面
4. 重启服务器

---

**祝你使用 Online Python IDE 愉快! 🐍✨**
