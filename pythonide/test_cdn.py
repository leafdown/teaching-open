#!/usr/bin/env python3
"""
Online Python IDE - CDN 连接测试
测试所有 CDN 源的连接状态
"""

import urllib.request
import json
from urllib.error import URLError, HTTPError

# CDN 源列表
CDN_URLS = {
    'jsDelivr Pyodide': 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js',
    'Pyodide CDN 2': 'https://pyodide-cdn2.iodide.io/v0.23.4/full/pyodide.js',
    'jsDelivr Monaco': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js',
    'Font Awesome': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
}

def test_cdn_connection(name, url):
    """测试单个 CDN 连接"""
    try:
        print(f"\n🔍 测试: {name}")
        print(f"   URL: {url}")
        
        # 创建请求
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        
        # 发送请求（只获取头信息）
        with urllib.request.urlopen(req, timeout=5) as response:
            status = response.status
            content_length = response.headers.get('Content-Length', '未知')
            content_type = response.headers.get('Content-Type', '未知')
            
            print(f"   ✅ 连接成功")
            print(f"   状态码: {status}")
            print(f"   大小: {content_length} bytes")
            print(f"   类型: {content_type}")
            
            return True
            
    except HTTPError as e:
        print(f"   ❌ HTTP 错误: {e.code}")
        return False
    except URLError as e:
        print(f"   ❌ 连接失败: {e.reason}")
        return False
    except Exception as e:
        print(f"   ❌ 错误: {str(e)}")
        return False

def main():
    """主函数"""
    print("\n" + "="*70)
    print("  🌐 Online Python IDE - CDN 连接测试")
    print("="*70)
    
    print("\n📡 测试 CDN 连接状态...")
    
    results = {}
    for name, url in CDN_URLS.items():
        results[name] = test_cdn_connection(name, url)
    
    # 总结
    print("\n" + "="*70)
    print("  📊 测试结果总结")
    print("="*70 + "\n")
    
    success_count = 0
    for name, status in results.items():
        symbol = "✅" if status else "❌"
        print(f"  {symbol} {name}")
        if status:
            success_count += 1
    
    print(f"\n  总计: {success_count}/{len(CDN_URLS)} CDN 可用")
    
    # 建议
    print("\n" + "="*70)
    print("  💡 建议")
    print("="*70 + "\n")
    
    if success_count == len(CDN_URLS):
        print("  ✅ 所有 CDN 都可用，IDE 应该能正常工作")
        print("  ")
        print("  如果 IDE 仍然出现问题:")
        print("    1. 刷新浏览器页面 (Cmd+R)")
        print("    2. 清除浏览器缓存")
        print("    3. 尝试使用其他浏览器")
        print("    4. 检查浏览器控制台错误信息 (F12)")
    
    elif success_count >= len(CDN_URLS) - 1:
        print("  ⚠️  大多数 CDN 可用，IDE 可能能工作")
        print("  ")
        print("  不可用的 CDN 会自动跳过，使用备用源")
    
    else:
        print("  ❌ 很多 CDN 不可用，IDE 可能无法正常工作")
        print("  ")
        print("  可能的原因:")
        print("    • 网络连接问题")
        print("    • 防火墙/代理阻止")
        print("    • ISP 地理位置限制")
        print("    • CDN 故障")
        print("  ")
        print("  解决方案:")
        print("    • 检查网络连接")
        print("    • 尝试使用 VPN")
        print("    • 检查防火墙设置")
        print("    • 尝试稍后再访问")
    
    print("\n" + "="*70 + "\n")
    
    return 0 if success_count > 0 else 1

if __name__ == "__main__":
    exit(main())
