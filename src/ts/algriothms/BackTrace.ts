import { GRID_DIRECTIONS, GRID_VISIT_STATE } from '../Constants'
import MazeAlgriothm from '../MazeAlgriothm'

export default class BackTrace extends MazeAlgriothm {
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
  step() {
    if (this.runState == MazeAlgriothm.runState.START) {
      this.startStep()
    } else if (this.runState == MazeAlgriothm.runState.RUN) {
      this.runStep()
    }
    
    return this.runState !== MazeAlgriothm.runState.DONE
  }

  startStep() {
    let maze = this.maze
    let { rows, cols } = maze
    
    let grid = maze.randomGrid()
    grid.directions = maze.shuffledDirections()

    // 入栈 mark一下
    maze.mark(grid.row, grid.col, GRID_VISIT_STATE.GREY)
    this.stack.push(grid)
    maze.updateGrid(grid.row, grid.col)

    this.runState = MazeAlgriothm.runState.RUN
  }

  runStep() {
    let maze = this.maze
    let stack = this.stack
    let { row, col, directions } = stack[this.stack.length - 1]
    let direct = directions.pop()
    
    let nextRow = row + GRID_DIRECTIONS.DROW[direct]
    let nextCol = col + GRID_DIRECTIONS.DCOL[direct]

    if (maze.isValid(nextRow, nextCol)) {
      if (maze.isWhite(nextRow, nextCol)) {
        maze.mark(row, col, GRID_DIRECTIONS[direct])
        maze.mark(nextRow, nextCol, GRID_DIRECTIONS.OPPOSITE[direct])
        
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
}