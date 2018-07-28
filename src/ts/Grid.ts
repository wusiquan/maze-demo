import { GRID_VISIT_STATE } from './Constants'

export default class Grid {
  data

  constructor(maze) {
    let { rows, cols } = maze
    let data = this.data = []

    for (let i = 0; i < rows; i++) {
      data[i] = []

      for (let j = 0; j < cols; j++) {
        this.data[i][j] = GRID_VISIT_STATE.WHITE
      }
    }
  }

  at(row, col) {
    return this.data[row][col]
  }

  mark(row, col, bits) {
    this.data[row][col] |= bits
  }

  clear(row, col, bits) {
    this.data[row][col] &= ~bits
  }

  isMarked(row, col, bits) {
    return (this.data[row][col] & bits) === bits
  }
  
  isWhite(row, col) {
    return this.data[row][col] === GRID_VISIT_STATE.WHITE
  }

  isGrey(row, col) {
    return this.isMarked(row, col, GRID_VISIT_STATE.GREY)
  }
}