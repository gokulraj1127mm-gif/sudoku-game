function generateSudoku(level="easy"){

let board=Array.from({length:9},()=>Array(9).fill(0))

fillDiagonal(board)

solve(board)

let solution=board.map(r=>[...r])

removeCells(board,level)

return board
}

function fillDiagonal(board){

for(let i=0;i<9;i+=3)
fillBox(board,i,i)

}

function fillBox(board,row,col){

let nums=[1,2,3,4,5,6,7,8,9]

shuffle(nums)

let k=0

for(let i=0;i<3;i++)
for(let j=0;j<3;j++)
board[row+i][col+j]=nums[k++]

}

function shuffle(arr){

for(let i=arr.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))

let temp=arr[i]

arr[i]=arr[j]

arr[j]=temp

}

}

function isSafe(board,row,col,num){

for(let x=0;x<9;x++){

if(board[row][x]==num) return false

if(board[x][col]==num) return false

}

let startRow=row-row%3
let startCol=col-col%3

for(let i=0;i<3;i++)
for(let j=0;j<3;j++)
if(board[i+startRow][j+startCol]==num)
return false

return true
}

function solve(board){

for(let row=0;row<9;row++){

for(let col=0;col<9;col++){

if(board[row][col]==0){

for(let num=1;num<=9;num++){

if(isSafe(board,row,col,num)){

board[row][col]=num

if(solve(board)) return true

board[row][col]=0

}

}

return false

}

}

}

return true
}

function removeCells(board,level){

let remove

if(level==="easy") remove=35
else if(level==="medium") remove=45
else remove=55

while(remove>0){

let r=Math.floor(Math.random()*9)
let c=Math.floor(Math.random()*9)

if(board[r][c]!=0){

board[r][c]=0
remove--

}

}

}

module.exports={generateSudoku}