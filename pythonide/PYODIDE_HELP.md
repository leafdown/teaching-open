# 🚀 如果 Pyodide 加载失败 - 快速修复

**问题**: IDE 显示 "❌ Pyodide 加载失败 - 请检查网络连接"

**这是常见问题，有多种简单的修复方案！**

---

## ⚡ 立即尝试 (按顺序)

### 1️⃣ 硬刷新页面 (清除缓存)

```
macOS: Cmd + Shift + R
Windows/Linux: Ctrl + Shift + F5
```

**预期**: 页面重新加载，Pyodide 重新下载

---

### 2️⃣ 使用隐身/无痕模式

```
Chrome: Ctrl+Shift+N (Win) / Cmd+Shift+N (Mac)
Firefox: Ctrl+Shift+P (Win) / Cmd+Shift+P (Mac)
Safari: Cmd+Shift+N (Mac)
```

然后访问: http://localhost:8000

**预期**: 隐身模式中没有缓存和扩展干扰

---

### 3️⃣ 尝试其他浏览器

- 如果 Chrome 不行，尝试 Firefox
- 如果 Firefox 不行，尝试 Safari 或 Edge

**预期**: 不同浏览器可能有不同的 CDN 连接

---

### 4️⃣ 检查网络连接

```bash
# 测试网络
ping google.com

# 如果 ping 失败，网络可能有问题
```

---

### 5️⃣ 禁用浏览器扩展

某些扩展会阻止 CDN:
- 广告拦截器 (AdBlock)
- VPN 扩展
- 隐私扩展

**解决**: 临时禁用所有扩展，重新加载页面

---

### 6️⃣ 使用诊断工具

访问测试页面: **http://localhost:8000/test-pyodide.html**

这个页面会:
- ✅ 测试 Pyodide CDN
- ✅ 显示加载状态
- ✅ 提供详细的错误信息

---

## 🔍 检查浏览器控制台

按 **F12** 打开开发者工具，查看 **Console** 标签:

### 好的迹象 ✅
```
✅ Pyodide 脚本加载成功
⏳ 等待 Pyodide 加载...
✅ Python 环境加载成功
✅ 应用初始化完成
```

### 坏的迹象 ❌
```
❌ Pyodide 脚本加载失败
❌ Failed to fetch
❌ CORB blocked
```

---

## 🌐 如果 CDN 在您的地区不可用

### 方案 A: 使用 VPN
```bash
# 启用 VPN，然后重新加载页面
```

### 方案 B: 等待并重试
```bash
# CDN 可能临时故障
# 等待 5-10 分钟后重试
```

### 方案 C: 使用备用 IDE
- https://python.org
- https://replit.com
- https://colab.research.google.com

---

## 🛠️ 如果仍然不工作

### 收集信息

```bash
# 1. 打开 F12 -> Console
# 2. 复制所有红色错误信息

# 3. 运行诊断
python3 /Users/felixy/Documents/Lanqu/Codes/platform/teaching-open/pythonide/test_cdn.py

# 4. 查看输出
```

### 可能的原因

| 错误 | 原因 | 解决方案 |
|------|------|---------|
| `404 Not Found` | CDN 文件不存在 | 检查 URL 正确性 |
| `403 Forbidden` | 访问被拒绝 | 尝试 VPN |
| `503 Unavailable` | CDN 过载 | 等待并重试 |
| `Failed to fetch` | 网络问题 | 检查网络连接 |
| `CORB blocked` | 跨域被阻止 | 清除缓存，用隐身模式 |

---

## 💡 记住

1. **这是网络问题，不是 IDE 问题**
   - IDE 代码是正确的
   - 问题出在 Pyodide CDN 加载

2. **您有多个 CDN 源**
   - IDE 会自动尝试备用源
   - 如果一个失败，会尝试另一个

3. **隐身模式通常有效**
   - 没有缓存干扰
   - 没有扩展干扰
   - 干净的网络环境

4. **重启服务器有时有帮助**
   ```bash
   # 停止现有服务
   Ctrl+C
   
   # 重新启动
   python3 -m http.server 8000
   ```

---

## ✅ 完全解决方案 (如果上面都不行)

### 彻底重置

```bash
# 1. 关闭浏览器
# 2. 清除浏览器缓存
#    Chrome: Cmd+Shift+Delete -> 选择 "所有时间"
# 3. 关闭服务器 (Ctrl+C)
# 4. 重启电脑
# 5. 重启服务器: python3 -m http.server 8000
# 6. 打开浏览器，用隐身模式访问
```

---

## 📞 还需要帮助?

查看完整的故障排查指南:

**`TROUBLESHOOTING.md`** - 详细的技术排查步骤

---

**大多数情况下，硬刷新 + 隐身模式就能解决!** 🚀
