import { useState } from "react";

function Square({onSquareClick, children}){
    return (
    <div className="flex justify-center items-center w-20 h-20 border border-black"
    onClick={onSquareClick}
    >
    {children}
    </div>
    )

}
function Board({move, xToMove, onMove}){
    function handleSquareClick(i){
        console.log(move)
        const newMove = move.slice() // copy move array to newMove

        // if there is a piece in the square we don't do anything
        // or if there is a winner already
        if (move[i] || checkWinner(move)){
            return 
        }
        // if there is no piece in that square create a new move
        else {
            newMove[i] = xToMove ? 'X' : 'O'
        }

        // then save it to history
        onMove(newMove)
    }
    return (
        <div className="grid grid-rows-3 grid-cols-3">
            <Square onSquareClick={() => {handleSquareClick(0)}}>{move[0]}</Square>
            <Square onSquareClick={() => {handleSquareClick(1)}}>{move[1]}</Square>
            <Square onSquareClick={() => {handleSquareClick(2)}}>{move[2]}</Square>
            <Square onSquareClick={() => {handleSquareClick(3)}}>{move[3]}</Square>
            <Square onSquareClick={() => {handleSquareClick(4)}}>{move[4]}</Square>
            <Square onSquareClick={() => {handleSquareClick(5)}}>{move[5]}</Square>
            <Square onSquareClick={() => {handleSquareClick(6)}}>{move[6]}</Square>
            <Square onSquareClick={() => {handleSquareClick(7)}}>{move[7]}</Square>
            <Square onSquareClick={() => {handleSquareClick(8)}}>{move[8]}</Square>
         </div>
    )

}



function Tictactoe() {
    const grid = Array(9).fill(null)
    const [player, setPlayer] = useState(0) // move counter
    const [history, setHistory] = useState([grid]) // history of moves | list of grids
    let currentMove = history[player]

    let xToMove = player % 2  === 0 

    function onMove(newMove){
        setHistory([...history.slice(0, player+1), newMove])
        setPlayer(player + 1)
        if (checkWinner(newMove)) {
            return
        }
    }
    function handleTravelHistory(index){
        setPlayer(index)
    }

    const travelHistory = history.map((value, index) => {
        return (
            <li key={index}>
            {index === 0 ? 
                <button onClick={() => handleTravelHistory(index)}>
                Go to game start
                </button>
            :
                <button onClick={() => handleTravelHistory(index)}>
                Go to move #{index}
                </button>
            }
            </li>
        )
      }
    )

    return (
        <>
        <h1 className="text-2xl">TicTacToe</h1>
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="h-60 w-60 border border-black">
                    <Board xToMove={xToMove} move={currentMove} onMove={onMove}/>
                </div>
                <div className="flex justify-center w-44 h-60 border border-black pt-2">
                    <ol className="list-decimal">
                        {travelHistory}
                    </ol>
                </div>
            </div>

            <div className="col-start-1 col-end-7 flex justify-center items-center border border-black"> 
                {
                checkWinner(currentMove) ?
                `Winner ${!xToMove ? 'X': 'O'}`
                :
                `Next to play: ${xToMove? "X": "O"}`
                }
            </div> 
        </div>
        </>

    )

}


export default Tictactoe



function checkWinner(move) {
    let match = false
    // check rows for matches
    for (let i=0; i < 7; i+=3){
        if (move[i] !== move[i+1] || !move[i+1]){
            continue
        }
        if (move[i+1] !== move[i+2]){
            continue
        }
        console.log('rows')
        match = true
    }
    // check columsn for matches
    for (let i=0; i < 3; i++){
        if (move[i] !== move[i+3] || !move[i+3]){
            continue
        }
        if (move[i+3] !== move[i+6]){
            continue
        }
        console.log('columns')
        match = true
    }

    // check for diagonals 
    if (move[4]){
        if (move[0] === move[4] && move[4] === move[8]){
            console.log('diagonal1')
            match = true
        } else if (move[2] === move[4] && move[4] === move[6]) {
            console.log('diagonal2')
            match = true
        }
    }

    return match
}