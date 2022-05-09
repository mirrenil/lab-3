import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  messages:  { message: string; time: string; username: string }[];
  setMessages: Function;
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
  sendMessage: Function
}

const socket =
  io(SOCKET_URL, {
    autoConnect: false,
  });


  const SocketContext = createContext<ISocketContext>({
    socket,
    setUsername: () => false,
    setMessages: () => false,
    //users: [],
    rooms: [],
    currentRoom: '',
    setCurrentRoom: () => {},
    joinRoom: () => {},
    leaveRoom: () => {},
    isTyping: '',
    sendMessage: () => '',
    messages:[],
  });

  const SocketProvider = (props: any) => {
    const [username, setUsername] = useState('');
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomId, setRoomId] = useState({});
    const [messages, setMessages]  = useState([]as {message: string, username: string, time:string}[]);
    const [isTyping, setIsTyping] = useState<string>('')
    const [currentRoom, setCurrentRoom] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>("")
    const navigate = useNavigate();


    useEffect(() => {
      window.onfocus = function () {
        document.title = "Chat app";
      };
    }, []);

      socket.on('connect_error', (err) => {
        console.log('ogiltigt användarnamn');
      });

    socket.on("JOINED_ROOM", (value: any) => {
      setRoomId(value)
      console.log("JOINED_ROOM: " + value)
      // navigate('/chat')
      setMessages([])
    })



    socket.on("ROOMS", (value: any) => {
      setRooms(value)
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

       
   

    // const sendMessage = (message: string) => {
    //   setNewMessage(message);
    //   console.log(message);
    // }
    useEffect(() => {
    socket.on('ROOM_MESSAGE', ({message, username, time}) => {
      if(!document.hasFocus()){
        document.title = `new message: ${message}`;
      }
      setMessages((messages) => [...messages, { message, username, time }]);
    })
}, [socket])

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
          messages, 
          setMessages
        }}
        {...props}
      />
    );
  };
  
  export const useSockets = () => useContext(SocketContext);
  export default SocketProvider;