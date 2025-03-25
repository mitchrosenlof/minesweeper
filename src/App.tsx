import React from "react";
import "./App.css";
import { N_ROWS, N_COLS } from "./constants";
import Board from "./board";

function App() {
  return (
    <>
      <Board nRows={N_ROWS} nCols={N_COLS} nMines={50} />
    </>
  );
}

export default App;
