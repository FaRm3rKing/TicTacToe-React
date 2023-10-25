import { useEffect, useState, useCallback } from "react";

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
    <div style={{display: "flex", flexDirection: "column", width:"90px", height:"90px"}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent:"center", alignItems:"center"}}>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(0)}
            >
                {move[0]}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(1)}
            >
                {move[1]}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(2)}
            >
                {move[2]}
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(3)}
            >
                {move[3]}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(4)}
            >
                {move[4]}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(5)}
            >
                {move[5]}
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(6)}
            >
                {move[6]}
            </div>
            <div style={{height: "30px", width: "30px",  textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(7)}
            >
                {move[7]}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={() => handleSquareClick(8)}
            >
                {move[8]}
            </div>
        </div>
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
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{marginRight: "20px"}}>
                <div> {
                    checkWinner(currentMove) ?
                    `Winner ${!xToMove ? 'X': 'O'}`
                    :
                    `Next to play: ${xToMove? "X": "O"}`
                    }
                </div> 

                <div>
                    <Board xToMove={xToMove} move={currentMove} onMove={onMove}/>
                </div>
            </div>
            <div>
                <ol>
                    {travelHistory}
                </ol>
            </div>
        </div>

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