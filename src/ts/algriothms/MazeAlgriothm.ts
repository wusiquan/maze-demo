export default abstract class MazeAlgrothm {
  maze

  static runState = {
    START: 1,
    RUN: 2,
    DONE: 3
  }

  constructor(maze) {
    this.maze = maze
  }
}


