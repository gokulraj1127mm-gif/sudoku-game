import React,{useState} from "react"

function SudokuBoard({board,setBoard,fixed}){

const [selected,setSelected]=useState(null)

const isValid=(row,col,val)=>{

for(let i=0;i<9;i++){

if(i!==col && board[row][i]==val) return false
if(i!==row && board[i][col]==val) return false

}

const sr=Math.floor(row/3)*3
const sc=Math.floor(col/3)*3

for(let i=0;i<3;i++)
for(let j=0;j<3;j++){

let r=sr+i
let c=sc+j

if((r!==row||c!==col)&&board[r][c]==val)
return false

}

return true
}

const change=(r,c,v)=>{

if(fixed[r][c]) return

if(v<1||v>9) v=""

let newBoard=[...board]

newBoard[r]=[...newBoard[r]]

newBoard[r][c]=v?parseInt(v):0

setBoard(newBoard)

}

return(

<div className="board">

{board.map((row,r)=>

row.map((cell,c)=>{

const invalid=cell!==0&&!isValid(r,c,cell)

return(

<input
key={`${r}-${c}`}
value={cell===0?"":cell}
onClick={()=>setSelected([r,c])}
onChange={(e)=>change(r,c,e.target.value)}
maxLength="1"

className={`cell 
${fixed[r][c]?"fixed":""}
${selected&&selected[0]===r&&selected[1]===c?"selected":""}
${invalid?"invalid":""}`}
/>

)

})

)}

</div>

)

}

export default SudokuBoard