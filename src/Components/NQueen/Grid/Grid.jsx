import Node from "../Node/Node";
import "./Grid.css";

import React from "react";
import PropTypes from "prop-types";

const Grid = ({ grid, gridSize }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => {
              const { row, col } = node;

              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  row={row}
                  hasQueen={node.hasQueen}
                  isActive={node.isActive}
                  gridSize={gridSize}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  gridSize: PropTypes.number.isRequired,
};

export default Grid;
