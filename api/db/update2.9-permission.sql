-- =============================================
-- Teaching 管理模块权限升级脚本  v2.9
-- 为 teaching 管理端 Controller 添加权限编码并分配给角色
-- =============================================

-- =============================================
-- Step 1: 给现有 teaching 管理菜单添加 perms
-- =============================================

-- 课程管理
UPDATE `sys_permission` SET `perms` = 'teaching:course:list' WHERE `id` = '1249928454356176898';
UPDATE `sys_permission` SET `perms` = 'teaching:courseUnit:list' WHERE `id` = '1249928626473635842';

-- 作业管理
UPDATE `sys_permission` SET `perms` = 'teaching:work:list' WHERE `id` = '1249206567527260161';
UPDATE `sys_permission` SET `perms` = 'teaching:additionalWork:list' WHERE `id` = '1478631727777837058';

-- 班级课程表
UPDATE `sys_permission` SET `perms` = 'teaching:courseDept:list' WHERE `id` = '1803370383882072065';

-- 资讯管理
UPDATE `sys_permission` SET `perms` = 'teaching:news:list' WHERE `id` = '1803329147661983746';

-- Scratch素材库
UPDATE `sys_permission` SET `perms` = 'teaching:scratchAssets:list' WHERE `id` = '1439107239277322241';

-- 前台菜单管理
UPDATE `sys_permission` SET `perms` = 'teaching:menu:list' WHERE `id` = '1481550648382185474';

-- =============================================
-- Step 2: 添加按钮级权限（CRUD 操作）
-- =============================================

-- 课程管理按钮权限
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1249928454356176898', '课程新增', NULL, NULL, NULL, NULL, 2, 'teaching:course:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928454356176898', '课程编辑', NULL, NULL, NULL, NULL, 2, 'teaching:course:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928454356176898', '课程删除', NULL, NULL, NULL, NULL, 2, 'teaching:course:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928454356176898', '课程导出', NULL, NULL, NULL, NULL, 2, 'teaching:course:export', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928454356176898', '课程导入', NULL, NULL, NULL, NULL, 2, 'teaching:course:import', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928454356176898', '课程查看', NULL, NULL, NULL, NULL, 2, 'teaching:course:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 课程单元按钮权限
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1249928626473635842', '课程单元新增', NULL, NULL, NULL, NULL, 2, 'teaching:courseUnit:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928626473635842', '课程单元编辑', NULL, NULL, NULL, NULL, 2, 'teaching:courseUnit:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928626473635842', '课程单元删除', NULL, NULL, NULL, NULL, 2, 'teaching:courseUnit:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928626473635842', '课程单元导出', NULL, NULL, NULL, NULL, 2, 'teaching:courseUnit:export', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928626473635842', '课程单元导入', NULL, NULL, NULL, NULL, 2, 'teaching:courseUnit:import', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249928626473635842', '课程单元查看', NULL, NULL, NULL, NULL, 2, 'teaching:courseUnit:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 作业管理按钮权限
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1249206567527260161', '作业新增', NULL, NULL, NULL, NULL, 2, 'teaching:work:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249206567527260161', '作业编辑', NULL, NULL, NULL, NULL, 2, 'teaching:work:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249206567527260161', '作业删除', NULL, NULL, NULL, NULL, 2, 'teaching:work:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249206567527260161', '作业导出', NULL, NULL, NULL, NULL, 2, 'teaching:work:export', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249206567527260161', '作业导入', NULL, NULL, NULL, NULL, 2, 'teaching:work:import', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1249206567527260161', '作业查看', NULL, NULL, NULL, NULL, 2, 'teaching:work:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 附加作业按钮权限
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1478631727777837058', '附加作业新增', NULL, NULL, NULL, NULL, 2, 'teaching:additionalWork:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1478631727777837058', '附加作业编辑', NULL, NULL, NULL, NULL, 2, 'teaching:additionalWork:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1478631727777837058', '附加作业删除', NULL, NULL, NULL, NULL, 2, 'teaching:additionalWork:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1478631727777837058', '附加作业查看', NULL, NULL, NULL, NULL, 2, 'teaching:additionalWork:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 班级课程表按钮权限
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1803370383882072065', '班级课程表新增', NULL, NULL, NULL, NULL, 2, 'teaching:courseDept:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803370383882072065', '班级课程表编辑', NULL, NULL, NULL, NULL, 2, 'teaching:courseDept:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803370383882072065', '班级课程表删除', NULL, NULL, NULL, NULL, 2, 'teaching:courseDept:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803370383882072065', '班级课程表查看', NULL, NULL, NULL, NULL, 2, 'teaching:courseDept:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803370383882072065', '班级课程表导出', NULL, NULL, NULL, NULL, 2, 'teaching:courseDept:export', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803370383882072065', '班级课程表导入', NULL, NULL, NULL, NULL, 2, 'teaching:courseDept:import', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 新闻按钮权限
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1803329147661983746', '资讯新增', NULL, NULL, NULL, NULL, 2, 'teaching:news:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803329147661983746', '资讯编辑', NULL, NULL, NULL, NULL, 2, 'teaching:news:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803329147661983746', '资讯删除', NULL, NULL, NULL, NULL, 2, 'teaching:news:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803329147661983746', '资讯查看', NULL, NULL, NULL, NULL, 2, 'teaching:news:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803329147661983746', '资讯导出', NULL, NULL, NULL, NULL, 2, 'teaching:news:export', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1803329147661983746', '资讯导入', NULL, NULL, NULL, NULL, 2, 'teaching:news:import', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- Scratch素材按钮权限
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1439107239277322241', '素材新增', NULL, NULL, NULL, NULL, 2, 'teaching:scratchAssets:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1439107239277322241', '素材编辑', NULL, NULL, NULL, NULL, 2, 'teaching:scratchAssets:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1439107239277322241', '素材删除', NULL, NULL, NULL, NULL, 2, 'teaching:scratchAssets:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1439107239277322241', '素材查看', NULL, NULL, NULL, NULL, 2, 'teaching:scratchAssets:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1439107239277322241', '素材导出', NULL, NULL, NULL, NULL, 2, 'teaching:scratchAssets:export', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1439107239277322241', '素材导入', NULL, NULL, NULL, NULL, 2, 'teaching:scratchAssets:import', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- 前台菜单按钮权限
INSERT INTO `sys_permission` (`id`,`parent_id`,`name`,`url`,`component`,`component_name`,`redirect`,`menu_type`,`perms`,`perms_type`,`sort_no`,`always_show`,`icon`,`is_route`,`is_leaf`,`keep_alive`,`hidden`,`description`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`,`rule_flag`,`status`,`internal_or_external`) VALUES
(UPPER(REPLACE(UUID(),'-','')), '1481550648382185474', '菜单新增', NULL, NULL, NULL, NULL, 2, 'teaching:menu:add', '1', 1, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1481550648382185474', '菜单编辑', NULL, NULL, NULL, NULL, 2, 'teaching:menu:edit', '1', 2, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1481550648382185474', '菜单删除', NULL, NULL, NULL, NULL, 2, 'teaching:menu:delete', '1', 3, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1481550648382185474', '菜单查看', NULL, NULL, NULL, NULL, 2, 'teaching:menu:query', '1', 0, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1481550648382185474', '菜单导出', NULL, NULL, NULL, NULL, 2, 'teaching:menu:export', '1', 4, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL),
(UPPER(REPLACE(UUID(),'-','')), '1481550648382185474', '菜单导入', NULL, NULL, NULL, NULL, 2, 'teaching:menu:import', '1', 5, 0, NULL, 1, 1, 0, 0, NULL, 'admin', NOW(), NULL, NULL, 0, 0, '1', NULL);

-- =============================================
-- Step 3: 分配角色权限
-- admin 角色 ID: f6817f48af4fb3af11b9e8bf182f618b
-- teacher 角色 ID: 1252532323347161090
-- dev 角色 ID: 1236319727061430274
-- student 角色 ID: 1252532277234982913
-- =============================================

-- 先删除旧的 teaching 相关角色权限
DELETE FROM `sys_role_permission` WHERE `permission_id` IN (
  SELECT `id` FROM `sys_permission` WHERE `perms` LIKE 'teaching:%'
);

-- admin 拥有所有权限
INSERT INTO `sys_role_permission` (`id`, `role_id`, `permission_id`)
SELECT UPPER(REPLACE(UUID(),'-','')), 'f6817f48af4fb3af11b9e8bf182f618b', `id`
FROM `sys_permission`
WHERE `perms` LIKE 'teaching:%';

-- dev 拥有所有权限
INSERT INTO `sys_role_permission` (`id`, `role_id`, `permission_id`)
SELECT UPPER(REPLACE(UUID(),'-','')), '1236319727061430274', `id`
FROM `sys_permission`
WHERE `perms` LIKE 'teaching:%';

-- teacher 拥有课程、作业、附加作业、班级课程表、资讯、班级教学记录的管理权限
INSERT INTO `sys_role_permission` (`id`, `role_id`, `permission_id`)
SELECT UPPER(REPLACE(UUID(),'-','')), '1252532323347161090', `id`
FROM `sys_permission`
WHERE `perms` IN (
  'teaching:course:list', 'teaching:course:add', 'teaching:course:edit', 'teaching:course:delete', 'teaching:course:query', 'teaching:course:export', 'teaching:course:import',
  'teaching:courseUnit:list', 'teaching:courseUnit:add', 'teaching:courseUnit:edit', 'teaching:courseUnit:delete', 'teaching:courseUnit:query', 'teaching:courseUnit:export', 'teaching:courseUnit:import',
  'teaching:work:list', 'teaching:work:add', 'teaching:work:edit', 'teaching:work:delete', 'teaching:work:query', 'teaching:work:export', 'teaching:work:import',
  'teaching:additionalWork:list', 'teaching:additionalWork:add', 'teaching:additionalWork:edit', 'teaching:additionalWork:delete', 'teaching:additionalWork:query',
  'teaching:courseDept:list', 'teaching:courseDept:add', 'teaching:courseDept:edit', 'teaching:courseDept:delete', 'teaching:courseDept:query', 'teaching:courseDept:export', 'teaching:courseDept:import',
  'teaching:news:list', 'teaching:news:add', 'teaching:news:edit', 'teaching:news:delete', 'teaching:news:query', 'teaching:news:export', 'teaching:news:import'
);

COMMIT;
