# 🔧 Pyodide 加载失败 - 故障排查指南

**问题**: IDE 显示 "❌ Pyodide 加载失败 - 请检查网络连接"

---

## ✅ 快速检查清单

### 1. 网络连接
- [ ] 确认网络连接正常
- [ ] 尝试访问其他网站
- [ ] 检查是否使用代理/VPN

### 2. 浏览器设置
- [ ] 禁用广告拦截器
- [ ] 禁用跟踪保护
- [ ] 确保 JavaScript 已启用
- [ ] 清除浏览器缓存

### 3. CDN 访问
- [ ] 运行 `python3 test_cdn.py` 检查 CDN
- [ ] 如果 CDN 不可用，尝试使用 VPN
- [ ] 检查防火墙设置

---

## 🔍 详细故障排查

### 步骤 1: 检查浏览器控制台

```bash
1. 打开浏览器
2. 按 F12 打开开发者工具
3. 点击 Console 标签
4. 查看红色错误信息
```

**常见错误**:

#### A. `TypeError: Cannot read property 'Py' of undefined`
- **原因**: Pyodide 加载失败
- **解决**: 检查网络连接和 CDN 可用性

#### B. `Failed to fetch`
- **原因**: CDN 无法访问
- **解决**: 
  - 检查网络连接
  - 尝试使用 VPN
  - 等待 CDN 恢复

#### C. `CORB blocked a cross-origin response`
- **原因**: 跨域资源被阻止
- **解决**: 
  - 清除浏览器缓存
  - 尝试隐身模式
  - 尝试其他浏览器

### 步骤 2: 测试 CDN 连接

```bash
cd pythonide
python3 test_cdn.py
```

**预期输出**:
```
✅ jsDelivr Pyodide
✅ Pyodide CDN 2
✅ jsDelivr Monaco
✅ Font Awesome
```

**如果某些 CDN 不可用**:
```bash
# 使用 curl 测试具体 URL
curl -I https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js

# 使用 wget 测试
wget --spider https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js
```

### 步骤 3: 检查浏览器网络标签

```bash
1. F12 打开开发者工具
2. 点击 Network 标签
3. 刷新页面
4. 查找 "pyodide.js" 请求
5. 检查状态码:
   - 200 = 成功
   - 404 = 文件未找到
   - 403 = 被禁止
   - 503 = 服务不可用
   - 其他 = 网络问题
```

---

## 🛠️ 解决方案

### 解决方案 1: 清除缓存并重新加载

```bash
# 方案 A: 硬刷新 (清除缓存)
Windows/Linux: Ctrl+Shift+F5
macOS: Cmd+Shift+R
```

### 解决方案 2: 使用隐身/无痕模式

```bash
# 所有浏览器都支持隐身模式:
# Chrome: Ctrl+Shift+N (Win) / Cmd+Shift+N (Mac)
# Firefox: Ctrl+Shift+P (Win) / Cmd+Shift+P (Mac)
# Safari: Cmd+Shift+N (Mac)

# 在隐身模式中打开 http://localhost:8000
```

### 解决方案 3: 禁用浏览器扩展

某些扩展可能会阻止 CDN:
- 广告拦截器 (AdBlock, uBlock Origin)
- VPN 扩展
- 隐私扩展
- 安全扩展

```bash
# 临时禁用所有扩展，然后再试
```

### 解决方案 4: 使用不同的浏览器

尝试:
- Chrome
- Firefox
- Safari
- Edge

### 解决方案 5: 检查防火墙和代理

```bash
# 测试网络连接
ping cdn.jsdelivr.net

# 测试 DNS
nslookup cdn.jsdelivr.net

# 测试路由
tracert cdn.jsdelivr.net (Windows)
traceroute cdn.jsdelivr.net (macOS/Linux)
```

### 解决方案 6: 等待并重试

某些 CDN 可能在出现高负载时返回 503 错误。

```bash
# 等待 5 分钟后重试
```

---

## 🌍 国家/地区特定问题

### 中国用户
- jsDelivr 在中国可能不稳定
- 尝试使用 VPN 连接
- 或等待 CDN 恢复

### 其他限制地区
- 某些地区的 CDN 可能被审查
- 尝试使用 VPN
- 联系网络管理员

---

## 📊 环境诊断脚本

运行完整诊断:

```bash
python3 diagnose.py
```

获取详细的系统信息:

```bash
python3 project_info.py
```

测试所有 CDN:

```bash
python3 test_cdn.py
```

---

## 📞 获取帮助

如果问题仍未解决:

1. **收集信息**:
   ```bash
   # 浏览器信息 (F12 → Console)
   console.log(navigator.userAgent)
   
   # 网络信息
   python3 test_cdn.py > /tmp/cdn_test.txt
   ```

2. **检查日志**:
   ```bash
   # 服务器日志
   tail -100 /tmp/ide_server.log
   ```

3. **尝试的步骤**:
   - 记录您尝试的所有步骤
   - 记录错误信息
   - 记录您的网络环境

---

## ✨ 其他可能的原因

### Pyodide 版本不兼容
- 解决: 更新到最新版本
- 文件: `index.html` 第 470 行

### 本地服务器问题
- 检查: `python3 -m http.server 8000` 是否运行
- 重启: `./start.sh python3`

### 浏览器过旧
- 要求: 现代浏览器 (2019+)
- 不支持: IE 11 或更旧

---

## 🎯 最后的选项

如果所有上述方案都不起作用:

1. **使用备用 IDE**:
   - https://python.org (官方)
   - https://replit.com (在线 IDE)
   - https://colab.research.google.com (Google Colab)

2. **本地开发**:
   ```bash
   # 安装 Python
   python3 --version
   
   # 创建脚本
   echo 'print("Hello")' > test.py
   
   # 运行
   python3 test.py
   ```

3. **联系开发者**:
   - 提供诊断信息
   - 提供错误截图
   - 提供浏览器信息

---

**常见问题? 查看 `QUICKSTART.md` 的故障排查部分**

祝您解决问题! 🚀
