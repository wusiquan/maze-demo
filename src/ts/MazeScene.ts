import { Scene, Utils } from 'phaser'
import Maze from './Maze'
import BackTracer from './algriothms/BackTracer'

export default class MazeScene extends Scene {
  maze
  tween
  styles
  graphics
  timerEvent

  constructor() {
    super({ key: 'MazeScene' })

    let maze = this.maze = new Maze(5, 5, BackTracer)

    this.styles = {
      blank: 0xcccccc,
      wall: 0x000000,
      instack: 0xffaaaa,
      outstack: 0xffffff
    }

    maze.on('updateGrid', (row, col) => {
      let g = this.graphics

      let color 
      
      if (maze.isInStack(row, col)) {
        color = this.styles.instack
      } else {
        color = this.styles.outstack
      }

      g.lineStyle(1, color, 1)
      g.fillStyle(color)
      this.drawCell(row, col, false)
    })
  }
  
  create() {
    this.drawMaze()

    this.timerEvent = this.time.addEvent({ delay: 50, callback: this.mazeStep, callbackScope: this, loop: true })
  }

  mazeStep() {
    // 
    if (this.maze.step()) {
      this.timerEvent.destroy()
    }
  }
  
  drawMaze() {
    let { rows, cols, tileSize } = this.maze

    let totalWidth = cols * tileSize

    let container = this.add.container(100, 100)
    let g = this.graphics = this.add.graphics()
    container.add(g)

    g.lineStyle(1, this.styles.wall, 1)
    g.fillStyle(this.styles.blank)
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.drawCell(row, col, true)
      }
    }
  }

  // TODO: 其实这里有一个问题，就是lineCap, lineJoin设置不了。。。
  // BitmapData? polygon?  ....
  drawCell(row, col, isInit) {
    let g = this.graphics
    let maze = this.maze
    let tileSize = maze.tileSize
    let point = this.maze.coordsToPosition(row, col)
    
    g.beginPath()

    // north
    if (isInit || maze.isNorthMarked(row, col)) {
      g.moveTo(point.x, point.y)
      g.lineTo(point.x + tileSize, point.y)
    }
    
    // east
    if (isInit || maze.isEastMarked(row, col)) {
      g.moveTo(point.x + tileSize, point.y)
      g.lineTo(point.x + tileSize, point.y + tileSize)
    }

    // south
    if (isInit || maze.isSouthMarked(row, col)) {
      g.moveTo(point.x, point.y + tileSize)
      g.lineTo(point.x + tileSize, point.y + tileSize)
    }

    // west
    if (isInit || maze.isWestMarked(row, col)) {
      g.moveTo(point.x, point.y)
      g.lineTo(point.x, point.y + tileSize)
    }

    g.strokePath()

    g.fillRect(point.x + 0.5, point.y + 0.5, tileSize - 1, tileSize - 1)
  }
}