-- =============================================
-- System 管理模块权限升级脚本  v2.9
-- 为 system 管理端 Controller 新增的 @RequiresPermissions 注解配套数据库脚本
-- 与 update2.9-permission.sql (teaching 模块) 配套使用
-- =============================================
-- 说明:
--   后端给 system 模块 controller 加了 Shiro @RequiresPermissions 注解,
--   ShiroRealm 通过 sys_role_permission JOIN sys_permission.perms 取用户权限集,
--   没有 admin 通配豁免。因此必须给角色分配对应 perms,否则 admin 也会被 403。
--   本脚本:1) 给已有管理菜单 UPDATE perms 编码;2) 为无菜单的功能 INSERT
--   按钮级(menu_type=2)权限承载 perms;3) 分配 admin/dev 全量,teacher 不分。

-- =============================================
-- Step 1: 给已有 system 管理菜单补 perms 编码
-- =============================================

-- 网站配置 -> sysConfig
UPDATE `sys_permission` SET `perms` = 'sysConfig:list' WHERE `id` = '1479321067621249026';

-- 数据字典 -> dict
UPDATE `sys_permission` SET `perms` = 'dict:list' WHERE `id` = 'f1cb187abf927c88b89470d08615f5ac';

-- 分类字典 -> sysCategory
UPDATE `sys_permission` SET `perms` = 'sysCategory:list' WHERE `id` = 'ebb9d82ea16ad864071158e0c449d186';

-- 系统编码校验规则 -> sysCheckRule
UPDATE `sys_permission` SET `perms` = 'sysCheckRule:list' WHERE `id` = '1224641973866467330';

-- 数据日志 -> sysDataLog
UPDATE `sys_permission` SET `perms` = 'sysDataLog:list' WHERE `id` = '841057b8a1bef8f6b4b20f9a618a7fa6';

-- 多数据源管理 -> sysDataSource
UPDATE `sys_permission` SET `perms` = 'sysDataSource:list' WHERE `id` = '1209731624921534465';

-- 职务管理 -> sysPosition
UPDATE `sys_permission` SET `perms` = 'sysPosition:list' WHERE `id` = '1174506953255182338';

-- 系统通告 -> announcement
UPDATE `sys_permission` SET `perms` = 'announcement:list' WHERE `id` = 'e08cb190ef230d5d4f03824198773950';

-- =============================================
-- Step 1b: 给 prior 已加注解但未配 perms 的 system 菜单补 perms 编码
-- (prior session 给这些 controller 加了 @RequiresPermissions 但未配套 SQL,
--  本脚本一并补齐, 否则 admin 调用也会 403)
-- =============================================

-- 用户管理 -> user
UPDATE `sys_permission` SET `perms` = 'user:list' WHERE `id` = '3f915b2769fc80648e92d04e84ca059d';
-- 角色管理 -> role
UPDATE `sys_permission` SET `perms` = 'role:list' WHERE `id` = '190c2b43bec6a5f7a4194a85db67d96a';
-- 后台菜单管理 -> permission
UPDATE `sys_permission` SET `perms` = 'permission:list' WHERE `id` = '54dd5457a3190740005c1bfec55b1c34';
-- 班级管理(部门) -> depart
UPDATE `sys_permission` SET `perms` = 'depart:list' WHERE `id` = '5c2f42277948043026b7a14692456828';
-- 文件管理 -> file
UPDATE `sys_permission` SET `perms` = 'file:list' WHERE `id` = '1249162576878370817';
-- 日志管理 -> log
UPDATE `sys_permission` SET `perms` = 'log:list' WHERE `id` = '58857ff846e61794c69208e9d3a85466';

-- =============================================
-- Step 2: 为无菜单的功能新增按钮级 perms 承载记录
-- 父菜单: 系统管理 d7d6e2e4e2934f2c9385a623fd98c6f3 (/isystem)
-- menu_type=2 按钮 (不在菜单树显示, 仅承载 perms 供角色分配)
-- =============================================

-- 填值规则 sysFillRule
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '填值规则列表', NULL, NULL, NULL, NULL, 2, 'sysFillRule:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '填值规则新增', NULL, NULL, NULL, NULL, 2, 'sysFillRule:add', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '填值规则编辑', NULL, NULL, NULL, NULL, 2, 'sysFillRule:edit', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '填值规则删除', NULL, NULL, NULL, NULL, 2, 'sysFillRule:delete', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '填值规则查看', NULL, NULL, NULL, NULL, 2, 'sysFillRule:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '填值规则导出', NULL, NULL, NULL, NULL, 2, 'sysFillRule:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '填值规则导入', NULL, NULL, NULL, NULL, 2, 'sysFillRule:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 用户代理 sysUserAgent
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '用户代理列表', NULL, NULL, NULL, NULL, 2, 'sysUserAgent:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '用户新增代理', NULL, NULL, NULL, NULL, 2, 'sysUserAgent:add', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '用户编辑代理', NULL, NULL, NULL, NULL, 2, 'sysUserAgent:edit', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '用户删除代理', NULL, NULL, NULL, NULL, 2, 'sysUserAgent:delete', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '用户代理查看', NULL, NULL, NULL, NULL, 2, 'sysUserAgent:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '用户代理导出', NULL, NULL, NULL, NULL, 2, 'sysUserAgent:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '用户代理导入', NULL, NULL, NULL, NULL, 2, 'sysUserAgent:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 部门权限 sysDepartPermission
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门权限列表', NULL, NULL, NULL, NULL, 2, 'sysDepartPermission:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门权限新增', NULL, NULL, NULL, NULL, 2, 'sysDepartPermission:add', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门权限编辑', NULL, NULL, NULL, NULL, 2, 'sysDepartPermission:edit', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门权限删除', NULL, NULL, NULL, NULL, 2, 'sysDepartPermission:delete', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门权限查看', NULL, NULL, NULL, NULL, 2, 'sysDepartPermission:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门权限导出', NULL, NULL, NULL, NULL, 2, 'sysDepartPermission:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门权限导入', NULL, NULL, NULL, NULL, 2, 'sysDepartPermission:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 部门角色 sysDepartRole
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门角色列表', NULL, NULL, NULL, NULL, 2, 'sysDepartRole:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门角色新增', NULL, NULL, NULL, NULL, 2, 'sysDepartRole:add', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门角色编辑', NULL, NULL, NULL, NULL, 2, 'sysDepartRole:edit', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门角色删除', NULL, NULL, NULL, NULL, 2, 'sysDepartRole:delete', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门角色查看', NULL, NULL, NULL, NULL, 2, 'sysDepartRole:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门角色导出', NULL, NULL, NULL, NULL, 2, 'sysDepartRole:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'd7d6e2e4e2934f2c9385a623fd98c6f3', '部门角色导入', NULL, NULL, NULL, NULL, 2, 'sysDepartRole:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 字典项 dict (沿用 dict 命名空间, 与 SysDictController 共用菜单按钮粒度)
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), 'f1cb187abf927c88b89470d08615f5ac', '字典项新增', NULL, NULL, NULL, NULL, 2, 'dict:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'f1cb187abf927c88b89470d08615f5ac', '字典项编辑', NULL, NULL, NULL, NULL, 2, 'dict:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'f1cb187abf927c88b89470d08615f5ac', '字典项删除', NULL, NULL, NULL, NULL, 2, 'dict:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 通告发送记录 announcementSend (复用系统通告父菜单 e08cb190ef230d5d4f03824198773950)
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告发送记录列表', NULL, NULL, NULL, NULL, 2, 'announcementSend:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告发送记录新增', NULL, NULL, NULL, NULL, 2, 'announcementSend:add', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告发送记录编辑', NULL, NULL, NULL, NULL, 2, 'announcementSend:edit', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告发送记录删除', NULL, NULL, NULL, NULL, 2, 'announcementSend:delete', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告发送记录查看', NULL, NULL, NULL, NULL, 2, 'announcementSend:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告发送记录导出', NULL, NULL, NULL, NULL, 2, 'announcementSend:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告发送记录导入', NULL, NULL, NULL, NULL, 2, 'announcementSend:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 网站配置编辑按钮 sysConfig:edit (list 已在 Step1 UPDATE)
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1479321067621249026', '网站配置编辑', NULL, NULL, NULL, NULL, 2, 'sysConfig:edit', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- =============================================
-- Step 2b: 补齐 prior 已加注解 system controller 的按钮级 perms (幂等)
-- prior session 给 user/role/permission/depart/file/log/announcement controller 加了
-- @RequiresPermissions 但未配套 SQL, 这里幂等补齐按钮级 perms 记录供角色分配
-- =============================================

-- 用户管理 user
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '3f915b2769fc80648e92d04e84ca059d', '用户列表', NULL, NULL, NULL, NULL, 2, 'user:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='user:list' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '3f915b2769fc80648e92d04e84ca059d', '用户新增', NULL, NULL, NULL, NULL, 2, 'user:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='user:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '3f915b2769fc80648e92d04e84ca059d', '用户编辑', NULL, NULL, NULL, NULL, 2, 'user:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='user:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '3f915b2769fc80648e92d04e84ca059d', '用户删除', NULL, NULL, NULL, NULL, 2, 'user:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='user:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '3f915b2769fc80648e92d04e84ca059d', '用户查看', NULL, NULL, NULL, NULL, 2, 'user:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='user:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '3f915b2769fc80648e92d04e84ca059d', '用户导出', NULL, NULL, NULL, NULL, 2, 'user:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='user:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '3f915b2769fc80648e92d04e84ca059d', '用户导入', NULL, NULL, NULL, NULL, 2, 'user:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='user:import' AND `del_flag`=0);

-- 角色管理 role
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '190c2b43bec6a5f7a4194a85db67d96a', '角色列表', NULL, NULL, NULL, NULL, 2, 'role:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='role:list' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '190c2b43bec6a5f7a4194a85db67d96a', '角色新增', NULL, NULL, NULL, NULL, 2, 'role:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='role:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '190c2b43bec6a5f7a4194a85db67d96a', '角色编辑', NULL, NULL, NULL, NULL, 2, 'role:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='role:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '190c2b43bec6a5f7a4194a85db67d96a', '角色删除', NULL, NULL, NULL, NULL, 2, 'role:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='role:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '190c2b43bec6a5f7a4194a85db67d96a', '角色查看', NULL, NULL, NULL, NULL, 2, 'role:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='role:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '190c2b43bec6a5f7a4194a85db67d96a', '角色导出', NULL, NULL, NULL, NULL, 2, 'role:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='role:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '190c2b43bec6a5f7a4194a85db67d96a', '角色导入', NULL, NULL, NULL, NULL, 2, 'role:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='role:import' AND `del_flag`=0);

-- 菜单管理 permission
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '54dd5457a3190740005c1bfec55b1c34', '菜单列表', NULL, NULL, NULL, NULL, 2, 'permission:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='permission:list' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '54dd5457a3190740005c1bfec55b1c34', '菜单新增', NULL, NULL, NULL, NULL, 2, 'permission:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='permission:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '54dd5457a3190740005c1bfec55b1c34', '菜单编辑', NULL, NULL, NULL, NULL, 2, 'permission:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='permission:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '54dd5457a3190740005c1bfec55b1c34', '菜单删除', NULL, NULL, NULL, NULL, 2, 'permission:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='permission:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '54dd5457a3190740005c1bfec55b1c34', '菜单查看', NULL, NULL, NULL, NULL, 2, 'permission:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='permission:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '54dd5457a3190740005c1bfec55b1c34', '菜单导出', NULL, NULL, NULL, NULL, 2, 'permission:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='permission:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '54dd5457a3190740005c1bfec55b1c34', '菜单导入', NULL, NULL, NULL, NULL, 2, 'permission:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='permission:import' AND `del_flag`=0);

-- 班级管理(部门) depart
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '5c2f42277948043026b7a14692456828', '班级列表', NULL, NULL, NULL, NULL, 2, 'depart:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='depart:list' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '5c2f42277948043026b7a14692456828', '班级新增', NULL, NULL, NULL, NULL, 2, 'depart:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='depart:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '5c2f42277948043026b7a14692456828', '班级编辑', NULL, NULL, NULL, NULL, 2, 'depart:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='depart:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '5c2f42277948043026b7a14692456828', '班级删除', NULL, NULL, NULL, NULL, 2, 'depart:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='depart:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '5c2f42277948043026b7a14692456828', '班级查看', NULL, NULL, NULL, NULL, 2, 'depart:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='depart:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '5c2f42277948043026b7a14692456828', '班级导出', NULL, NULL, NULL, NULL, 2, 'depart:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='depart:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '5c2f42277948043026b7a14692456828', '班级导入', NULL, NULL, NULL, NULL, 2, 'depart:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='depart:import' AND `del_flag`=0);

-- 文件管理 file
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '1249162576878370817', '文件列表', NULL, NULL, NULL, NULL, 2, 'file:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='file:list' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1249162576878370817', '文件新增', NULL, NULL, NULL, NULL, 2, 'file:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='file:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1249162576878370817', '文件编辑', NULL, NULL, NULL, NULL, 2, 'file:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='file:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1249162576878370817', '文件删除', NULL, NULL, NULL, NULL, 2, 'file:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='file:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1249162576878370817', '文件查看', NULL, NULL, NULL, NULL, 2, 'file:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='file:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1249162576878370817', '文件导出', NULL, NULL, NULL, NULL, 2, 'file:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='file:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1249162576878370817', '文件导入', NULL, NULL, NULL, NULL, 2, 'file:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='file:import' AND `del_flag`=0);

-- 日志管理 log
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '58857ff846e61794c69208e9d3a85466', '日志列表', NULL, NULL, NULL, NULL, 2, 'log:list', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='log:list' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '58857ff846e61794c69208e9d3a85466', '日志删除', NULL, NULL, NULL, NULL, 2, 'log:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='log:delete' AND `del_flag`=0);

-- 系统通告 announcement (controller 加了 add/edit/delete/query/export/import/list)
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告新增', NULL, NULL, NULL, NULL, 2, 'announcement:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='announcement:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告编辑', NULL, NULL, NULL, NULL, 2, 'announcement:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='announcement:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告删除', NULL, NULL, NULL, NULL, 2, 'announcement:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='announcement:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告查看', NULL, NULL, NULL, NULL, 2, 'announcement:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='announcement:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告导出', NULL, NULL, NULL, NULL, 2, 'announcement:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='announcement:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'e08cb190ef230d5d4f03824198773950', '通告导入', NULL, NULL, NULL, NULL, 2, 'announcement:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='announcement:import' AND `del_flag`=0);

-- =============================================
-- Step 2c: 补齐新加注解 controller 的 CRUD 按钮级 perms (幂等)
-- SysCategory/SysCheckRule/SysDataSource/SysPosition 的 list 已在 Step1 UPDATE,
-- 这里补 add/edit/delete/query/export/import 按钮 perms
-- =============================================

-- 分类字典 sysCategory
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), 'ebb9d82ea16ad864071158e0c449d186', '分类字典新增', NULL, NULL, NULL, NULL, 2, 'sysCategory:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCategory:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'ebb9d82ea16ad864071158e0c449d186', '分类字典编辑', NULL, NULL, NULL, NULL, 2, 'sysCategory:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCategory:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'ebb9d82ea16ad864071158e0c449d186', '分类字典删除', NULL, NULL, NULL, NULL, 2, 'sysCategory:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCategory:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'ebb9d82ea16ad864071158e0c449d186', '分类字典查看', NULL, NULL, NULL, NULL, 2, 'sysCategory:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCategory:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'ebb9d82ea16ad864071158e0c449d186', '分类字典导出', NULL, NULL, NULL, NULL, 2, 'sysCategory:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCategory:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'ebb9d82ea16ad864071158e0c449d186', '分类字典导入', NULL, NULL, NULL, NULL, 2, 'sysCategory:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCategory:import' AND `del_flag`=0);

-- 校验规则 sysCheckRule
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '1224641973866467330', '校验规则新增', NULL, NULL, NULL, NULL, 2, 'sysCheckRule:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCheckRule:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1224641973866467330', '校验规则编辑', NULL, NULL, NULL, NULL, 2, 'sysCheckRule:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCheckRule:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1224641973866467330', '校验规则删除', NULL, NULL, NULL, NULL, 2, 'sysCheckRule:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCheckRule:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1224641973866467330', '校验规则查看', NULL, NULL, NULL, NULL, 2, 'sysCheckRule:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCheckRule:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1224641973866467330', '校验规则导出', NULL, NULL, NULL, NULL, 2, 'sysCheckRule:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCheckRule:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1224641973866467330', '校验规则导入', NULL, NULL, NULL, NULL, 2, 'sysCheckRule:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysCheckRule:import' AND `del_flag`=0);

-- 多数据源 sysDataSource
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '1209731624921534465', '多数据源新增', NULL, NULL, NULL, NULL, 2, 'sysDataSource:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysDataSource:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1209731624921534465', '多数据源编辑', NULL, NULL, NULL, NULL, 2, 'sysDataSource:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysDataSource:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1209731624921534465', '多数据源删除', NULL, NULL, NULL, NULL, 2, 'sysDataSource:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysDataSource:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1209731624921534465', '多数据源查看', NULL, NULL, NULL, NULL, 2, 'sysDataSource:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysDataSource:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1209731624921534465', '多数据源导出', NULL, NULL, NULL, NULL, 2, 'sysDataSource:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysDataSource:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1209731624921534465', '多数据源导入', NULL, NULL, NULL, NULL, 2, 'sysDataSource:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysDataSource:import' AND `del_flag`=0);

-- 职务 sysPosition
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), '1174506953255182338', '职务新增', NULL, NULL, NULL, NULL, 2, 'sysPosition:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysPosition:add' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1174506953255182338', '职务编辑', NULL, NULL, NULL, NULL, 2, 'sysPosition:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysPosition:edit' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1174506953255182338', '职务删除', NULL, NULL, NULL, NULL, 2, 'sysPosition:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysPosition:delete' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1174506953255182338', '职务查看', NULL, NULL, NULL, NULL, 2, 'sysPosition:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysPosition:query' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1174506953255182338', '职务导出', NULL, NULL, NULL, NULL, 2, 'sysPosition:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysPosition:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), '1174506953255182338', '职务导入', NULL, NULL, NULL, NULL, 2, 'sysPosition:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='sysPosition:import' AND `del_flag`=0);

-- 数据字典 dict 导出/导入
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`)
SELECT UPPER(REPLACE(UUID(),'-','')), 'f1cb187abf927c88b89470d08615f5ac', '字典导出', NULL, NULL, NULL, NULL, 2, 'dict:export', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='dict:export' AND `del_flag`=0)
UNION ALL
SELECT UPPER(REPLACE(UUID(),'-','')), 'f1cb187abf927c88b89470d08615f5ac', '字典导入', NULL, NULL, NULL, NULL, 2, 'dict:import', '1', 6, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL WHERE NOT EXISTS (SELECT 1 FROM `sys_permission` WHERE `perms`='dict:import' AND `del_flag`=0);

-- =============================================
-- Step 3: 分配角色权限
-- admin 角色 ID: f6817f48af4fb3af11b9e8bf182f618b
-- dev   角色 ID: 1236319727061430274
-- teacher 不分配 system 权限 (保持现状)
-- =============================================

-- admin 拥有所有新增 system 权限
INSERT INTO `sys_role_permission` (`id`, `role_id`, `permission_id`)
SELECT UPPER(REPLACE(UUID(),'-','')), 'f6817f48af4fb3af11b9e8bf182f618b', `id`
FROM `sys_permission`
WHERE `perms` IN (
  'sysConfig:list', 'sysConfig:edit',
  'dict:list', 'dict:add', 'dict:edit', 'dict:delete', 'dict:export', 'dict:import',
  'sysCategory:list', 'sysCategory:add', 'sysCategory:edit', 'sysCategory:delete', 'sysCategory:query', 'sysCategory:export', 'sysCategory:import',
  'sysCheckRule:list', 'sysCheckRule:add', 'sysCheckRule:edit', 'sysCheckRule:delete', 'sysCheckRule:query', 'sysCheckRule:export', 'sysCheckRule:import',
  'sysDataLog:list',
  'sysDataSource:list', 'sysDataSource:add', 'sysDataSource:edit', 'sysDataSource:delete', 'sysDataSource:query', 'sysDataSource:export', 'sysDataSource:import',
  'sysPosition:list', 'sysPosition:add', 'sysPosition:edit', 'sysPosition:delete', 'sysPosition:query', 'sysPosition:export', 'sysPosition:import',
  'announcementSend:list', 'announcementSend:add', 'announcementSend:edit', 'announcementSend:delete', 'announcementSend:query', 'announcementSend:export', 'announcementSend:import',
  'sysFillRule:list', 'sysFillRule:add', 'sysFillRule:edit', 'sysFillRule:delete', 'sysFillRule:query', 'sysFillRule:export', 'sysFillRule:import',
  'sysUserAgent:list', 'sysUserAgent:add', 'sysUserAgent:edit', 'sysUserAgent:delete', 'sysUserAgent:query', 'sysUserAgent:export', 'sysUserAgent:import',
  'sysDepartPermission:list', 'sysDepartPermission:add', 'sysDepartPermission:edit', 'sysDepartPermission:delete', 'sysDepartPermission:query', 'sysDepartPermission:export', 'sysDepartPermission:import',
  'sysDepartRole:list', 'sysDepartRole:add', 'sysDepartRole:edit', 'sysDepartRole:delete', 'sysDepartRole:query', 'sysDepartRole:export', 'sysDepartRole:import',
  -- prior 已加注解的 system controller perms (一并分配)
  'user:list', 'user:add', 'user:edit', 'user:delete', 'user:query', 'user:export', 'user:import',
  'role:list', 'role:add', 'role:edit', 'role:delete', 'role:query', 'role:export', 'role:import',
  'permission:list', 'permission:add', 'permission:edit', 'permission:delete', 'permission:query', 'permission:export', 'permission:import',
  'depart:list', 'depart:add', 'depart:edit', 'depart:delete', 'depart:query', 'depart:export', 'depart:import',
  'file:list', 'file:add', 'file:edit', 'file:delete', 'file:query', 'file:export', 'file:import',
  'log:list', 'log:delete',
  'announcement:list', 'announcement:add', 'announcement:edit', 'announcement:delete', 'announcement:query', 'announcement:export', 'announcement:import'
);

-- dev 拥有所有新增 system 权限
INSERT INTO `sys_role_permission` (`id`, `role_id`, `permission_id`)
SELECT UPPER(REPLACE(UUID(),'-','')), '1236319727061430274', `id`
FROM `sys_permission`
WHERE `perms` IN (
  'sysConfig:list', 'sysConfig:edit',
  'dict:list', 'dict:add', 'dict:edit', 'dict:delete', 'dict:export', 'dict:import',
  'sysCategory:list', 'sysCategory:add', 'sysCategory:edit', 'sysCategory:delete', 'sysCategory:query', 'sysCategory:export', 'sysCategory:import',
  'sysCheckRule:list', 'sysCheckRule:add', 'sysCheckRule:edit', 'sysCheckRule:delete', 'sysCheckRule:query', 'sysCheckRule:export', 'sysCheckRule:import',
  'sysDataLog:list',
  'sysDataSource:list', 'sysDataSource:add', 'sysDataSource:edit', 'sysDataSource:delete', 'sysDataSource:query', 'sysDataSource:export', 'sysDataSource:import',
  'sysPosition:list', 'sysPosition:add', 'sysPosition:edit', 'sysPosition:delete', 'sysPosition:query', 'sysPosition:export', 'sysPosition:import',
  'announcementSend:list', 'announcementSend:add', 'announcementSend:edit', 'announcementSend:delete', 'announcementSend:query', 'announcementSend:export', 'announcementSend:import',
  'sysFillRule:list', 'sysFillRule:add', 'sysFillRule:edit', 'sysFillRule:delete', 'sysFillRule:query', 'sysFillRule:export', 'sysFillRule:import',
  'sysUserAgent:list', 'sysUserAgent:add', 'sysUserAgent:edit', 'sysUserAgent:delete', 'sysUserAgent:query', 'sysUserAgent:export', 'sysUserAgent:import',
  'sysDepartPermission:list', 'sysDepartPermission:add', 'sysDepartPermission:edit', 'sysDepartPermission:delete', 'sysDepartPermission:query', 'sysDepartPermission:export', 'sysDepartPermission:import',
  'sysDepartRole:list', 'sysDepartRole:add', 'sysDepartRole:edit', 'sysDepartRole:delete', 'sysDepartRole:query', 'sysDepartRole:export', 'sysDepartRole:import',
  -- prior 已加注解的 system controller perms (一并分配)
  'user:list', 'user:add', 'user:edit', 'user:delete', 'user:query', 'user:export', 'user:import',
  'role:list', 'role:add', 'role:edit', 'role:delete', 'role:query', 'role:export', 'role:import',
  'permission:list', 'permission:add', 'permission:edit', 'permission:delete', 'permission:query', 'permission:export', 'permission:import',
  'depart:list', 'depart:add', 'depart:edit', 'depart:delete', 'depart:query', 'depart:export', 'depart:import',
  'file:list', 'file:add', 'file:edit', 'file:delete', 'file:query', 'file:export', 'file:import',
  'log:list', 'log:delete',
  'announcement:list', 'announcement:add', 'announcement:edit', 'announcement:delete', 'announcement:query', 'announcement:export', 'announcement:import'
);

-- =============================================
-- 注意: 已加注解但本脚本未分配的接口 (需注意不会被 admin 调用, 否则 403):
--   SysAnnouncementSendController.list/add/eidt/delete/deleteBatch/queryById/export/import
--     -> announcementSend:* 已分配, 安全
--   SysDepartPermissionController 的 loadDatarule/saveDatarule/queryDeptRolePermission/saveDeptRolePermission/queryTreeListForDeptRole
--     -> 复用 sysDepartPermission:query/edit, 已分配, 安全
--   SysDepartRoleController 的 getDeptRoleList/deptRoleUserAdd/getDeptRoleByUserId/loadDatarule/saveDatarule
--     -> 复用 sysDepartRole:query/edit, 已分配, 安全
--   SysFillRuleController.testFillRule -> sysFillRule:query, 已分配
-- =============================================

COMMIT;
