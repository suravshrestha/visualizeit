import "./Node.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";

import React from "react";
import PropTypes from "prop-types";

const Node = ({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  clearBoard,
}) => {
  const extraClassName =
    isWall && !isStart && !isFinish ? "pathFinder-node-wall" : "";

  const additionalNodeColor = (isStart || isFinish) && "grey";

  const startArrowClickHandler = () => {
    console.log("first");
  };

  if (clearBoard) {
    document.getElementById(
      `pathFinder-node-${row}-${col}`
    ).className = `pathFinder-node ${extraClassName} ${additionalNodeColor}`;
  }

  return (
    <div
      id={`pathFinder-node-${row}-${col}`}
      className={`pathFinder-node ${extraClassName} ${additionalNodeColor}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      {isStart && (
        <KeyboardArrowRightIcon
          onClick={startArrowClickHandler}
          className="node-icon"
        />
      )}
      {isFinish && <AssistantPhotoIcon className="node-icon" />}
    </div>
  );
};

export default Node;

Node.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  isStart: PropTypes.bool.isRequired,
  isFinish: PropTypes.bool.isRequired,
  isWall: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  clearBoard: PropTypes.bool.isRequired,
};
