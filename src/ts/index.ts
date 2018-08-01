/// <reference path="../../types/interfaces.d.ts" />
import '../styl/index.styl'

import { Game } from 'phaser'
import MazeScene from './MazeScene'
import DungeonScene from './DungeonScene'

export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'maze-container',
  width: 800,
  height: 800,
  scene: [ DungeonScene, MazeScene ],
  transparent: true
}

class App {
  constructor() {
    let game = new Game(gameConfig)
    // game.scene.add('MazeScene', MazeScene)
    // game.scene.add('DungeonScene', DungeonScene, true)
  }
}

new App()