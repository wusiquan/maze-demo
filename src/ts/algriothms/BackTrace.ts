import { GRID_DIRECTIONS, GRID_VISIT_STATE } from '../Constants'
import MazeAlgriothm from '../MazeAlgriothm'

abstract class AbstractBackTrace extends MazeAlgriothm {
  stack = []
  runState

  constructor(maze) {
    super(maze)

    this.runState = MazeAlgriothm.runState.START
  }

  /*
   * 单步运行 
   * @return 是否执行了单步
   *         状态非DONE, 返回true, 表示执行了单步  状态DONE, 返回false, 表示没有执行单步
   */
  protected step() {
    if (this.runState == MazeAlgriothm.runState.START) {
      this.startStep()
    } else if (this.runState == MazeAlgriothm.runState.RUN) {
      this.runStep()
    }
    
    return this.runState !== MazeAlgriothm.runState.DONE
  }

  protected startStep() {
    let maze = this.maze

    let grid = this.getFirstGrid()

    // 为grid添加directions数组顺序随机
    grid.directions = maze.shuffledDirections()

    // 入栈 mark一下
    maze.mark(grid.row, grid.col, GRID_VISIT_STATE.GREY)
    this.stack.push(grid)

    maze.updateGrid(grid.row, grid.col)

    // 更改运行状态
    this.runState = MazeAlgriothm.runState.RUN
  }

  protected runStep() {
    let maze = this.maze
    let stack = this.stack
    let { row, col, directions } = stack[this.stack.length - 1]
    let direct = directions.pop()
    let { nextRow, nextCol } = this.calNextRowCol(row, col, direct)

    if (this.isValid(nextRow, nextCol)) {
      if (maze.isWhite(nextRow, nextCol)) {
        this.maze.mark(row, col, GRID_DIRECTIONS[direct])
        this.maze.mark(nextRow, nextCol, GRID_DIRECTIONS.OPPOSITE[direct])
        
        // 入栈 mark一下
        maze.mark(nextRow, nextCol, GRID_VISIT_STATE.GREY)
        this.stack.push({ row: nextRow, col: nextCol, directions: maze.shuffledDirections() })

        maze.updateGrid(nextRow, nextCol)
        return
      }
    }
    
    if (directions.length === 0) {
      // 出栈 clearmark, 再mark一下
      maze.clearMark(row, col, GRID_VISIT_STATE.GREY)
      maze.mark(row, col, GRID_VISIT_STATE.BLACK)
      this.stack.pop()
      maze.updateGrid(row, col)
    }

    if (stack.length === 0) {
      this.runState = MazeAlgriothm.runState.DONE
    }
  }

  protected abstract getFirstGrid()
  protected abstract calNextRowCol(row, col, direct)
  protected abstract isValid(nextRow, nextCol)
}

export class MazeBackTrace extends AbstractBackTrace {

  constructor(maze) {
    super(maze)
  }

  getFirstGrid() {
    return this.maze.randomGrid()
  }

  calNextRowCol(row, col, direct) {
    return {
      nextRow: row + GRID_DIRECTIONS.DROW1[direct],
      nextCol: col + GRID_DIRECTIONS.DCOL1[direct]
    }
  }

  isValid(nextRow, nextCol) {
    return this.maze.isValid(nextRow, nextCol)
  }
}

export class DungeonBackTrace extends AbstractBackTrace {

  constructor(maze) {
    super(maze)
  }

  getFirstGrid() {
    // 为了让地图四周墙壁始终保留，不能随便取
    // 地图宽21, 高21, 这里直接点就取1, 1
    return {
      row: 1,
      col: 1
    }
  }

  calNextRowCol(row, col, direct) {
    return {
      nextRow: row + GRID_DIRECTIONS.DROW2[direct],
      nextCol: col + GRID_DIRECTIONS.DCOL2[direct]
    }
  }

  isValid(nextRow, nextCol) {
    return this.maze.isValid(nextRow, nextCol, [1, 1, -2, -2])
  }
}