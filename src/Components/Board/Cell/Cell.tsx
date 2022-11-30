import { useEffect, useState } from "react";
import "./Cell.css";

function Cell( { sign,clickedCell, init } : any): JSX.Element {
    // const [xO, setXO] = useState<string>(init)

    return (
        <div id={sign}   className="Cell" onClick={(e) => clickedCell(e)}>
			{/* {sign} */}
            {init}
            {/* {init} */}
        </div>
    );
}

export default Cell;
