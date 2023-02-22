import "./TowerOfHanoi.css";

import Tower from "./components/Tower";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

import { useState, useEffect } from "react";

const DEFAULT_RING_COUNT = 3;
const MIN_RING_COUNT = 2;
const MAX_RING_COUNT = 7;

const DEFAULT_SPEED = 3;
const MIN_SPEED = 1;
const MAX_SPEED = 10;

let timers = [];

function TowerOfHanoi() {
  useEffect(() => {
    document.title = "Tower of Hanoi";
  }, []);

  const [diskCount, setDiskCount] = useState(DEFAULT_RING_COUNT);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const [tower0, setTower0] = useState(
    Array.from({ length: diskCount }, (_, k) => diskCount - k)
  );
  const [tower1, setTower1] = useState([]);
  const [tower2, setTower2] = useState([]);

  const towers = [tower0, tower1, tower2];

  // Calculate moves required to solve Tower of Hanoi puzzle, and then
  // apply the moves to the Disk components.
  const solveHanoi = (n) => {
    let moves = [];
    const _solveHanoi = (n, from, to, spare) => {
      if (n < 1) {
        return;
      }
      if (n === 1) {
        const move = [from, to];
        moves.push(move);
      } else {
        _solveHanoi(n - 1, from, spare, to);
        _solveHanoi(1, from, to, spare);
        _solveHanoi(n - 1, spare, to, from);
      }
    };
    _solveHanoi(n, 0, 2, 1);

    // Timer is kept track of in order to allow user to cancel visualization
    // at any time by cleadisk all timers and resetting to original state.
    let timer;
    moves.forEach((move, i) => {
      timer = setTimeout(
        () => moveDisk(move[0], move[1]),
        (1 + i) * (100 + 1000 / speed)
      );
      timers.push(timer);
    });
  };

  // Move a disk from one tower to another. The last element of the
  // tower's array represents the top disk on the tower.
  const moveDisk = (from, to) => {
    if (from < 0 || from > 2 || to < 0 || to > 2 || from === to) {
      throw new Error(`Invalid disks: ${from}, ${to}`);
    }

    const movingDisk = towers[from][towers[from].length - 1];
    towers[from] = towers[from].slice(0, towers[from].length - 1);
    towers[to].push(movingDisk);

    updateTowersState();
  };

  const updateTowersState = () => {
    setTower0(towers[0]);
    setTower1(towers[1]);
    setTower2(towers[2]);
  };

  const reset = () => {
    resetInputs();
    resetTowers();
  };

  const resetTowers = () => {
    for (let i = 0; i < timers.length; i++) {
      clearTimeout(timers[i]);
    }

    towers[0] = Array.from({ length: diskCount }, (_, k) => diskCount - k);
    towers[1] = [];
    towers[2] = [];
    updateTowersState();
  };

  const resetInputs = () => {
    setDiskCount(DEFAULT_RING_COUNT);
    setSpeed(DEFAULT_SPEED);
  };

  const onDiskCountChange = (e) => {
    if (e.target.value < MIN_RING_COUNT) {
      e.target.value = MIN_RING_COUNT;
    }

    if (e.target.value > MAX_RING_COUNT) {
      e.target.value = MAX_RING_COUNT;
    }

    setDiskCount(e.target.value);
    resetTowers();
  };

  const onSpeedChange = (e) => {
    e.target.value && setSpeed(e.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      align="center"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Card
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 1,
          textAlign: "center",
          width: "850px",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.6rem",
            marginBottom: 5,
            marginX: "auto",
            color: "white",
            backgroundColor: "black",
            borderRadius: "1rem",
            padding: "1rem",
            width: "fit-content",
          }}
        >
          Tower of Hanoi
        </Typography>

        <div className="tower-container">
          <Tower disks={tower0} />
          <Tower disks={tower1} />
          <Tower disks={tower2} />
        </div>

        <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Number of disks:{" "}
          <input
            type="number"
            min={MIN_RING_COUNT}
            max={MAX_RING_COUNT}
            value={diskCount}
            onChange={onDiskCountChange}
            onBlur={onDiskCountChange}
            onClick={onDiskCountChange}
            style={{
              width: "45px",
              fontSize: "1.2rem",
              padding: "0.1rem",
              marginBottom: "0.5rem",
              borderRadius: "0.3rem",
              textAlign: "center",
            }}
          />
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginRight: "1rem",
              marginBottom: "1rem",
            }}
          >
            Speed:{" "}
          </Typography>

          <Slider
            aria-label="Visualization Speed"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={MIN_SPEED}
            max={MAX_SPEED}
            value={parseInt(speed)}
            onChange={onSpeedChange}
            onBlur={onSpeedChange}
            onClick={onSpeedChange}
            sx={{
              width: "250px",
              color: "black",
            }}
          />
        </div>

        <div>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#101010",
              marginRight: "0.5rem",

              ":hover": {
                backgroundColor: "#101010",
              },
            }}
            onClick={() => solveHanoi(tower0.length)}
          >
            Solve
          </Button>

          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#101010",

              ":hover": {
                backgroundColor: "#101010",
              },
            }}
            onClick={reset}
          >
            Reset
          </Button>
        </div>
      </Card>
    </Grid>
  );
}

export default TowerOfHanoi;
