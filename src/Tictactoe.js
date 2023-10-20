import React from 'react'
import { useState, useCallback } from 'react'

function Player({currentPlayer}){

    return (
        <span>Next player: {currentPlayer}</span>
    )

}
function  GameHistory({move, onMoveChange, boardState, onBoardStateChange}){
    const [boardHistory, setBoardHistory] = useState(boardState)
    // const handleMoveChange = () => {
    //     onMoveChange((move + 1)%2)
    // }

    const handleHistoryChange = useCallback((event)=>{
    
    }, [boardState, onBoardStateChange])

    return (
        <button onClick={handleMoveChange2}>next</button>
    )

}
function Board({player, onPlayerMove, boardState, onBoardStateChange}){
    const players = ['X', 'O']
    const handlePlayerMove = useCallback((e) =>{
        const value = parseInt(e.target.getAttribute('data-value'))
        // when div is clicked assign the piece to it
        if (boardState[value].piece !== "") {
            return
        }
        onBoardStateChange(
            boardState.map(cell => cell.id == value
                ? {...cell, piece:players[player] }
                : {...cell}
            )
        )
        
        // then start the turn of the next player
        onPlayerMove((player + 1) %2)
    },[boardState, onBoardStateChange, player, onPlayerMove])

    return (
        <>
        <div className="row-1" style={{display:"flex", flexDirection: "row"}} >
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="0">
            {boardState[0].piece}
            </div>
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="1">
            {boardState[1].piece}
            </div>
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="2">
            {boardState[2].piece}
            </div>
        </div>
        <div className="row-2" style={{display:"flex", flexDirection: "row"}}>
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="3">
            {boardState[3].piece}
            </div>
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="4">
            {boardState[4].piece}
            </div>
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="5">
            {boardState[5].piece}
            </div>
        </div>
        <div className="row-3" style={{display:"flex", flexDirection: "row"}}>
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="6">
            {boardState[6].piece}
            </div>
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="7">
            {boardState[7].piece}
            </div>
            <div style={{height: "30px", width: "30px", border:"1px solid black"}} onClick={handlePlayerMove} data-value="8">
            {boardState[8].piece}
            </div>
        </div>
        </>
    )
}

function Tictactoe(){
    const boardArray = [
        {id: 0, piece: ""},
        {id: 1, piece: ""},
        {id: 2, piece: ""},
        {id: 3, piece: ""},
        {id: 4, piece: ""},
        {id: 5, piece: ""},
        {id: 6, piece: ""},
        {id: 7, piece: ""},
        {id: 8, piece: ""},
    ]
    const players = ['X', 'O']
    const [ player, setPlayer ] = useState(0)
    const [ boardState, setBoardState ] = useState(boardArray)



    const boardData = {
        "player": player,
        "onPlayerMove": setPlayer,
        "boardState": boardState,
        "onBoardStateChange": setBoardState,
    }

    return (
        <>
            <div>
                <Player currentPlayer={players[player]}/>
                <Board {...boardData}/>
            </div>
            <div>
                <GameHistory move={player} onMoveChange={setPlayer}/>
            </div>
        </>
        
    )
}

export default Tictactoe