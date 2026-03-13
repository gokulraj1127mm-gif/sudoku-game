import React,{useState,useEffect} from "react"

function Timer(){

const [time,setTime]=useState(0)

useEffect(()=>{

const timer=setInterval(()=>{

setTime(t=>t+1)

},1000)

return()=>clearInterval(timer)

},[])

return(

<h3>Time: {time}s</h3>

)

}

export default Timer