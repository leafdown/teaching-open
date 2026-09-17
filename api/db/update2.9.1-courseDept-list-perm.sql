-- =============================================
-- v2.9.1 修复线上库缺失 班级课程 菜单权限行
-- 背景: update2.9-permission.sql 假设 sys_permission 中已存在
--       id=1803370383882072065 的 班级课程 菜单行(update 其 perms 为
--       teaching:courseDept:list),但线上库从未有该行,导致:
--       1) admin 角色拿不到 teaching:courseDept:list → 班级课程列表 403
--       2) 班级课程的 6 个按钮权限行成孤儿(parent_id 指向不存在的菜单)
-- 本脚本可重复执行(幂等)
-- =============================================

-- 1. 补菜单行(与 update2.9 假定的 id 一致)
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `url`, `component`, `component_name`,
                              `menu_type`, `perms`, `perms_type`, `sort_no`, `always_show`,
                              `is_route`, `is_leaf`, `keep_alive`, `hidden`, `del_flag`, `create_by`, `create_time`)
SELECT '1803370383882072065', '', '班级课程', '/admin/teaching/CourseDeptList', 'teaching/CourseDeptList', 'CourseDeptList',
       0, 'teaching:courseDept:list', '0', 6, 0, 1, 1, 0, 0, 0, 'admin', NOW()
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `id` = '1803370383882072065');

-- 2. 授权给 admin 角色
INSERT INTO `sys_role_permission` (`id`, `role_id`, `permission_id`)
SELECT UPPER(REPLACE(UUID(), '-', '')), 'f6817f48af4fb3af11b9e8bf182f618b', '1803370383882072065'
FROM DUAL WHERE NOT EXISTS (
  SELECT 1 FROM `sys_role_permission`
  WHERE `role_id` = 'f6817f48af4fb3af11b9e8bf182f618b' AND `permission_id` = '1803370383882072065');
