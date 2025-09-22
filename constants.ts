import { Team } from './types';

export const SIGNUP_FORM_URL = 'https://forms.gle/example';
export const GOOGLE_DRIVE_URL = 'https://drive.google.com/drive/folders/example';

export const TEAMS_DATA: Team[] = [
  // 1) 推薦：陣列 weekly / weeks / exerciseWeeks（長度 8）
  { id: 1, name: '鍶去的脂肪庭止再生', gender: 'female', points: 0.0, members: ['陳郁庭', '許瀞鍶'], weekly: [1,2,2,2,2,2], bonusW2: 4, bonusW6: 2, bonusW8: -1},
  { id: 2, name: '斯巴達增肌減脂戰士', gender: 'female', points: 0.0, members: ['謝家芸', '翁憶如'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 3, name: '聿罷不寧', gender: 'female', points: 0.0, members: ['彭聿采', '許家寧'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 4, name: '吱吱唧唧嘰吱', gender: 'female', points: 0.0, members: ['劉凡瑀', '施捷如'], weekly: [1,2,2,1,2,1], bonusW2: 4, bonusW8: -1},
  { id: 5, name: '我們只是胖著玩玩', gender: 'female', points: 0.0, members: ['詹壬菡', '林玉涵'], weekly: [1,1,2,1,1,2], bonusW2: 4, bonusW8: -1},
  { id: 6, name: '瘦到你認不出我隊', gender: 'female', points: 0.0, members: ['林雅茹', '張翊琳'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 7, name: '我胖我驕傲', gender: 'female', points: 0.0, members: ['杜巧琍', '蔡佳玲'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 8, name: '總是志在參加', gender: 'female', points: 0.0, members: ['陳玥年', '黃孟淳'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 9, name: '祐要運動到嫣嫣一息ㄌ', gender: 'female', points: 0.0, members: ['蘇祐萱', '李嫣容'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 10, name: 'GK動態提脂', gender: 'female', points: 0.0, members: ['林怡汝', '游季婕'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 11, name: '媽媽帶女兒', gender: 'female', points: 0.0, members: ['沈惟鉦', '莊壹淋'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 12, name: '為什麼吃東西會胖呢', gender: 'female', points: 0.0, members: ['黃婕瑀', '徐瑞妤'], weekly: [2,1,2,1,2,2], bonusW2: 3, bonusW8: -1},
  { id: 13, name: 'Luna 的快樂小夥伴', gender: 'female', points: 0.0, members: ['連英茹', '周品均'], weekly: [1,1,1,1,0,0], bonusW2: 2, bonusW8: -1},
  { id: 14, name: '平均70分', gender: 'female', points: 0.0, members: ['謝孟倢', '林紹芩'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 15, name: '麥菜小隊', gender: 'female', points: 0.0, members: ['蔡季諭', '李沁璇'], weekly: [2,2,2,2,2,2], bonusW2: 0, bonusW8: -1},
  { id: 31, name: '迭代瘦身王', gender: 'female', points: 0.0, members: ['林孟蓉', '陳婉渟'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 16, name: '產品總監漢斯', gender: 'male', points: 0.0, members: ['謝承翰', '鄭靖達'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 17, name: '陳和歐巴', gender: 'male', points: 0.0, members: ['陳和', '李珣廷'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 18, name: '天欲我瘦胖不了', gender: 'male', points: 0.0, members: ['邱世煌', '郭錦偉'], weekly: [0,0,0,0,0,0], bonusW2: 2, bonusW8: -1},
  { id: 19, name: '.', gender: 'male', points: 0.0, members: ['江東儒', '蔣皓丞'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 20, name: '路過', gender: 'male', points: 0.0, members: ['曾奐嘉', '吳省澤'], weekly: [1,1,2,2,2,2], bonusW2: 3, bonusW8: -1},
  { id: 21, name: '禎的有廖', gender: 'male', points: 0.0, members: ['張宜禎', '廖偉丞'], weekly: [1,1,0,0,0,0], bonusW2: 2, bonusW8: -1},
  { id: 22, name: '4000塊拿來', gender: 'male', points: 0.0, members: ['丁禹翔', '鄭昊'], weekly: [0,0,0,0,0,0], bonusW2: 0, bonusW8: -1},
  { id: 23, name: '免費測量inbody', gender: 'male', points: 0.0, members: ['劉亞樵', '林佑淳'], weekly: [2,1,2,1,0,1], bonusW2: 4, bonusW8: -1},
  { id: 24, name: '體重 Maximum', gender: 'male', points: 0.0, members: ['梁勝傑', '黃思睿'], weekly: [2,2,1,1,2,2], bonusW2: 2, bonusW8: -1},
  { id: 25, name: '每塊肉都有名字', gender: 'male', points: 0.0, members: ['蕭孟杰', '張家齊'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 26, name: '有脂者事竟成', gender: 'male', points: 0.0, members: ['趙政建', '何品儒'], weekly: [2,2,2,2,2,2], bonusW2: 1, bonusW8: -1},
  { id: 27, name: '充肌冠軍', gender: 'male', points: 0.0, members: ['黃宏鈺', '李尚錡'], weekly: [1,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 28, name: '預測實現 年輕加倍', gender: 'male', points: 0.0, members: ['林慶文', '施孝承'], weekly: [2,2,2,1,2,1], bonusW2: 1, bonusW8: -1},
  { id: 29, name: '加薪1萬元', gender: 'male', points: 0.0, members: ['王庭翊', '廖晉楷'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1},
  { id: 30, name: '有創意的隊', gender: 'male', points: 0.0, members: ['王教昌', '陳俊凱'], weekly: [2,2,2,2,2,2], bonusW2: 4, bonusW8: -1}

];


// import { Team } from './types';

// export const SIGNUP_FORM_URL = 'https://forms.gle/example';
// export const GOOGLE_DRIVE_URL = 'https://drive.google.com/drive/folders/example';

// export const TEAMS_DATA: Team[] = [
//   { id: 1, members: ['OOO', 'OOO'], points: 0 },
//   { id: 2, members: ['OOO', 'OOO'], points: 0 },
//   { id: 3, members: ['OOO', 'OOO'], points: 0 },
//   { id: 4, members: ['OOO', 'OOO'], points: 0 },
//   { id: 5, members: ['OOO', 'OOO'], points: 0 },
//   { id: 6, members: ['OOO', 'OOO'], points: 0 },
//   { id: 7, members: ['OOO', 'OOO'], points: 0 },
//   { id: 8, members: ['OOO', 'OOO'], points: 0 },
//   { id: 9, members: ['OOO', 'OOO'], points: 0 },
//   { id: 10, members: ['OOO', 'OOO'], points: 0 },
// ];
