function generateSudoku() {
  const board = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0)
  );

  // fill diagonal boxes
  for (let i = 0; i < 9; i += 3) {
    fillBox(board, i, i);
  }

  return board;
}

function fillBox(board, row, col) {
  let nums = shuffle([1,2,3,4,5,6,7,8,9]);

  let k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[row+i][col+j] = nums[k++];
    }
  }
}

function shuffle(arr) {
  for (let i = arr.length-1;i>0;i--) {
    const j = Math.floor(Math.random()* (i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

module.exports = { generateSudoku };