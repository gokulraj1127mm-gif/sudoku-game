const express=require("express")
const cors=require("cors")

const {generateSudoku}=require("./sudokuGenerator")

const app=express()

app.use(cors())

app.get("/api/sudoku",(req,res)=>{

const level=req.query.level || "easy"

const puzzle=generateSudoku(level)

res.json(puzzle)

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})