import React, { CSSProperties } from 'react'

function Lobby() {
    return (
        <div style={lobbyStyle}>
             <div style={{textAlign: "center"}}>
                <h1 style={{fontSize: "4rem"}}>ʧæt æp</h1>
                <p>Lobby</p>
                <p style={{color: "transparent"}}>This is a very secret message...</p>
                </div>
        </div>
    )
}
const lobbyStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#222",
    width: '100%',
    color: "#fff",
}
export default Lobby