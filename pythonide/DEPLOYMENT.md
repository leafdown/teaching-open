# Online Python IDE - 部署和开发指南

## 📋 目录

1. [快速启动](#快速启动)
2. [本地开发](#本地开发)
3. [Docker 部署](#docker-部署)
4. [生产环境部署](#生产环境部署)
5. [性能优化](#性能优化)
6. [故障排查](#故障排查)
7. [扩展开发](#扩展开发)

---

## 🚀 快速启动

### 最简单的方式：直接打开文件

```bash
# 方法 1: 使用浏览器直接打开
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### 使用 HTTP 服务器（推荐）

```bash
# Python 3
cd pythonide
python3 -m http.server 8000

# 然后访问 http://localhost:8000
```

或使用其他工具：

```bash
# Node.js http-server
npm install -g http-server
http-server pythonide -p 8000

# npm live-server
npm install -g live-server
live-server pythonide --port=8000

# 使用 PHP
cd pythonide
php -S localhost:8000
```

---

## 🛠 本地开发

### 项目结构

```
pythonide/
├── index.html              # 主页面（UI 结构 + 样式）
├── app.js                  # 核心应用逻辑
├── advanced.js             # 高级功能（可选）
├── favicon.svg             # 网站图标
├── README.md               # 项目文档
├── DEPLOYMENT.md           # 部署指南（本文件）
├── Dockerfile              # Docker 配置
├── docker-compose.yml      # Docker Compose 配置
└── nginx.conf              # Nginx 配置
```

### 编辑器快捷键开发

编辑 `app.js` 中的 `setupEventListeners()` 函数来添加新的快捷键：

```javascript
// 例如: 添加 Ctrl+L 快速清除输出
if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
    e.preventDefault();
    clearOutput();
}
```

### 添加新的主题

修改 `advanced.js` 中的 `themes` 对象：

```javascript
const themes = {
    dark: 'vs-dark',
    light: 'vs',
    hc: 'hc-black',
    draculaTheme: 'vs-dark'  // 添加新主题
};
```

---

## 🐳 Docker 部署

### 前置条件

- Docker Desktop（或 Docker + Docker Compose）
- 最低 2GB 内存

### 使用 Docker Compose（推荐）

```bash
cd pythonide

# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止容器
docker-compose down
```

访问 `http://localhost:8080`

### 使用 Docker CLI

```bash
# 构建镜像
docker build -t python-ide:latest .

# 运行容器
docker run -d \
  --name python-ide \
  -p 8080:80 \
  python-ide:latest

# 查看容器状态
docker ps

# 停止容器
docker stop python-ide
docker rm python-ide
```

### Docker 构建优化

```dockerfile
# 使用多阶段构建减小镜像大小
FROM node:18-alpine as builder
# ... 构建步骤

FROM nginx:alpine
COPY --from=builder /app /usr/share/nginx/html
```

---

## 🌐 生产环境部署

### 选项 1: 云平台部署

#### AWS S3 + CloudFront

```bash
# 上传到 S3
aws s3 sync . s3://my-python-ide --delete

# 配置 CloudFront 分发
# - Origin: S3 bucket URL
# - Behavior: 缓存策略配置
```

#### Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel

# 设置重定向规则（vercel.json）
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod --dir=pythonide
```

### 选项 2: 自建服务器

#### Nginx 配置

```bash
# 1. 复制文件到服务器
scp -r pythonide/ user@server:/var/www/

# 2. 配置 Nginx
sudo nano /etc/nginx/sites-available/python-ide

# 3. 启用配置
sudo ln -s /etc/nginx/sites-available/python-ide /etc/nginx/sites-enabled/

# 4. 测试和重启
sudo nginx -t
sudo systemctl restart nginx
```

#### 完整 Nginx 配置

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name python-ide.example.com;

    # SSL 配置（使用 Let's Encrypt）
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    ssl_certificate /etc/letsencrypt/live/python-ide.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/python-ide.example.com/privkey.pem;
    
    # 安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    root /var/www/pythonide;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript;
    gzip_min_length 1000;
    gzip_level 6;

    # 缓存策略
    location ~* \.(js|css|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 重定向 HTTP 到 HTTPS
    if ($scheme != "https") {
        return 301 https://$server_name$request_uri;
    }
}
```

#### Apache 配置

```apache
<VirtualHost *:443>
    ServerName python-ide.example.com
    DocumentRoot /var/www/pythonide

    # SSL 配置
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/python-ide.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/python-ide.example.com/privkey.pem

    # 启用 mod_rewrite
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>

    # 缓存头
    <FilesMatch "\.(js|css|svg|ico)$">
        Header set Cache-Control "public, max-age=31536000"
    </FilesMatch>

    <FilesMatch "\.html$">
        Header set Cache-Control "no-cache, no-store, must-revalidate"
    </FilesMatch>
</VirtualHost>

# HTTP 重定向到 HTTPS
<VirtualHost *:80>
    ServerName python-ide.example.com
    Redirect permanent / https://python-ide.example.com/
</VirtualHost>
```

### 选项 3: Kubernetes 部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python-ide
spec:
  replicas: 3
  selector:
    matchLabels:
      app: python-ide
  template:
    metadata:
      labels:
        app: python-ide
    spec:
      containers:
      - name: python-ide
        image: python-ide:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: python-ide-service
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
  selector:
    app: python-ide
```

---

## ⚡ 性能优化

### 前端优化

1. **资源压缩**
   ```bash
   # 使用 gzip 压缩
   gzip -9 index.html
   gzip -9 app.js
   gzip -9 advanced.js
   ```

2. **代码分割**
   - 在需要时加载 advanced.js
   - 异步加载 Pyodide

3. **缓存策略**
   ```javascript
   // 在 app.js 中添加
   if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('sw.js');
   }
   ```

4. **CDN 使用**
   - 使用 CDN 加速外部资源
   - 考虑 jsDelivr 或 CDNJS

### 后端优化

1. **启用 HTTP/2**
   - 服务器支持 HTTP/2 推送

2. **启用 Brotli 压缩**
   ```nginx
   brotli on;
   brotli_types text/plain text/css text/javascript application/javascript;
   ```

3. **缓存静态资源**
   - 使用 E-Tags
   - 配置合适的 Cache-Control

### 监控

1. **性能指标收集**
   ```javascript
   // 添加到 app.js
   window.addEventListener('load', () => {
       const perfData = window.performance.timing;
       const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
       console.log('Page load time: ' + pageLoadTime);
   });
   ```

2. **错误跟踪**
   ```javascript
   window.addEventListener('error', (e) => {
       console.error('Global error:', e);
       // 发送到错误跟踪服务
   });
   ```

---

## 🔧 故障排查

### Pyodide 加载失败

**症状**: "Python environment is not ready yet"

**解决方案**:
1. 检查浏览器控制台 Console 标签页
2. 确保网络连接正常
3. 尝试更新 Pyodide 版本
4. 清除浏览器缓存

### 代码执行超时

**症状**: 代码长时间运行无反应

**解决方案**:
```javascript
// 添加执行超时控制（app.js）
const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Execution timeout')), 5000)
);

Promise.race([codePromise, timeoutPromise]);
```

### 内存溢出

**症状**: 浏览器标签页崩溃

**解决方案**:
1. 增加 Pyodide 堆内存大小
2. 优化代码减少内存使用
3. 使用 Web Worker 隔离执行

### 本地存储满了

**症状**: localStorage 错误

**解决方案**:
```javascript
// app.js 中添加
try {
    localStorage.setItem(key, value);
} catch(e) {
    if(e.name == 'QuotaExceededError') {
        // 清理旧数据
        localStorage.clear();
    }
}
```

---

## 🎨 扩展开发

### 添加新语言支持

```javascript
// 编辑 app.js，修改 Monaco Editor 配置
editor = monaco.editor.create(document.getElementById('editor'), {
    language: 'python', // 改为其他语言
    // ...
});

// 支持的语言: javascript, typescript, java, c, cpp, csharp, etc.
```

### 添加代码主题

```javascript
// advanced.js
const themes = {
    // 默认主题
    dark: 'vs-dark',
    light: 'vs',
    hc: 'hc-black',
    // 添加自定义主题
    custom: 'hc-light'
};
```

### 集成外部 API

```javascript
// 例如集成 GitHub Gist 保存
async function saveToGist(code) {
    const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` },
        body: JSON.stringify({
            files: { 'code.py': { content: code } }
        })
    });
    return response.json();
}
```

### 添加实时协作

```javascript
// 使用 WebSocket 或 WebRTC 实现
// 库推荐: Yjs, Automerge, CRDT
```

### 集成 AI 代码补全

```javascript
// 集成 GitHub Copilot API 或其他 AI 服务
// 需要 API 密钥和后端服务
```

---

## 📊 监控和分析

### 添加页面分析

```javascript
// 添加到 index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

### 添加错误跟踪

```javascript
// 使用 Sentry
import * as Sentry from "@sentry/browser";

Sentry.init({
    dsn: "YOUR_SENTRY_DSN",
    environment: "production"
});
```

---

## 📞 获取帮助

- 查看 README.md 了解功能
- 检查浏览器开发者工具 Console
- 查看网络标签页检查资源加载
- 提交 Issue 或 PR

---

**最后更新**: 2024
**维护者**: 蓝趣教育
