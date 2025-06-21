-- ----------------------------
-- 用户表
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` VARCHAR(30) NOT NULL COMMENT '用户账号',
  `nick_name` VARCHAR(30) NOT NULL COMMENT '用户昵称',
  `password` VARCHAR(100) NOT NULL COMMENT '密码',
  `avatar` VARCHAR(255) NULL DEFAULT '' COMMENT '头像地址',
  `phone` VARCHAR(20) NULL DEFAULT NULL COMMENT '联系电话',
  `email` VARCHAR(50) NULL DEFAULT NULL COMMENT '用户邮箱',
  `status` CHAR(1) NOT NULL DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `remark` VARCHAR(500) NULL DEFAULT NULL COMMENT '备注',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- 初始化-用户信息表数据
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '管理员', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '', '13888888888', 'admin@163.com', '0', '管理员', NOW(), NOW());
INSERT INTO `users` VALUES (2, 'test', '测试员', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '', '13666666666', 'test@163.com', '0', '测试员', NOW(), NOW());

-- ----------------------------
-- 菜单表
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` VARCHAR(50) NOT NULL COMMENT '菜单名称',
  `parent_id` INT NULL DEFAULT 0 COMMENT '父菜单ID',
  `order_num` INT NULL DEFAULT 0 COMMENT '显示顺序',
  `path` VARCHAR(200) NULL DEFAULT '' COMMENT '路由地址',
  `component` VARCHAR(255) NULL DEFAULT NULL COMMENT '组件路径',
  `menu_type` CHAR(1) NULL DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `icon` VARCHAR(100) NULL DEFAULT '#' COMMENT '菜单图标',
  `status` CHAR(1) NOT NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- 初始化-菜单权限表数据
-- ----------------------------
-- 目录
INSERT INTO `menus` VALUES (1, '系统管理', 0, 1, 'system', NULL, 'M', 'system', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (2, '商品管理', 0, 2, 'product', NULL, 'M', 'product', '0', NOW(), NOW());
-- 菜单
INSERT INTO `menus` VALUES (100, '用户管理', 1, 1, 'user', 'system/user/index', 'C', 'user', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (101, '菜单管理', 1, 2, 'menu', 'system/menu/index', 'C', 'menu', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (102, '商品列表', 2, 1, 'list', 'product/list/index', 'C', 'list', '0', NOW(), NOW());
-- 按钮
INSERT INTO `menus` VALUES (1001, '用户查询', 100, 1, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1002, '用户新增', 100, 2, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1003, '用户修改', 100, 3, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1004, '用户删除', 100, 4, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1005, '菜单查询', 101, 1, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1006, '菜单新增', 101, 2, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1007, '菜单修改', 101, 3, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1008, '菜单删除', 101, 4, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1009, '商品查询', 102, 1, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1010, '商品新增', 102, 2, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1011, '商品修改', 102, 3, '', '', 'F', '#', '0', NOW(), NOW());
INSERT INTO `menus` VALUES (1012, '商品删除', 102, 4, '', '', 'F', '#', '0', NOW(), NOW()); 