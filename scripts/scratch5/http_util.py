"""HTTP 工具:带重试、频率控制、磁盘检查。"""
import os
import time
import shutil
import requests

from config import (
    HEADERS, REQUEST_TIMEOUT,
    API_INTERVAL, DOWNLOAD_INTERVAL, RETRY_TIMES, RETRY_BACKOFF,
    MIN_DISK_FREE_GB, OUT_ROOT,
)
# scratch5 的下载用同一套 HEADERS(含 Referer 防盗链),无独立下载头
DOWNLOAD_HEADERS = HEADERS


def _sleep(interval):
    """可被中断的 sleep(KeyboardInterrupt 直接抛出)。"""
    time.sleep(interval)


def request_json(url, params=None, interval=API_INTERVAL):
    """GET JSON,带重试与频率控制。返回 (data, total, pages)。"""
    last_err = None
    for attempt in range(1, RETRY_TIMES + 1):
        try:
            r = requests.get(url, params=params, headers=HEADERS,
                             timeout=REQUEST_TIMEOUT)
            r.raise_for_status()
            total = int(r.headers.get("X-WP-Total", 0))
            pages = int(r.headers.get("X-WP-TotalPages", 0))
            data = r.json()
            _sleep(interval)
            return data, total, pages
        except (requests.RequestException, ValueError) as e:
            last_err = e
            wait = RETRY_BACKOFF * attempt
            print(f"  [warn] {url} 第 {attempt}/{RETRY_TIMES} 次失败: {e},{wait}s 后重试")
            _sleep(wait)
    raise RuntimeError(f"请求失败(已重试 {RETRY_TIMES} 次): {url} — {last_err}")


def head_size(url, use_download_headers=True):
    """HEAD 获取文件大小(bytes),失败返回 None。"""
    headers = DOWNLOAD_HEADERS if use_download_headers else HEADERS
    try:
        h = requests.head(url, headers=headers, timeout=REQUEST_TIMEOUT,
                          allow_redirects=True)
        if h.status_code == 200:
            cl = h.headers.get("Content-Length")
            return int(cl) if cl and cl.isdigit() else None
    except requests.RequestException:
        pass
    return None


def download_file(url, dest_path, expected_size=None):
    """流式下载到 dest_path(支持断点续传)。返回 (bytes_written, ok)。"""
    # 断点续传:已存在且大小匹配则跳过
    if os.path.exists(dest_path):
        existing = os.path.getsize(dest_path)
        if expected_size and existing == expected_size:
            return existing, True
        # 大小不匹配或无 expected_size,删除重下(避免半截文件)
        os.remove(dest_path)

    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    last_err = None
    for attempt in range(1, RETRY_TIMES + 1):
        try:
            with requests.get(url, headers=DOWNLOAD_HEADERS,
                              stream=True, timeout=REQUEST_TIMEOUT,
                              allow_redirects=True) as r:
                r.raise_for_status()
                written = 0
                with open(dest_path, "wb") as f:
                    for chunk in r.iter_content(chunk_size=65536):
                        if chunk:
                            f.write(chunk)
                            written += len(chunk)
            _sleep(DOWNLOAD_INTERVAL)
            return written, True
        except requests.RequestException as e:
            last_err = e
            wait = RETRY_BACKOFF * attempt
            print(f"  [warn] 下载失败 {attempt}/{RETRY_TIMES}: {e},{wait}s 后重试")
            _sleep(wait)
    return 0, False


def disk_free_gb(path=OUT_ROOT):
    """路径所在卷的可用空间(GB)。"""
    os.makedirs(path, exist_ok=True)
    return shutil.disk_usage(path).free / (1024 ** 3)


def check_disk(need_gb=MIN_DISK_FREE_GB, path=OUT_ROOT):
    """下载前检查磁盘剩余,不足抛 RuntimeError。"""
    free = disk_free_gb(path)
    if free < need_gb:
        raise RuntimeError(
            f"磁盘剩余 {free:.1f}GB < 需要 {need_gb}GB。"
            f"请挂载外接盘并设置 XHJ_OUT_ROOT 环境变量。"
        )
    return free
