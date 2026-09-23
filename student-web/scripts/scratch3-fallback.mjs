/**
 * scratch3-fallback.mjs — postbuild 钩子。
 *
 * scratch-gui / scratch-storage 编进 lanqu-scratch-gui.js 后,其内部 nested webpack
 * runtime 的 publicPath 被硬编码为 '/'(UMD library 构建下 output.publicPath /
 * workerPublicPath 均不生效)。于是 worker、扩展图标、教程图等运行时资源都被请求
 * 到 /chunks/... 和 /static/...,而文件实际部署在 /scratch3/chunks/ 和
 * /scratch3/static/。teacher.lanqu.vip 的 Nginx SPA fallback 会把不存在的路径重写
 * 到 index.html,返回 HTML → worker 崩溃(Unexpected token '<')、图片 404。
 *
 * 已用 webpack BannerPlugin 在 bundle 顶部 wrap window.Worker,把 /chunks/
 * fetch-worker.*.js 重写到 /scratch3/chunks/(治 worker)。但 <img src> 和 fetch
 * 指向的 /static/assets/... 无法用 banner 统一拦截(img 不走 fetch/Worker)。
 *
 * 本脚本在 vite build 后,在 dist 根创建实体副本(非符号链接,用户通过 SCP/FTP
 * 上传 dist 目录,符号链接会断开):
 *   dist/static/  ← 复制自 dist/scratch3/static/
 *   dist/chunks/  已由 public/chunks/ 通过 Vite 拷贝兜底
 * 这样 /static/* 和 /chunks/* 直接命中 scratch3 下的文件,无需改 Nginx。
 */
import {stat, readdir, cp, mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distRoot = resolve(__dirname, '..', 'dist');
const srcDir = resolve(distRoot, 'scratch3', 'static');
const dstDir = resolve(distRoot, 'static');

console.log('[scratch3-fallback] copying scratch3/static -> static ...');
try {
    // 目标已存在则跳过(每次构建 static 内容不变,首次拷贝后即够)
    await stat(dstDir);
    console.log('[scratch3-fallback] static/ already exists, skip');
} catch {
    try {
        await mkdir(resolve(dstDir, '..'), {recursive: true});
        await cp(srcDir, dstDir, {recursive: true});
        console.log('[scratch3-fallback] done, copied', (await readdir(dstDir, {recursive: true})).length, 'items');
    } catch (err) {
        console.warn(`[scratch3-fallback] failed: ${err.message}`);
    }
}
