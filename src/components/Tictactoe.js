import { useEffect, useState, useCallback } from "react";

function Board({move, setMove, player, setPlayer, history, setHistory, historySlice, setHistorySlice, winner, setWinner}){
    const pieces = ['X', 'O']

    const checkWinner = (mv) => {
        let match = false
        // check rows for matches
        for (let i=0; i < 7; i+=3){
            if (mv[i].piece !== mv[i+1].piece || mv[i+1].piece === ""){
                continue
            }
            if (mv[i+1].piece !== mv[i+2].piece){
                continue
            }
            match = true
            // setHistorySlice(player - 1) // because player increments for every click it will treat the next player as winner so we decrement it
        }
        // check columsn for matches
        for (let i=0; i < 3; i++){
            if (mv[i].piece !== mv[i+3].piece || mv[i+3].piece === ""){
                continue
            }
            if (mv[i+3].piece !== mv[i+6].piece){
                continue
            }
            match = true
            // setHistorySlice(player - 1)
        }

        // check for diagonals 
        if (mv[4].piece !== ""){
            if (mv[0].piece === mv[4].piece && mv[4].piece === mv[8].piece){
                match = true
                // setHistorySlice(player - 1)
            } else if (mv[2].piece === mv[4].piece && mv[4].piece === mv[6].piece) {
                match = true
                // setHistorySlice(player - 1)
            }
        }

        return match
    }
    const handleCellClick = useCallback((e) => {
        if (winner) {
            return
        }

        const index = parseInt(e.target.getAttribute('data-value'))

        if (move[index].piece !== ""){
            return
        }
        const newMove = move.map(item => {
            if (item.id === index){
                return {...item, piece: pieces[historySlice%2]}
            }
            else {
                return {...item}
            }
        })
        setMove(newMove)
        /// if a winner is found no need to continue?
        const match = checkWinner(newMove)
        if (match) {
            setWinner(match)
        }

        if (historySlice !== player) {
            setPlayer(historySlice+1)
            setHistorySlice(historySlice+1)
            setHistory(history.slice(0, historySlice+1))
            return
        }
        setPlayer(player+ 1)
        setHistorySlice(player+ 1)
        setHistory(history, player + 1)
    }, [move, setMove, player, setPlayer, history, setHistory, historySlice, setHistorySlice])
    return (
    <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent:"center", alignItems:"center"}}>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={"0"}
            >
                {move[0].piece}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={1}
            >
                {move[1].piece}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={2}
            >
                {move[2].piece}
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={3}
            >
                {move[3].piece}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={4}
            >
                {move[4].piece}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={5}
            >
                {move[5].piece}
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={6}
            >
                {move[6].piece}
            </div>
            <div style={{height: "30px", width: "30px",  textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={7}
            >
                {move[7].piece}
            </div>
            <div style={{height: "30px", width: "30px", textAlign: "center", lineHeight: "30px", border:"1px solid black"}}
            onClick={handleCellClick}
            data-value={8}
            >
                {move[8].piece}
            </div>
        </div>
    </div>
    )

}


function History({move, setMove, player, setPlayer, historySlice, setHistorySlice, winner, setWinner}){
    if (winner) {

    }
    const [boardState, setBoardState] = useState(move)
    const [boardPlayer, setBoardPlayer] = useState(player)
    const [isWinner, setIsWinner] = useState(winner)
    let historyMessage = `Go to game start`
    if (player > 0){
        historyMessage = `Go to move #${player}`
    } 
    
    function handleStateChange() {
        setMove(boardState)
        setHistorySlice(boardPlayer)
        setWinner(isWinner)
    }

    return (
        <div>
            <span>{player+1} </span>
            <button onClick={handleStateChange}>{historyMessage}</button>
        </div>
    )
}


function Tictactoe() {
    const grid = [
        {id:0, piece: ""},
        {id:1, piece: ""},
        {id:2, piece: ""},
        {id:3, piece: ""},
        {id:4, piece: ""},
        {id:5, piece: ""},
        {id:6, piece: ""},
        {id:7, piece: ""},
        {id:8, piece: ""},
    ]
    const pieces = ['X', 'O']
    const [winner, setWinner] = useState(false)
    const [player, setPlayer] = useState(0) // same as player
    const [move, setMove] = useState(grid)
    const [history, setHistory] = useState([])
    const [historySlice, setHistorySlice] = useState(0) // same as player

    const boardData = {
        "move": move,
        "setMove": setMove,
        "player": player,
        "setPlayer": setPlayer,
        "history": history,
        "setHistory": setHistory,
        "historySlice": historySlice,
        "setHistorySlice": setHistorySlice,
        "winner": winner,
        "setWinner": setWinner
    }
    
    useEffect(() => {
        // if (!winner) {
            setHistory(history.concat(<History key={history.length} {...boardData}/>))
        // }
        // else {
        //     boardData.player = player - 1
        //     setHistory(history.concat(<History key={history.length} {...boardData}/>))

        // }
    }
        ,[player]
    )


    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{marginRight: "20px"}}>
                <div> {winner? "Winner" : "Next Player:"} {pieces[historySlice%2]}</div> 
                <Board {...boardData}/>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                {history}
            </div>
        </div>

    )

}


export default Tictactoe