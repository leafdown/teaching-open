import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// 代理配置与旧前端 vue.config.js 对齐
// - /api          -> 线上后端 teacher.lanqu.vip (context-path /api)
// - /storage-cdn  -> storage.lanqu.vip (Scratch 作品 sb3 资源跨域绕过)
// - /scratch3     -> 本地 public/scratch3 (Vite 默认 public 服务)
export default defineConfig({
    plugins: [
        react(),
        // Scratch VM 用绝对路径 /chunks/fetch-worker.*.js 加载 worker,但文件在 /scratch3/chunks/。
        // 重写 /chunks/* -> /scratch3/chunks/* 修复 dev 下 worker 404(返回 HTML 导致 SyntaxError)
        {
            name: 'rewrite-scratch-chunks',
            configureServer: function (server) {
                server.middlewares.use(function (req, res, next) {
                    if (req.url && (req.url.startsWith('/chunks/') || req.url.startsWith('/static/'))) {
                        req.url = '/scratch3' + req.url;
                    }
                    next();
                });
            }
        }
    ],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') }
    },
    server: {
        port: 5180,
        proxy: {
            '/api': { target: 'https://teacher.lanqu.vip', changeOrigin: true, ws: false },
            '/storage-cdn': {
                target: 'https://storage.lanqu.vip',
                changeOrigin: true,
                rewrite: function (p) { return p.replace(/^\/storage-cdn/, ''); }
            }
        }
    }
});
