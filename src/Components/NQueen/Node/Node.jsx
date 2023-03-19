import "./Node.css";
import queen from "../../../assets/images/queen.png";

import React from "react";
import PropTypes from "prop-types";

const Node = ({ col, row, hasQueen, isActive, gridSize }) => {
  const white = (row + col) % 2 == 0 && "white";
  const black = (row + col) % 2 != 0 && "black";
  let nodeSize = 48 / gridSize;
  let queenImageSize = 48 / gridSize - 2.5;

  return (
    <div
      id={`${row}-${col}`}
      className={`node ${isActive && "queenNode_active"} ${
        isActive && hasQueen && "queenNode_hasQueen"
      } ${black} ${white}`}
      style={{ width: `${nodeSize}rem`, height: `${nodeSize}rem` }}
    >
      {hasQueen && (
        <img
          style={{
            width: `${queenImageSize}rem`,
            height: `${queenImageSize}rem - 0rem`,
          }}
          src={queen}
        ></img>
      )}
    </div>
  );
};

Node.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  hasQueen: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  gridSize: PropTypes.number.isRequired,
};

export default Node;
