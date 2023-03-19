import React from "react";
import PropTypes from "prop-types";

export default function Disk({ number }) {
  const MIN_WIDTH = 20;
  const INC_WIDTH = 25;

  const width = MIN_WIDTH + INC_WIDTH * number;

  return (
    <div className="Disk" style={{ width }}>
      {number}
    </div>
  );
}

Disk.propTypes = {
  number: PropTypes.number.isRequired,
};
