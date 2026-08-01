"""从 TurboWarp Packager 打包的 HTML 提取 sb3。

原理:打包 HTML 把 sb3 zip 拆成多块,每块用 base85 编码存进
`<script data="ENCODED">decodeChunk(SIZE)</script>`。运行时 JS 把各块
base85 解码拼回 ArrayBuffer,该 ArrayBuffer 本身就是 sb3 zip(见
getProjectData 中的 JSZip.loadAsync(buffer))。

本脚本复刻该解码,离线还原 sb3,无需浏览器。

用法:
  python3 extract_sb3.py <input.html> [output.sb3]
  python3 extract_sb3.py --batch <dir>            # 批量:dir 下所有 .html
  python3 extract_sb3.py --batch <dir> --delete   # 提取成功后删除源 HTML
"""
import os
import re
import sys
import zipfile

import numpy as np

# 256 项查找表:char code -> base85 value(0..84),无效字符 -> -1。
# 字母表 0x2a('*')..0x7e('~'),'('(0x28)->'<'(0x3c),')'(0x29)->'>'(0x3e)。
_LUT = np.full(256, -1, dtype=np.int16)
for _c in range(0x2A, 0x7F):
    _LUT[_c] = _c - 0x2A
_LUT[0x28] = 0x3C - 0x2A
_LUT[0x29] = 0x3E - 0x2A


def base85_decode(data_str):
    """复刻 TurboWarp base85decode:每 5 字符 -> 4 字节(uint32 LE),numpy 向量化。"""
    usable = (len(data_str) // 5) * 5
    if usable == 0:
        return b''
    arr = np.frombuffer(data_str.encode('latin-1')[:usable], dtype=np.uint8)
    vals = _LUT[arr].reshape(-1, 5).astype(np.int64)
    # v = c0*1 + c1*85 + c2*85^2 + c3*85^3 + c4*85^4 (与 JS 一致,小端序拼包)
    v = (vals[:, 0]
         + vals[:, 1] * 85
         + vals[:, 2] * 85 ** 2
         + vals[:, 3] * 85 ** 3
         + vals[:, 4] * 85 ** 4)
    return v.astype('<u4').tobytes()


CHUNK_RE = re.compile(r'<script data="([^"]*)">decodeChunk\((\d+)\)</script>')
# p4-project 格式:数据整体放 <script type="p4-project">文本</script>,
# 文本结构 "<len前缀>,<base85数据>"。len 前缀每字符 charCode-49 拼成数字串。
P4_RE = re.compile(
    r'<script type="p4-project">([\s\S]*?)</script>'
)


def _p4_parse_len_prefix(prefix):
    """p4 长度前缀:每字符 charCode-49 作为新码点转字符,拼接后转数字。
    JS: split().map(e=>String.fromCharCode(e.charCodeAt(0)-49)).join('')"""
    s = ''.join(chr(ord(ch) - 49) for ch in prefix)
    return int(s) if s else 0


def extract_sb3_from_html(html_path):
    """返回 (sb3 字节串, 总字节数);失败抛 ValueError。

    支持两种 TurboWarp 打包格式:
    - chunk 模式:多个 <script data="...">decodeChunk(N)</script> 分块
    - p4 模式:<script type="p4-project">lenPrefix,base85data</script> 整块
    """
    with open(html_path, 'rb') as f:
        data = f.read().decode('latin-1')

    # 优先 chunk 模式
    chunks = CHUNK_RE.findall(data)
    if chunks:
        buf = bytearray()
        total_size = 0
        for encoded, size_str in chunks:
            size = int(size_str)
            decoded = base85_decode(encoded)
            if len(decoded) < size:
                raise ValueError(f"块解码长度 {len(decoded)} < 声明 {size}")
            buf += decoded[:size]
            total_size += size
        return bytes(buf), total_size

    # 回退 p4 模式
    p4_blocks = P4_RE.findall(data)
    if p4_blocks:
        joined = ''.join(p4_blocks)
        comma = joined.find(',')
        if comma < 0:
            raise ValueError("p4 数据缺少逗号分隔")
        size = _p4_parse_len_prefix(joined[:comma])
        encoded = joined[comma + 1:]
        decoded = base85_decode(encoded)
        if len(decoded) < size:
            raise ValueError(f"p4 解码长度 {len(decoded)} < 声明 {size}")
        return bytes(decoded[:size]), size

    raise ValueError("未找到 base85 数据块(非 TurboWarp 打包 HTML:无 chunk 或 p4-project)")


def validate_sb3(sb3_bytes):
    """快速校验:是否为有效 sb3(zip 且含 project.json)。"""
    try:
        from io import BytesIO
        z = zipfile.ZipFile(BytesIO(sb3_bytes))
        return 'project.json' in z.namelist()
    except zipfile.BadZipFile:
        return False


def extract_one(html_path, sb3_path=None, overwrite=False):
    """提取单个 HTML。返回 (sb3路径, 状态字符串)。"""
    if sb3_path is None:
        sb3_path = os.path.splitext(html_path)[0] + '.sb3'
    if os.path.exists(sb3_path) and not overwrite:
        return sb3_path, 'skip_exists'
    try:
        sb3_bytes, size = extract_sb3_from_html(html_path)
    except ValueError as e:
        return sb3_path, f'fail:{e}'
    if not validate_sb3(sb3_bytes):
        return sb3_path, 'fail:invalid_zip'
    with open(sb3_path, 'wb') as f:
        f.write(sb3_bytes)
    return sb3_path, f'ok:{size}'


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)

    if args[0] == '--batch':
        d = args[1]
        delete = '--delete' in args[2:]
        ok = fail = skip = 0
        htmls = []
        for root, _, files in os.walk(d):
            for fn in files:
                if fn.endswith('.html'):
                    htmls.append(os.path.join(root, fn))
        htmls.sort()
        for i, h in enumerate(htmls, 1):
            sb3, status = extract_one(h)
            if status.startswith('ok'):
                ok += 1
                if delete:
                    os.remove(h)
            elif status.startswith('skip'):
                skip += 1
            else:
                fail += 1
                print(f"  ! {os.path.basename(h)}: {status}")
            if i % 50 == 0 or i == len(htmls):
                print(f"  [{i}/{len(htmls)}] ok={ok} skip={skip} fail={fail}")
        print(f"\n[done] ok={ok} skip={skip} fail={fail} total={len(htmls)}")
        return

    html_path = args[0]
    sb3_path = args[2] if len(args) > 2 and not args[1].startswith('--') else None
    sb3, status = extract_one(html_path, sb3_path, overwrite=True)
    print(f"{html_path}\n  -> {sb3}\n  status: {status}")
    if status.startswith('ok'):
        size_mb = int(status.split(':')[1]) / 1024 / 1024
        html_mb = os.path.getsize(html_path) / 1024 / 1024
        print(f"  sb3: {size_mb:.1f}MB  html: {html_mb:.1f}MB  节省: {(1 - size_mb / html_mb) * 100:.0f}%")


if __name__ == '__main__':
    main()
