import React, { useState, useEffect } from "react";
import axios from "axios";

import SudokuBoard from "./components/SudokuBoard";
import Timer from "./components/Timer";

import "./App.css";

// Use .env variable for backend URL
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [board, setBoard] = useState([]);
  const [original, setOriginal] = useState([]);
  const [fixed, setFixed] = useState([]);
  const [level, setLevel] = useState("easy");

  // Fetch new game from backend
  const newGame = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/sudoku?level=${level}`);
      setBoard(res.data);
      setOriginal(res.data);
      setFixed(res.data.map((row) => row.map((cell) => cell !== 0)));
    } catch (err) {
      console.error("Error fetching Sudoku:", err);
    }
  };

  const reset = () => setBoard(original);

  useEffect(() => {
    newGame();
  }, [level]);

  // Check if Sudoku is solved
  const checkSudoku = () => {
    // check rows
    for (let i = 0; i < 9; i++) {
      let set = new Set(board[i]);
      if (set.size !== 9 || set.has(0)) {
        alert("Sudoku not solved correctly ❌");
        return;
      }
    }

    // check columns
    for (let col = 0; col < 9; col++) {
      let set = new Set();
      for (let row = 0; row < 9; row++) set.add(board[row][col]);
      if (set.size !== 9) {
        alert("Sudoku not solved correctly ❌");
        return;
      }
    }

    // check 3x3 boxes
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        let set = new Set();
        for (let i = 0; i < 3; i++)
          for (let j = 0; j < 3; j++) set.add(board[row + i][col + j]);
        if (set.size !== 9) {
          alert("Sudoku not solved correctly ❌");
          return;
        }
      }
    }

    alert("🎉 Congratulations! Sudoku solved!");
    newGame();
  };

  return (
    <div className="app">
      <h1>🧩 Sudoku Pro</h1>
      <Timer />

      <select onChange={(e) => setLevel(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <SudokuBoard board={board} setBoard={setBoard} fixed={fixed} />

      <div className="buttons">
        <button onClick={newGame}>New Game</button>
        <button onClick={reset}>Reset</button>
        <button onClick={checkSudoku}>Check</button>
      </div>
    </div>
  );
}

export default App;