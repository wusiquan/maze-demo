import { GRID_DIRECTIONS } from './Constants'
import Grid from './Grid'
import { EventEmitter } from 'eventemitter3'

export default class Maze extends EventEmitter {
  grid
  algriothm

  rows: number
  cols: number
  tileSize: number

  constructor(rows, cols, tileSize, algriothm) {
    super()
    this.rows = rows
    this.cols = cols
    this.tileSize = tileSize
    this.grid = new Grid(this)
    
    this.algriothm = new algriothm(this)
  }

  coordsToPosition(row, col) {
    let tileSize = this.tileSize
    let x = col * tileSize
    let y = row * tileSize
    return new Phaser.Geom.Point(x, y)
  }

  /*
   * 将二维数组的行列坐标转为一维数组的索引
   * 可以给GameObjects.Container使用
   */
  coordsToIndex(row, col) {
    return col + row * this.cols 
  }

  randomGrid() {
    return {
      row: this.randomNumber(this.rows),
      col: this.randomNumber(this.cols)
    }
  }

  // [lowerValue, upperValue - 1]
  randomNumber(upperValue, lowerValue = 0) {
    return lowerValue + Math.floor(Math.random() * (upperValue - lowerValue))
  }
  
  shuffledDirections() {
    let directions = GRID_DIRECTIONS.LIST.slice()
    let lastIndex = directions.length - 1
    let index = 0

    while (index < lastIndex) {
      let randIndex = this.randomNumber(index, lastIndex + 1)

      let tmp = directions[randIndex]
      directions[randIndex] = directions[index]
      directions[index] = tmp

      index++
    }

    return directions
  }

  step() {
    return this.algriothm.step()
  }

  isNorthMarked(row, col) {
    return this.grid.isMarked(row, col, GRID_DIRECTIONS.N)
  }

  isEastMarked(row, col) {
    return this.grid.isMarked(row, col, GRID_DIRECTIONS.E)
  }

  isSouthMarked(row, col) {
    return this.grid.isMarked(row, col, GRID_DIRECTIONS.S)
  }

  isWestMarked(row, col) {
    return this.grid.isMarked(row, col, GRID_DIRECTIONS.W)
  }

  mark(row, col, bits) {
    this.grid.mark(row, col, bits)
  }

  clearMark(row, col, bits) {
    this.grid.clear(row, col, bits)
  }

  // 是否出边界
  isValid(row, col, boundary = [ 0, 0, -1, -1 ]) {
    if (row >= boundary[0] && row <= this.rows + boundary[2] && col >= boundary[1] && col <= this.cols + boundary[3]) {
      return true
    }

    return false
  }

  isWhite(row, col) {
    return this.grid.isWhite(row, col)
  }

  isInStack(row, col) {
    return this.grid.isGrey(row, col)
  }

  // =================================
  // GridAlgriothm 调用
  // =================================
  updateGrid(row, col) {
    this.emit('updateGrid', row, col)
  }

}