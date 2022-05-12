import React, { CSSProperties } from 'react'
import { useSockets } from '../Context/Socket.context';
import UserInputComponent from './UserInputComponent';

const StartPage = () => {
  const { username, } = useSockets();

  return (
    <div style={rootstyle}>
      {!username ? (
        <div style={usernameInputDivStyle}>
          <UserInputComponent />
        </div>
      ) : (
       null
      )}
    </div>
  )
}

const rootstyle: CSSProperties = {
  width: '100%',
  height: '100vh',
  // border: '2px solid blue',
};
const usernameInputDivStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: "0",
  height: "122vh",
  width: "100%",
  background: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}
export default StartPage