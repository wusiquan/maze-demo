import { GRID_DIRECTIONS, GRID_VISIT_STATE } from '../Constants'
import MazeAlgriothm from './MazeAlgriothm'
import Util from '../Util'

export class MazeBinaryTree extends MazeAlgriothm {
  row: number
  col: number
  runState

  constructor(maze) {
    super(maze)

    // 有几种选择
    // 西北
    // 东北
    // 西南
    // 东南

    // 第一个选取的
    this.row = 0
    this.col = 0

    this.runState = MazeAlgriothm.runState.START
  }

  step() {
    let { row, col, maze } = this
    let { rows, cols } = maze

    // 选择东南方向
    let directions = []
    
    if (col + 1 < cols) {
      directions.push('E')
    }

    if (row + 1 < rows) {
      directions.push('S')
    }

    let direction =  Util.getRandomOneItem(directions)

    if (direction) {
      let nextRow = row + GRID_DIRECTIONS.DROW1[direction]
      let nextCol = col + GRID_DIRECTIONS.DCOL1[direction]

      maze.mark(row, col, GRID_DIRECTIONS[direction])
      maze.mark(nextRow, nextCol, GRID_DIRECTIONS.OPPOSITE[direction])
    } else {
      // 貌似只有最后一个会调用这里
    }

    maze.updateGrid(row, col)
    
    this.col++
    if (this.col == maze.cols) {
      this.col = 0
      this.row++
    }

    if (this.row == maze.rows) {
      this.runState = MazeAlgriothm.runState.DONE
    }

    return this.runState !== MazeAlgriothm.runState.DONE
  }
}