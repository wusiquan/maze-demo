import { Scene, GameObjects, Time } from 'phaser'
import Maze from './Maze'
import { DungeonBackTrace } from './algriothms/BackTrace'

export default class DungeonScene extends Scene {
  container: GameObjects.Container
  maze: Maze
  timerEvent: Time.TimerEvent

  constructor() {
    super({ key: 'DungeonScene' })
  }

  init() {
    // 注意这里21很有必要
    let maze = this.maze = new Maze(21, 21, 32, DungeonBackTrace)

    maze.on('updateGrid', (row, col) => {
      this.updateCellFrame(row, col)
    })
  }

  preload() {
    this.load.spritesheet('tiles', 'assets/tiles.png', { frameWidth: 32, frameHeight: 32, endFrame: 19 })
  }

  create() {
    this.drawMaze()

    this.timerEvent = this.time.addEvent({ delay: 50, callback: this.mazeStep, callbackScope: this, loop: true })
  }

  mazeStep() {
    if (!this.maze.step()) {
      this.timerEvent.destroy()
    }
  }
  
  drawMaze() {
    let { rows, cols, tileSize } = this.maze
    this.container = this.add.container(100, 100)

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        this.drawCell(r, c)
      }
    }
  }

  drawCell(row, col) {
    let point = this.maze.coordsToPosition(row, col)
    let tile = this.add.sprite(point.x, point.y, 'tiles', 19)
    this.container.add(tile)
  }

  updateCellFrame(row, col) {
    let maze = this.maze
    let tile = (<GameObjects.Sprite>this.container.getAt(maze.coordsToIndex(row, col)))
    tile.setFrame(0)
    
    if (maze.isNorthMarked(row, col)) {
      tile = (<GameObjects.Sprite>this.container.getAt(maze.coordsToIndex(row - 1, col)))
      tile.setFrame(0)
    }

    if (maze.isEastMarked(row, col)) {
      tile = (<GameObjects.Sprite>this.container.getAt(maze.coordsToIndex(row, col + 1)))
      tile.setFrame(0)
    }

    if (maze.isSouthMarked(row, col)) {
      tile = (<GameObjects.Sprite>this.container.getAt(maze.coordsToIndex(row + 1, col)))
      tile.setFrame(0)
    }

    if (maze.isWestMarked(row, col)) {
      tile = (<GameObjects.Sprite>this.container.getAt(maze.coordsToIndex(row, col - 1)))
      tile.setFrame(0)
    }
  }
}