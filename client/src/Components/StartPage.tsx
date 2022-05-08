import React, { CSSProperties } from 'react'
import { useSockets } from '../Context/Socket.context';
import  CreateRoom  from './CreateRoom';
import  UserInputComponent  from './UserInputComponent';

const StartPage = () => {
  const { username, } = useSockets();

  return (
    <div style={rootstyle}>
      {!username ? (
        <div style={usernameInputDivStyle}>
          <UserInputComponent />
        </div>
      ) : (
      <CreateRoom/>
      )}
      {/* <UserInputComponent /> */}
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
  height: "100vh",
  width: "100%",
  background: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}
export default StartPage