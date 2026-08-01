"""小虎鲸 (xiaohujing.com.cn) Scratch 资源爬取 — 配置常量。

数据源:WordPress + ripro-v5 主题,提供开放的 WP REST API。
- 帖子内容 iframe 中明文嵌入 sb3 URL(预览用途,非下载按钮)
- sb3 下载需 Referer 防盗链;素材 zip 无限制
"""
import os

# === 目标站点 ===
SITE = "https://www.xiaohujing.com.cn"
API_BASE = f"{SITE}/wp-json/wp/v2"
POSTS_API = f"{API_BASE}/posts"
MEDIA_API = f"{API_BASE}/media"
EMBED_REFERER = f"{SITE}/player/embed.html"  # sb3 下载必需的 Referer

# === HTTP ===
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)
HEADERS = {
    "User-Agent": USER_AGENT,
    "Referer": f"{SITE}/",  # REST API 用站内 Referer
}
DOWNLOAD_HEADERS = {
    "User-Agent": USER_AGENT,
    "Referer": EMBED_REFERER,  # sb3 防盗链
}
PER_PAGE = 100  # WP REST API 单页最大
REQUEST_TIMEOUT = 30  # 秒
# 频率控制(报告建议:API 2-3s,下载 3-5s)。这里取下限避免限流。
API_INTERVAL = 2.0
DOWNLOAD_INTERVAL = 3.0
RETRY_TIMES = 3
RETRY_BACKOFF = 5  # 秒,指数退避基数

# === 分类 ID(报告 §7.7) ===
CATEGORIES = {
    3: "yuanma",        # Scratch 作品源码(总)
    622: "youxi",       # 游戏源码
    635: "jiaoxue",     # 教学案例
    631: "chuangyi",    # 创意作品
    637: "dashen",      # 大神专栏
    636: "jieri",       # 节日主题
    702: "gzs",         # 工作室
    686: "ybl",         # 云变量联机
    720: "suanfa",      # 算法
    648: "yxsc",        # 游戏素材包
    10: "juese",        # 角色(png)
    606: "gif",         # 动图(GIF)
    4: "beijing",       # Scratch 背景
    11: "shengyin",     # Scratch 音效
    5: "saishi",        # 赛事文档
    654: "effect",      # 效果/模板/半成品
    653: "vip",         # 会员专区(跳过)
    656: "sucai",       # 会员素材(跳过)
}
# VIP/会员内容跳过(需付费)
SKIP_CATEGORIES = {653, 656}

# === 存储路径 ===
# 默认本机;若挂载外接盘,改 OUT_ROOT 到大盘路径(如 /Volumes/外接盘/scratch-resources)
OUT_ROOT = os.environ.get(
    "XHJ_OUT_ROOT",
    "/Users/felixy/Codes/Teacher/teaching-open/resources/xiaohujing",
)
META_DIR = os.path.join(OUT_ROOT, "metadata")
WORKS_DIR = os.path.join(OUT_ROOT, "works")
MATERIALS_DIR = os.path.join(OUT_ROOT, "materials")
STATE_FILE = os.path.join(META_DIR, "state.json")  # 断点续传状态

# sb3 作品平均 ~20MB,部分 100MB+。下载前检查磁盘最小剩余(GB)。
MIN_DISK_FREE_GB = 20
