import React, { Component } from "react";
import Node from "../../Components/PathFinder/Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/dijkstra";
import { useState } from "react";
import { useEffect } from "react";
import Astar from "./Algorithms/astar";
import "./PathFinder.css";
import Navbar from "../../Components/Navbar/Navbar";
import mazeJava from "./Algorithms/mazeJava";
import mazeRecursive from "./Algorithms/mazeRecursive";

const rows = 13;
const cols = 35;
const START_NODE_ROW = 2;
const START_NODE_COL = 2;
const FINISH_NODE_ROW = 12;
const FINISH_NODE_COL = 22;

const PathFinder = () => {
  const [maze, setMaze] = useState(false);
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const addNeighbors = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
  };

  const createNode = (row, col) => {
    return {
      col, //j
      row, //i
      g: 0,
      f: 0,
      h: 0,
      isCurrent: false,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isMazeVisited: false,
      isVisited: false,
      isWall: false,
      previousNode: null,
      neighbors: [],
      addNeighbors(grid) {
        let i = row;
        let j = col;
        if (i > 0) this.neighbors.push(grid[i - 1][j]);
        if (i < rows - 1) this.neighbors.push(grid[i + 1][j]);
        if (j > 0) this.neighbors.push(grid[i][j - 1]);
        if (j < cols - 1) this.neighbors.push(grid[i][j + 1]);
      },
      checkNeighbors(grid) {
        // for maze
        let neighbor = [];

        let i = row;
        let j = col;

        if (j > 0) {
          let top = grid[i][j - 1];
          if (top && !top.isMazeVisited) neighbor.push(top);
        }
        if (i < rows - 1) {
          let right = grid[i + 1][j];
          if (right && !right.isMazeVisited) neighbor.push(right);
        }
        if (j < cols - 1) {
          let bottom = grid[i][j + 1];
          if (bottom && !bottom.isMazeVisited) neighbor.push(bottom);
        }
        if (i > 0) {
          let left = grid[i - 1][j];
          if (left && !left.isMazeVisited) neighbor.push(left);
        }

        if (neighbor.length > 0) {
          // picking up random neighbor
          let r = Math.floor(Math.random(0, neighbor.length));
          return neighbor[r];
        } else {
          return undefined;
        }
      },
    };
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(
          `pathFinder-node-${node.row}-${node.col}`
        ).className = "pathFinder-node pathFinder-node-visited";
      }, 10 * i);
    }
  };

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(
          `pathFinder-node-${node.row}-${node.col}`
        ).className = "pathFinder-node pathFinder-node-shortest-path";
      }, 10 * i);
    }
  };
  const visualizePath = (visitedNodes, path) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(
            `pathFinder-node-${node.row}-${node.col}`
          ).className = "pathFinder-node pathFinder-node-visited";
        }, 20 * i);
      }
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(
          `pathFinder-node-${node.row}-${node.col}`
        ).className = "pathFinder-node pathFinder-node-shortest-path";
      }, 50 * i);
    }
  };

  const createMaze = (e) => {
    const grid = getInitialGrid();
    let current = grid[0][0];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i % 2 != 0 || j % 2 != 0) {
          grid[i][j].isWall = true;
          grid[i][j].isMazeVisited = true;
        }
      }
    }
    setGrid(grid);
    const newGrid = mazeRecursive(grid, current, rows, cols);

    setMaze((prev) => !prev);
  };
  const createPrimMaze = (e) => {
    const grid = getInitialGrid();
    let current = grid[0][0];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].isWall = true;
      }
    }
    setGrid(grid);
    const newGrid = mazeJava(grid, current, rows, cols);

    setGrid(newGrid);
    setMaze((prev) => !prev);
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // addNeighbors(grid);

    // const out = Astar(grid, startNode, finishNode);
    // const nodesInShortestPathOrder = out.path;
    // const visitedNodesInOrder = out.visitedNodes;
    // visualizePath(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="pathFinder">
      <Navbar />
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => createMaze()}>Create Maze</button>
      <div className="pathFinder-grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="pathFinder-grid-row">
              {row.map((node, nodeIdx) => {
                const {
                  row,
                  col,
                  isEnd,
                  isStart,
                  isWall,
                  isMazeVisited,
                  isCurrent,
                } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isEnd}
                    isStart={isStart}
                    isCurrent={isCurrent}
                    isMazeVisited={isMazeVisited}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathFinder;
