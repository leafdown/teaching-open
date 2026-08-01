"""scratch5.com 作品爬取 — 配置常量。

数据源:WordPress + B2 主题,作品用 TurboWarp Packager 打包成独立 HTML。
- WP REST API 开放,6660 帖,URL 模式 /{id}.html
- 播放器 HTML:wp-content/uploads/scratch1/{id}.html(TurboWarp 打包,自包含可运行)
- 原始 sb3 不公开(下载区需登录/积分),故下载打包 HTML 作为作品载体
- 后续可用 TurboWarp 反编译工具从 HTML 提取 sb3
"""
import os

# === 目标站点 ===
SITE = "https://www.scratch5.com"
API_BASE = f"{SITE}/wp-json/wp/v2"
POSTS_API = f"{API_BASE}/posts"
PLAYER_DIR = f"{SITE}/wp-content/uploads/scratch1"  # 打包 HTML 目录

# === HTTP ===
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)
HEADERS = {
    "User-Agent": USER_AGENT,
    "Referer": f"{SITE}/",  # 防盗链
}
PER_PAGE = 100
REQUEST_TIMEOUT = 30
API_INTERVAL = 2.0
DOWNLOAD_INTERVAL = 3.0
RETRY_TIMES = 3
RETRY_BACKOFF = 5

# === 分类 ID(从 WP categories API 获取) ===
CATEGORIES = {
    6: "scratch",          # Scratch作品 (5998)
    7: "game2d",           # 游戏素材 (55)
    25: "pygame",          # Python游戏 (13)
    16: "pcwork",          # 办公教育 (18)
    4: "video-game-design",  # 可视游戏 (18)
    8: "video",            # 视频教程 (22)
    11: "news",            # 综合资讯 (526)
    3: "pcsoft",           # 软件下载 (8)
    5: "works",            # 作品源码 (1)
    267: "godot",          # Godot游戏 (0)
    266: "gameres",        # 游戏源码 (0)
    1: "uncategorized",    # 未分类 (2)
}
# 跳过非作品分类(资讯/软件等,无 Scratch 作品 HTML)
SKIP_CATEGORIES = {11, 3}  # news, pcsoft

# === 存储路径 ===
OUT_ROOT = os.environ.get(
    "SCRATCH5_OUT_ROOT",
    "/Volumes/T7 Share/Scratch5",
)
META_DIR = os.path.join(OUT_ROOT, "metadata")
WORKS_DIR = os.path.join(OUT_ROOT, "works")
STATE_FILE = os.path.join(META_DIR, "state.json")

MIN_DISK_FREE_GB = 20
