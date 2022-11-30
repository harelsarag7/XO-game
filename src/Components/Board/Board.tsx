import { useEffect, useState } from "react";
import "./Board.css";
import Cell from "./Cell/Cell";


export interface boardProps {
    index: string,
    inside: string
}
function Board(): JSX.Element {
    
    const [cells, setCells] = useState<boardProps[]>(   [ {
        index: "1",
        inside: "",
    },
    {
        index: "2",
        inside: "",
    },
    {
        index: "3",
        inside: "",
    },
    {
        index: "4",
        inside: "",
    },
    {
        index: "5",
        inside: "",
    },
    {
        index: "6",
        inside: "",
    },
    {
        index: "7",
        inside: "",
    },
    {
        index: "8",
        inside: "",
    },
    {
        index: "9",
        inside: "",
    }])
    const [trying, setTrying] = useState<boolean>(false)
    const [winner, setWinner] = useState<string | undefined>(undefined)
    const [draw, setDraw] = useState<string | undefined>(undefined)
    const [turn, setTurn] = useState<boolean>(false)

    function loopTry() {
        for (const cell of cells) {
            console.log(cell.index + " - " + cell.inside );
        }
    }

    function ComputerTurn(){
            if(winner){
                return;
            } 
            if(draw){
                return;
            }
            setTimeout(() => {
                let notClicked: any = cells.filter(element => element.inside === '');
                console.log(notClicked);
                
                let i = Math.floor(Math.random() * notClicked.length);
                notClicked[i].inside = 'O';
          
                setCells([...cells]);
                
                checkIfWinRowComputer()
                checkIfWinColComputer()
                checkIfWinDiagComputer()
                checkIfDraw()
                
                setTurn(false)
                setTrying(!trying);
              }, 500)
        }

    function checkIfDraw(){
        for (const cell of cells) {
            if(cell.inside === ""){
                return
            };
        }
        if(winner){
            return
        }
                if(!winner){
                    console.log("draw");
                    setDraw("Draw")
                    return
                }
    }

    function checkIfWinRow() {
        if(cells[0].inside == "X" && cells[1].inside == "X" && cells[2].inside == "X"){
                setWinner("User")
            return

        } else if (cells[3].inside == "X" && cells[4].inside == "X" && cells[5].inside == "X"){
            setWinner("User")
            return

        } else if (cells[6].inside == "X" && cells[7].inside == "X" && cells[8].inside == "X"){
            setWinner("User")
            return

        }
    }

    function checkIfWinCol() {
        if(cells[0].inside == "X" && cells[3].inside == "X" && cells[6].inside == "X"){
            setWinner("User")
            return

        } else if (cells[1].inside == "X" && cells[4].inside == "X" && cells[7].inside == "X"){
            setWinner("User")
            return

        } else if (cells[2].inside == "X" && cells[5].inside == "X" && cells[8].inside == "X"){
            setWinner("User")
            return

        }
    }

    function checkIfWinDiag() {
        if(cells[0].inside == "X" && cells[4].inside == "X" && cells[8].inside == "X"){
            setWinner("User")
            return

        } else if (cells[2].inside == "X" && cells[4].inside == "X" && cells[6].inside == "X"){
            setWinner("User")
            return

        } 
    }

    function checkIfWinRowComputer() {
        if(cells[0].inside == "O" && cells[1].inside == "O" && cells[2].inside == "O"){
            setWinner("Computer")
            return

        } else if (cells[3].inside == "O" && cells[4].inside == "O" && cells[5].inside == "O"){
            setWinner("Computer")
            return

        } else if (cells[6].inside == "O" && cells[7].inside == "O" && cells[8].inside == "O"){
            setWinner("Computer")
            return

        }
    }

    function checkIfWinColComputer() {
        if(cells[0].inside == "O" && cells[3].inside == "O" && cells[6].inside == "O"){
            setWinner("Computer")
            return
        } else if (cells[1].inside == "O" && cells[4].inside == "O" && cells[7].inside == "O"){
            setWinner("Computer")
            return

        } else if (cells[2].inside == "O" && cells[5].inside == "O" && cells[8].inside == "O"){
            setWinner("Computer")
            return

        }
    }

    function checkIfWinDiagComputer() {
        if(cells[0].inside == "O" && cells[4].inside == "O" && cells[8].inside == "O"){
            setWinner("Computer")
            return

        } else if (cells[2].inside == "O" && cells[4].inside == "O" && cells[6].inside == "O"){
            setWinner("Computer")
            return

        } 
    }


    function tryPutInside(e: any) {
        if(winner){
            return;
        }
        if(turn){
            return
        }
        setTurn(true)
            
            const index = Number(e.target.id) - 1;
            if(cells[index].inside === ""){
                console.log(index);
                cells[index].inside = "X"

                    checkIfWinRow()
                    checkIfWinCol()
                    checkIfWinDiag()
                
                    if(!winner){
                        checkIfDraw()
                    }
                    
                    setCells([...cells])
                    setTrying(!trying)

                    ComputerTurn()
                } else {
                    return
                }
    }

    function resetGame(){
        setWinner(undefined);
        setDraw(undefined);
        setTurn(false)
        for (const cell of cells) {
            cell.inside = "";
        }
        setTrying(!trying)
    }
    useEffect(() => {
        loopTry()

    }, [cells, trying])
    return (
        <div className="Board">
			{/* Board */}
            {/* <Cell/> */}
            {/* {winner? cells.map((cell) => 
                 <Cell  key={cell.index} clickedCell={(e: any) => tryPutInside(e)} sign={cell.index} init={cell.inside} />
                 ) : <></>}             */}
            <br/><br/><br/>
            <div className="board">
                 {cells.map((cell) => 
                 <Cell key={cell.index} clickedCell={(e: any) => tryPutInside(e)} sign={cell.index} init={cell.inside} />
                 )}
            {winner? <div className="winner"> Winner is: {winner} </div> : draw? <div className="winner">Draw </div> : <></>}
                 </div>
                 <button onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default Board;
