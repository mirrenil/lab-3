import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import { ServerToClientEvents, ClientToServerEvents } from '../../../types'


export interface ISocketContext {
  socket: Socket;
  username?: string;
  setUsername: Function;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(SOCKET_URL);


  const SocketContext = createContext<ISocketContext>({
    socket,
    setUsername: () => false,
  });

  const SocketProvider = (props: any) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
      window.onfocus = () => {
        document.title = "chaT"
      } 
    },[])
    
    
    socket.on('connect_error', (err) => {
      console.log('ogiltigt användarnamn');
    });
    return (
      <SocketContext.Provider
        value={{ socket, username, setUsername,}}
        {...props}
      />
    );
  };
  
  export const useSockets = () => useContext(SocketContext);
  export default SocketProvider;