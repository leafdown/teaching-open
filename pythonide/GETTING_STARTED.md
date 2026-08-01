# 🚀 Online Python IDE - 完整启动指南

欢迎使用 Online Python IDE！这是一个功能完整的在线 Python 编程环境。

## ⚡ 5 分钟快速开始

### 方式 1：使用 Python（最简单）✨

```bash
cd pythonide
python3 -m http.server 8000
```

然后在浏览器中打开：**http://localhost:8000**

> **💡 提示**: 这是最快的启动方式，Python 3 已默认在大多数系统中安装。

### 方式 2：使用提供的脚本

```bash
cd pythonide
chmod +x start.sh          # 只需执行一次
./start.sh python3         # 或 ./start.sh node 或 ./start.sh docker
```

### 方式 3：使用 Docker（最推荐用于生产）

```bash
cd pythonide
docker-compose up -d
```

然后访问：**http://localhost:8080**

---

## 📋 详细启动指南

### 准备工作

#### 系统要求
- ✅ 现代 Web 浏览器（Chrome, Firefox, Safari, Edge）
- ✅ 互联网连接（首次加载 Pyodide）
- ✅ Python 3.6+ 或 Docker 或 Node.js（可选，用于服务器）

#### 文件检查

启动前，确保以下文件存在：

```bash
ls -la pythonide/
```

应该看到：
```
✓ index.html           # 主页面
✓ app.js              # 应用逻辑
✓ advanced.js         # 高级功能
✓ favicon.svg         # 图标
✓ *.md                # 文档
✓ package.json        # npm 配置
✓ Dockerfile          # Docker 配置
✓ docker-compose.yml  # Docker Compose
✓ start.sh            # 启动脚本
```

---

## 🌐 不同系统的启动方式

### macOS

#### 使用 Python
```bash
cd pythonide
python3 -m http.server 8000
# 然后打开 http://localhost:8000
```

#### 使用 Homebrew 安装的工具
```bash
# 安装 http-server
brew install node
npm install -g http-server

# 启动
http-server pythonide -p 8000
```

#### 使用 Docker Desktop
```bash
# 确保 Docker Desktop 已启动
docker-compose -f pythonide/docker-compose.yml up -d

# 访问 http://localhost:8080
```

### Windows

#### 使用 Python
```powershell
cd pythonide
python -m http.server 8000
```

#### 使用 PowerShell
```powershell
# 使用 Python 3
py -3 -m http.server 8000

# 然后访问 http://localhost:8000
```

#### 使用 Docker Desktop for Windows
```powershell
cd pythonide
docker-compose up -d

# 访问 http://localhost:8080
```

### Linux

#### 使用 Python
```bash
cd pythonide
python3 -m http.server 8000
```

#### 使用 Node.js
```bash
# 安装 http-server
sudo npm install -g http-server

# 启动
http-server pythonide -p 8000
```

#### 使用 Nginx
```bash
# 安装 Nginx
sudo apt-get install nginx

# 配置（见 nginx.conf）
sudo cp pythonide/nginx.conf /etc/nginx/sites-available/python-ide
sudo ln -s /etc/nginx/sites-available/python-ide /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# 访问 http://localhost
```

---

## 🎯 第一次使用

### 步骤 1: 启动服务器
选择上面的任一种方式启动服务器。

### 步骤 2: 打开浏览器
访问给定的 URL（通常是 `http://localhost:8000`）

### 步骤 3: 编写代码

在左侧编辑器区域编写 Python 代码：

```python
print("Hello, World!")
```

### 步骤 4: 运行代码
- 点击 **Run** 按钮
- 或使用快捷键 `Ctrl+Enter` / `Cmd+Enter`

### 步骤 5: 查看结果
右侧会显示执行结果：
```
Hello, World!
```

### 步骤 6: 保存代码
- 自动保存到浏览器本地存储
- 或点击菜单中的 **Download** 下载文件

---

## 🔧 高级配置

### 自定义端口

#### Python
```bash
python3 -m http.server 3000  # 使用 3000 端口
```

#### Node.js
```bash
http-server pythonide -p 3000
```

#### Docker
编辑 `docker-compose.yml`：
```yaml
ports:
  - "9000:80"  # 改为 9000
```

### 启用 HTTPS（本地开发）

```bash
# 生成自签名证书
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# 使用 Python 的 ssl 模块
python3 -c "
import ssl, http.server, socketserver
import os
os.chdir('pythonide')

httpd = socketserver.TCPServer(('', 8000), http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, certfile='cert.pem', keyfile='key.pem', server_side=True)
print('HTTPS server running on https://localhost:8000')
httpd.serve_forever()
"
```

---

## 📚 常见问题

### Q: 如何停止服务器？
A: 按 `Ctrl+C` 停止。

### Q: 代码无法运行？
A: 
1. 检查浏览器控制台（F12）是否有错误
2. 刷新页面（Cmd+R 或 Ctrl+R）
3. 清除浏览器缓存
4. 检查代码是否有语法错误

### Q: Pyodide 加载失败？
A:
1. 确保网络连接正常
2. 尝试使用 VPN 或代理
3. 等待几秒钟让 Pyodide 初始化
4. 查看浏览器控制台了解详细错误

### Q: 代码执行超时？
A:
1. 尝试运行更简单的代码
2. 检查是否有无限循环
3. 增加 Pyodide 超时时间（见 app.js）

### Q: 本地存储空间不足？
A:
- 清除已保存的代码
- 下载重要代码到本地
- 清除浏览器数据

### Q: Docker 容器无法启动？
A:
```bash
# 检查日志
docker-compose logs

# 清理容器
docker-compose down --remove-orphans

# 重新构建
docker-compose build --no-cache
docker-compose up -d
```

---

## 💡 使用技巧

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + Enter` | 运行代码 |
| `Ctrl/Cmd + S` | 保存 |
| `Ctrl/Cmd + Z` | 撤销 |
| `Ctrl/Cmd + Y` | 重做 |
| `Ctrl/Cmd + /` | 注释行 |
| `Ctrl/Cmd + F` | 查找 |
| `Ctrl/Cmd + H` | 查找替换 |

### 代码片段

#### 最小示例
```python
print("Hello, Python!")
```

#### 计算
```python
x = 10
y = 20
print(f"Sum: {x + y}")
```

#### 列表处理
```python
numbers = [1, 2, 3, 4, 5]
print([x ** 2 for x in numbers])
```

#### 函数定义
```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

---

## 🌍 分享代码

### 生成分享链接

1. 编写代码
2. 点击 **Share** 按钮
3. 复制生成的链接
4. 分享给他人

接收者打开链接时，你的代码会自动加载！

---

## 📁 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 主页面和样式 |
| `app.js` | 核心应用逻辑 |
| `advanced.js` | 高级功能（可选） |
| `README.md` | 功能说明 |
| `DEPLOYMENT.md` | 部署指南 |
| `QUICKREF.md` | 快速参考 |
| `PROJECT_DOCUMENTATION.md` | 项目文档 |

---

## 🚀 下一步

### 学习 Python
- 访问 [Python 官方教程](https://docs.python.org/3/tutorial/)
- 查看 QUICKREF.md 中的代码示例

### 尝试高级功能
- 上传本地 Python 文件
- 使用代码分享功能
- 下载编写的代码

### 生产部署
- 查看 DEPLOYMENT.md
- 使用 Docker 部署到云平台
- 配置 SSL 和域名

### 扩展开发
- 修改 CSS 自定义主题
- 集成额外的 Python 库
- 添加新功能

---

## 📞 获取帮助

### 资源
- 📖 [Mozilla Web 文档](https://developer.mozilla.org/)
- 🐍 [Python 官方文档](https://www.python.org/doc/)
- 🏗️ [Monaco Editor 文档](https://microsoft.github.io/monaco-editor/)
- 🔗 [Pyodide 文档](https://pyodide.org/)

### 故障排查
1. 检查浏览器控制台错误
2. 查看 DEPLOYMENT.md 中的故障排查章节
3. 尝试清除缓存和重新加载
4. 在 GitHub 上提交 Issue

---

## ✅ 检查清单

启动前：
- [ ] Python 3 或 Node.js 或 Docker 已安装
- [ ] 网络连接正常
- [ ] 所需文件都已存在
- [ ] 端口未被占用

启动后：
- [ ] 浏览器可以访问 IDE
- [ ] 编辑器可以输入代码
- [ ] 可以成功运行代码
- [ ] 代码可以保存

---

## 🎉 完成！

你现在已经准备好使用 Online Python IDE 了！

**开始编写代码吧！** 🐍✨

---

**有问题？** 查看 README.md 或 DEPLOYMENT.md 获取更多信息。

**需要帮助？** 提交 GitHub Issue 或联系我们。

祝编程愉快！🚀
