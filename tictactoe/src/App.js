import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./App.css";

import { fieldUrl, moveUrl, resetUrl } from "./constants";

const App = () => {
  const [winner, setWinner] = useState("");
  const [field, setField] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const updateField = function () {
    axios.get(fieldUrl).then(({ data }) => {
      if (!data.map((arr) => arr.includes(0)).includes(true)) setWinner("Draw");
      setField(data);
    });
  };

  const handleReset = () => {
    axios.post(resetUrl).then(updateField);
    setWinner("");
  };

  const handleMove = (x, y) => () => {
    if (winner.length > 0) return;
    axios
      .post(moveUrl, {
        x: x + 1,
        y: y + 1,
      })
      .then(({ data }) =>
        data === "success"
          ? setWinner("")
          : setWinner(`Winner is player ${data.winner}`)
      )
      .then(updateField);
  };

  useEffect(() => {
    updateField();
    setInterval(updateField, 2000);
  }, []);

  const showCell = function (value) {
    if (!value) return;
    return <i>{value === 1 ? "x" : "o"}</i>;
  };

  return (
    <Fragment>
      {winner.length > 0 && <p className="winner">{winner}</p>}
      <div className="field">
        {field.map((row, y) =>
          row.map((el, x) => (
            <div
              className="cell"
              key={`${x}-${y}`}
              data-x={x}
              data-y={y}
              onClick={handleMove(x, y)}
            >
              {showCell(el)}
            </div>
          ))
        )}
      </div>
      <button className="btn" onClick={handleReset}>
        Reset
      </button>
    </Fragment>
  );
};

export default App;
