-- ============================================================================
-- 过滤 dashboard 边栏：隐藏三个对教学平台无用的 Jeecg 框架自带顶层菜单
--   - 在线开发 (url=/online, id=e41b69c57a941a3bbcce45032fe57605)
--   - 统计报表 (url=/report, id=f0675b52d89100ee88472b6800754a08)
--   - 常见案例 (url=/jeecg, id=2a470fc0c3954d9dbb61de6d80846549)
--
-- 原理：
--   边栏菜单由后端 sys_permission 表驱动 (getUserPermissionByToken)。
--   前端 SMenu 组件 (src/components/menu/index.js) 对 hidden=1 的菜单不渲染。
--   注意：queryByUser 的 SQL 中硬编码了 `or p.url = '/online'`，会强制返回
--   "在线开发"菜单行——因此单纯清理 sys_role_permission 角色授权无法隐藏它。
--   改 hidden=1 可同时绕过该硬编码（行仍返回，但前端跳过）。
--
-- 生效方式：执行后重新登录或刷新页面即可（菜单接口实时查库，无需清 Redis）。
-- 回滚：将对应 hidden 改回 0。
-- ============================================================================

-- 备份当前值（便于回滚核对）
SELECT id, name, url, hidden
FROM sys_permission
WHERE id IN (
  'e41b69c57a941a3bbcce45032fe57605',  -- 在线开发
  'f0675b52d89100ee88472b6800754a08',  -- 统计报表
  '2a470fc0c3954d9dbb61de6d80846549'   -- 常见案例
);

-- 隐藏三个顶层菜单（仅影响边栏显隐，菜单定义与路由保留，可逆）
UPDATE sys_permission
SET hidden = 1
WHERE id IN (
  'e41b69c57a941a3bbcce45032fe57605',  -- 在线开发
  'f0675b52d89100ee88472b6800754a08',  -- 统计报表
  '2a470fc0c3954d9dbb61de6d80846549'   -- 常见案例
);

-- 回滚脚本（如需恢复）：
-- UPDATE sys_permission SET hidden = 0
-- WHERE id IN (
--   'e41b69c57a941a3bbcce45032fe57605',
--   'f0675b52d89100ee88472b6800754a08',
--   '2a470fc0c3954d9dbb61de6d80846549'
-- );
