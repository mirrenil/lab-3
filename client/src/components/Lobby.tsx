import React, { CSSProperties } from 'react'

function Lobby() {
    return (
        <div style={lobbyStyle}>
            <div style={{textAlign: "center"}}>
                <h2>Welcome PUT USERNAME HERE</h2>
                <h3>On your left you can see open rooms and also create your own room</h3>
            </div>

        </div>
    )
}
const lobbyStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}
export default Lobby