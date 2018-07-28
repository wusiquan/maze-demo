export const GRID_DIRECTIONS = {
  N: 0x01,
  E: 0x02,
  S: 0x04,
  W: 0x08,
  LIST: ['N', 'E', 'S', 'W'],
  // 对应行变化
  DROW: { N: -1, E: 0, S: 1, W: 0 },
  // 对应列变换
  DCOL: { N: 0, E: 1, S: 0, W: -1 },
  OPPOSITE: { N: 0x04, E: 0x08, S: 0x01, W: 0x02 }
}

// NOTE: WHITE为0, 比较特殊, isWhite的时候直接判断看是否为0
export const GRID_VISIT_STATE = {
  WHITE: 0x0000,
  GREY: 0x0100,
  BLACK: 0x0200
}