import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
export interface User {
  id: string;
  username: string;
}
export interface Message {
  author: User;
  body: string;
}

export interface Room {
  name: string;
  // messages: Messages[];
}
export interface ISocketContext {
  socket: Socket;
  username?: string;
  setUsername: Function;
  //users: User[];
  rooms: Room[];
  roomId?: string;
  currentRoom: string;
  setCurrentRoom: React.Dispatch<
    React.SetStateAction<string>
  >;
  joinRoom: (
  roomName: string
  ) => void;
  leaveRoom: () => void;
  isTyping: string;
}

const socket =
  io(SOCKET_URL);


  const SocketContext = createContext<ISocketContext>({
    socket,
    setUsername: () => false,
    //users: [],
    rooms: [],
    currentRoom: '',
    setCurrentRoom: () => {},
    joinRoom: () => {},
    leaveRoom: () => {},
    isTyping: '',
  });

  const SocketProvider = (props: any) => {
    const [username, setUsername] = useState('');
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomId, setRoomId] = useState({});
    const [messages, setMessages]  = useState([]);
    const [isTyping, setIsTyping] = useState<string>('')
    const [currentRoom, setCurrentRoom] = useState<string>('');
    // const navigate = useNavigate();


    useEffect(() => {
      window.onfocus = () => {
        document.title = "chaT"
      } 
    },[])


    socket.on("ROOMS", (value: any) => {
      setRooms(value)
    })
    socket.on("JOINED_ROOM", (value: any) => {
      setRoomId(value)
      setMessages([])
    })

    socket.on('isTyping', (username: string) => {
      if (username) {
        setIsTyping(`${username} is typing...`)
      }
    })

    
      socket.on('left', (room) => {
        console.log(
          "left room"
        );
      })
      
       const leaveRoom = (roomName: string) => {
         socket!.emit('leave', currentRoom)
       };

       socket.on('message', (message, from) => {

       })

       
    socket.on('connect_error', (err) => {
      console.log('ogiltigt användarnamn');
    });
    return (
      <SocketContext.Provider
        value={{ 
          socket, 
          username, 
          setUsername,
          rooms,
          roomId,
          currentRoom,
          setCurrentRoom,
          leaveRoom,
          isTyping,
        }}
        {...props}
      />
    );
  };
  
  export const useSockets = () => useContext(SocketContext);
  export default SocketProvider;