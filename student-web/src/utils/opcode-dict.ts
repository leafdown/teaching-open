// Scratch 积木 opcode → 中文描述(覆盖常见积木)
export const OPCODE_DICT: Record<string, string> = {
  // 事件
  event_whenflagclicked: '当绿旗被点击',
  event_whenthisspriteclicked: '当角色被点击',
  event_whenbroadcastreceived: '当接收到广播',
  event_whenbackdropswitchesto: '当背景切换到',
  event_whenkeypressed: '当按下按键',
  event_whenstageclicked: '当舞台被点击',
  event_broadcast: '广播消息',
  event_broadcastandwait: '广播消息并等待',
  // 运动
  motion_movesteps: '移动步数',
  motion_turnright: '右转',
  motion_turnleft: '左转',
  motion_gotoxy: '移动到坐标',
  motion_glideto: '滑行到',
  motion_changexby: 'X坐标增加',
  motion_setx: 'X坐标设为',
  motion_changeyby: 'Y坐标增加',
  motion_sety: 'Y坐标设为',
  motion_xposition: 'X坐标',
  motion_yposition: 'Y坐标',
  motion_direction: '方向',
  motion_pointindirection: '面向方向',
  motion_pointtowards: '面向',
  motion_ifonedgebounce: '碰到边缘就反弹',
  // 外观
  looks_sayforsecs: '说话(秒)',
  looks_say: '说话',
  looks_thinkforsecs: '思考(秒)',
  looks_switchcostumeto: '切换造型到',
  looks_nextcostume: '下一个造型',
  looks_switchbackdropto: '切换背景到',
  looks_changesizeby: '大小增加',
  looks_setsizeto: '大小设为',
  looks_show: '显示',
  looks_hide: '隐藏',
  looks_gotofrontback: '移到最前/后',
  looks_changeeffectby: '特效增加',
  looks_seteffectto: '特效设为',
  looks_cleargraphiceffects: '清除图形特效',
  // 声音
  sound_playuntildone: '播放声音直到完成',
  sound_play: '播放声音',
  sound_setvolumeto: '音量设为',
  sound_changevolumeby: '音量增加',
  // 控制
  control_wait: '等待',
  control_wait_until: '等待直到',
  control_repeat: '重复',
  control_repeat_until: '重复直到',
  control_forever: '无限循环',
  control_if: '如果',
  control_if_else: '如果...否则',
  control_stop: '停止',
  control_create_clone_of: '克隆',
  control_delete_this_clone: '删除本克隆体',
  // 侦测
  sensing_touchingobject: '碰到',
  sensing_touchingcolor: '碰到颜色',
  sensing_istouched: '被点击',
  sensing_keypressed: '按下按键',
  sensing_mousex: '鼠标X',
  sensing_mousey: '鼠标Y',
  sensing_mousedown: '鼠标按下',
  sensing_askandwait: '询问并等待',
  sensing_answer: '回答',
  sensing_distance: '距离',
  // 运算
  operator_add: '加法',
  operator_subtract: '减法',
  operator_multiply: '乘法',
  operator_divide: '除法',
  operator_random: '随机数',
  operator_lt: '小于',
  operator_gt: '大于',
  operator_equals: '等于',
  operator_and: '与',
  operator_or: '或',
  operator_not: '非',
  operator_join: '连接字符串',
  operator_length: '字符串长度',
  operator_mod: '取余',
  operator_round: '四舍五入',
  operator_contains: '包含',
  // 变量
  data_setvariableto: '设变量',
  data_changevariableby: '变量增加',
  data_showvariable: '显示变量',
  data_hidevariable: '隐藏变量',
  data_addtolist: '添加到列表',
  data_deleteoflist: '从列表删除',
  data_itemoflist: '列表第项',
  data_lengthoflist: '列表长度',
  // 自定义积木
  procedures_definition: '定义积木',
  procedures_call: '调用积木',
  procedures_prototype: '积木原型',
  // 参数
  argument_reporter_string_number: '参数',
}

// opcode 分类(用于统计知识点)
export function opcodeCategory(opcode: string): string {
  if (!opcode) return '其他'
  if (opcode.startsWith('event')) return '事件'
  if (opcode.startsWith('motion')) return '运动'
  if (opcode.startsWith('looks')) return '外观'
  if (opcode.startsWith('sound')) return '声音'
  if (opcode.startsWith('control')) return '控制'
  if (opcode.startsWith('sensing')) return '侦测'
  if (opcode.startsWith('operator')) return '运算'
  if (opcode.startsWith('data')) return '变量/列表'
  if (opcode.startsWith('procedures')) return '自制积木'
  return '其他'
}

export function translateOpcode(opcode: string): string {
  return OPCODE_DICT[opcode] || opcode
}
