import React from "react";

function NumberPad({setNumber}){

return(

<div className="number-pad">

{[1,2,3,4,5,6,7,8,9].map(n=>(

<button
key={n}
onClick={()=>setNumber(n)}
>
{n}
</button>

))}

</div>

);

}

export default NumberPad;