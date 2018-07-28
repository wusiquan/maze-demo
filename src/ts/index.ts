/// <reference path="../../types/interfaces.d.ts" />
import '../styl/index.styl'

import { Game } from 'phaser'
import MazeScene from './MazeScene'

export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'maze-container',
  width: 640,
  height: 800,
  transparent: true
}

class App {
  constructor() {
    let game = new Game(gameConfig)
    game.scene.add('Game', MazeScene, true)
  }
}

new App()