
-- 考试相关表 开始
-- ----------------------------
-- Table structure for `exam`
-- ----------------------------
DROP TABLE IF EXISTS `exam`;
CREATE TABLE `exam` (
  `exam_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '考试表的主键',
  `exam_name` varchar(128) COLLATE utf8_bin NOT NULL COMMENT '考试名称',
  `exam_avatar` longtext COLLATE utf8_bin COMMENT '考试的预览图',
  `exam_description` varchar(256) COLLATE utf8_bin DEFAULT NULL COMMENT '考试描述',
  `exam_question_ids` varchar(2048) COLLATE utf8_bin DEFAULT NULL COMMENT '当前考试下的题目的id用-连在一起地字符串',
  `exam_question_ids_radio` varchar(512) COLLATE utf8_bin DEFAULT NULL COMMENT '当前考试下的题目单选题的id用-连在一起地字符串',
  `exam_question_ids_check` varchar(512) COLLATE utf8_bin DEFAULT NULL COMMENT '当前考试下的题目多选题的id用-连在一起地字符串',
  `exam_question_ids_judge` varchar(512) COLLATE utf8_bin DEFAULT NULL COMMENT '当前考试下的题目判断题的id用-连在一起地字符串',
  `exam_score` int(11) NOT NULL DEFAULT '0' COMMENT '当前考试的总分数',
  `exam_score_radio` int(11) NOT NULL DEFAULT '0' COMMENT '当前考试每个单选题的分数',
  `exam_score_check` int(11) NOT NULL DEFAULT '0' COMMENT '当前考试每个多选题的分数',
  `exam_score_judge` int(11) NOT NULL DEFAULT '0' COMMENT '当前考试每个判断题的分数',
  `exam_creator_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '考试创建者的用户id',
  `exam_time_limit` int(11) NOT NULL DEFAULT '0' COMMENT '考试的时间限制，单位为分钟',
  `exam_start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '考试有效期开始时间',
  `exam_end_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '考试有效期结束时间',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`exam_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='考试的详细信息表';


-- ----------------------------
-- Table structure for `exam_record`
-- ----------------------------
DROP TABLE IF EXISTS `exam_record`;
CREATE TABLE `exam_record` (
  `exam_record_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '考试记录表的主键',
  `exam_joiner_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '考试参与者的用户id',
  `exam_join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '参加考试的时间',
  `exam_time_cost` int(11) DEFAULT '0' COMMENT '完成考试所用的时间,单位分钟',
  `exam_join_score` int(11) NOT NULL DEFAULT '0' COMMENT '参与考试的实际得分',
  `exam_result_level` int(11) DEFAULT '0' COMMENT '考试结果的等级',
  `answer_option_ids` varchar(4096) COLLATE utf8_bin NOT NULL,
  `exam_id` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`exam_record_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='考试记录表';


-- ----------------------------
-- Table structure for `exam_record_level`
-- ----------------------------
DROP TABLE IF EXISTS `exam_record_level`;
CREATE TABLE `exam_record_level` (
  `exam_record_level_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '考试结果等级表的主键',
  `exam_record_level_name` varchar(128) COLLATE utf8_bin NOT NULL COMMENT '考试结果等级的名称',
  `exam_record_level_description` varchar(512) COLLATE utf8_bin DEFAULT NULL COMMENT '考试结果等级的详细阐述',
  PRIMARY KEY (`exam_record_level_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='考试结果的等级';

-- ----------------------------
-- Records of exam_record_level
-- ----------------------------
INSERT INTO `exam_record_level` VALUES ('1', 'excellent', '优秀');
INSERT INTO `exam_record_level` VALUES ('2', 'good', '良好');
INSERT INTO `exam_record_level` VALUES ('3', 'normal', '一般');
INSERT INTO `exam_record_level` VALUES ('4', 'pass', '及格');
INSERT INTO `exam_record_level` VALUES ('5', 'fail', '不及格');


-- ----------------------------
-- Table structure for `hibernate_sequence`
-- ----------------------------
DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of hibernate_sequence
-- ----------------------------
INSERT INTO `hibernate_sequence` VALUES ('1');
INSERT INTO `hibernate_sequence` VALUES ('1');
INSERT INTO `hibernate_sequence` VALUES ('1');
INSERT INTO `hibernate_sequence` VALUES ('1');
INSERT INTO `hibernate_sequence` VALUES ('1');
INSERT INTO `hibernate_sequence` VALUES ('1');
INSERT INTO `hibernate_sequence` VALUES ('1');

-- ----------------------------
-- Table structure for `question`
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `question_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '题目的主键',
  `question_name` longtext COLLATE utf8_bin COMMENT '题目的名字',
  `question_score` int(11) NOT NULL DEFAULT '0' COMMENT '题目的分数',
  `question_creator_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '题目创建者的用户id',
  `question_level_id` int(11) NOT NULL DEFAULT '0' COMMENT '题目难易度级别',
  `question_type_id` int(11) NOT NULL DEFAULT '0' COMMENT '题目的类型，比如单选、多选、判断等',
  `question_category_id` int(11) NOT NULL DEFAULT '0' COMMENT '题目的类型，比如数学、英语、政治等',
  `question_description` longtext COLLATE utf8_bin COMMENT '题目额外的描述',
  `question_option_ids` varchar(1024) COLLATE utf8_bin NOT NULL COMMENT '题目的选项，用选项的id用-连在一起表示答案',
  `question_answer_option_ids` varchar(1024) COLLATE utf8_bin NOT NULL COMMENT '题目的答案，用选项的id用-连在一起表示答案',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`question_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='考试题目表';


-- ----------------------------
-- Table structure for `question_category`
-- ----------------------------
DROP TABLE IF EXISTS `question_category`;
CREATE TABLE `question_category` (
  `question_category_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '问题类别表的主键',
  `question_category_name` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '问题类别名称',
  `question_category_description` varchar(512) COLLATE utf8_bin DEFAULT NULL COMMENT '问题类别的描述',
  PRIMARY KEY (`question_category_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='题目类别表';

-- ----------------------------
-- Records of question_category
-- ----------------------------
INSERT INTO `question_category` VALUES ('1', '天文', '地球与宇宙的探索');
INSERT INTO `question_category` VALUES ('2', '数学', '所有学科的基础');
INSERT INTO `question_category` VALUES ('3', '物理', '体会牛顿与麦克斯韦的伟大');
INSERT INTO `question_category` VALUES ('4', '生物', '从宏观到微观了解生命');
INSERT INTO `question_category` VALUES ('5', '地理', '踏遍大好河山');
INSERT INTO `question_category` VALUES ('6', '化学', '分子与原子的碰撞');
INSERT INTO `question_category` VALUES ('7', '英语', '出门旅游必备');
INSERT INTO `question_category` VALUES ('8', '历史', '体会悠悠岁月');
INSERT INTO `question_category` VALUES ('9', '人文', '生活与交际');
INSERT INTO `question_category` VALUES ('10', '生活', '人与社会的交互');

-- ----------------------------
-- Table structure for `question_level`
-- ----------------------------
DROP TABLE IF EXISTS `question_level`;
CREATE TABLE `question_level` (
  `question_level_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '题目难易度的主键',
  `question_level_name` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '题目难易度名称',
  `question_level_description` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '题目难易度的描述',
  PRIMARY KEY (`question_level_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='问题的难易度级别';

-- ----------------------------
-- Records of question_level
-- ----------------------------
INSERT INTO `question_level` VALUES ('1', 'high', '难');
INSERT INTO `question_level` VALUES ('2', 'middle', '中');
INSERT INTO `question_level` VALUES ('3', 'low', '易');

-- ----------------------------
-- Table structure for `question_option`
-- ----------------------------
DROP TABLE IF EXISTS `question_option`;
CREATE TABLE `question_option` (
  `question_option_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '题目选项表的主键',
  `question_option_content` varchar(512) COLLATE utf8_bin NOT NULL COMMENT '选项的内容',
  `question_option_description` varchar(512) COLLATE utf8_bin DEFAULT NULL COMMENT '选项的额外描述，可以用于题目答案解析',
  PRIMARY KEY (`question_option_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='题目的选项';

-- ----------------------------
-- Records of question_option
-- ----------------------------
INSERT INTO `question_option` VALUES ('015147df62774a879388f924e1746f81', '曹雪芹', '《红楼梦》的作者是谁？');


-- ----------------------------
-- Table structure for `question_type`
-- ----------------------------
DROP TABLE IF EXISTS `question_type`;
CREATE TABLE `question_type` (
  `question_type_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '题目类型表的主键',
  `question_type_name` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '题目类型名称',
  `question_type_description` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '题目类型的描述',
  PRIMARY KEY (`question_type_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='问题类型';

-- ----------------------------
-- Records of question_type
-- ----------------------------
INSERT INTO `question_type` VALUES ('1', 'single', '单选题');
INSERT INTO `question_type` VALUES ('2', 'multi', '多选题');
INSERT INTO `question_type` VALUES ('3', 'judge', '判断题');
