import { GRID_DIRECTIONS } from '../Constants'
import MazeAlgriothm from './MazeAlgriothm'
import Util from '../Util'

/**
 * 不相交集合
 */
function makeSet(x) {
  x.p = null
  x.rank = 0
  return x
}

// 按秩合并
function union(x, y) {
  link(findSet(x), findSet(y))
}

function link(x, y) {
  if (x.rank > y.rank) {
    y.p = x
  } else {
    // == 随便所以可以随 < 时的情况
    x.p = y
    if (x.rank == y.rank) {
      y.rank = x.rank + 1
    }
  }
}

// 带路径压缩的findSet
function findSet(x) {
  if (x.p != null) {
    x.p = findSet(x.p)
  }

  let ret = x.p
  
  if (ret == null) {
    ret = x
  }

  return ret
}

export class MazeKruskal extends MazeAlgriothm {
  nodes
  edges

  constructor(maze) {
    super(maze)

    // 处理结点
    let nodes = this.nodes = []
    // 处理边
    // kruskal会选择依照权重最小的边排序
    // 而这里由于 随机生成迷宫 以及 边的权重均相等, 我们随机取边即可
    let edges = this.edges = []

    for (let y = 0; y < maze.rows; y++) {
      nodes[y] = []
      for (let x = 0; x < maze.cols; x++) {
        nodes[y].push(makeSet({ x, y }))
        if (x > 0) {
          edges.push({ x, y, direction: 'W' })
        }
        
        if (y > 0) {
          edges.push({ x, y, direction: 'N' })
        }
      }
    }
    
    Util.fisherYatesShuffle(edges)
  }

  connect(node1, node2, direction) {
    union(node1, node2)

    let maze = this.maze

    maze.mark(node1.y, node1.x, GRID_DIRECTIONS[direction])
    maze.mark(node2.y, node2.x, GRID_DIRECTIONS.OPPOSITE[direction])

    maze.updateGrid(node1.y, node1.x)
    maze.updateGrid(node2.y, node2.x)
  }
  
  step() {
    let edge = this.edges.pop()
    
    let nx = edge.x + GRID_DIRECTIONS.DCOL1[edge.direction]
    let ny = edge.y + GRID_DIRECTIONS.DROW1[edge.direction]
    
    let node1 = this.nodes[edge.y][edge.x]
    let node2 = this.nodes[ny][nx]
    
    if (findSet(node1) !== findSet(node2)) {
      this.connect(node1, node2, edge.direction)
    }

    return this.edges.length > 0
  }
}