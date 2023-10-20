import React from 'react'
import Search from './components//Search'
import { useEffect, useState } from 'react'

// const API_URL = "http://www.omdbapi.com/?apikey=eebfc798&"
// const App = () => {

//     let info
//     let title = 'batman'
//     fetch(`${API_URL}t=${title}`)
//         .then(response =>{
//             if (!response.ok){
//                 throw new Error("Something went wrong.")
//             }
//             return response.json()
//         })
//         .then(data => {
//             info = data
//         }).catch(error => {
//             throw error

//         })

//     setTimeout(()=>{
//         console.log(info)
//     }, 5000)


//     return (
//         <h1>Hello</h1>
//     )

// }

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <input type="text" value={username} onChange={
                (e) => {
                    setUsername(e.target.value)
                }
            }/>
            <input type="password" value={password} onChange={
                (e) => {
                    setPassword(e.target.value)
                }
            }/>

            <button onClick = {() => {
                console.log(username)
                console.log(password)
            }}>Click me</button>
        </>

    )

}




export default App