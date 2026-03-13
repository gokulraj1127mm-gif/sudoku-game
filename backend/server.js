const express = require("express");
const cors = require("cors");

const { generateSudoku } = require("./sudokuGenerator");

const app = express();

// Allow requests from any origin
app.use(cors());

app.get("/api/sudoku", (req, res) => {
  const level = req.query.level || "easy";
  const puzzle = generateSudoku(level);
  res.json(puzzle);
});

// Use Render’s PORT or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});