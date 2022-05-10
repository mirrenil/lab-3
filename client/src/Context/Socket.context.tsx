import { format } from 'path';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { flattenDiagnosticMessageText } from 'typescript';
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
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
  joinRoom: (roomName: string) => void;
  leaveRoom: () => void;
  isTyping: string;
  sendMessage: Function;
  allUsersOnline: [];
}

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

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
  sendMessage: () => '',
  allUsersOnline: [],
});

const SocketProvider = (props: any) => {
  const [username, setUsername] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState({});
  const [messages, setMessages] = useState({});
  const [isTyping, setIsTyping] = useState<string>('');
  const [currentRoom, setCurrentRoom] = useState<string>('');
  const [newMessage, setNewMessage] = useState({});
  const [allUsersOnline, setAllUsersOnline] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.onfocus = () => {
      document.title = 'chaT';
    };

    socket.on('connect_error', (err) => {
      console.log('ogiltigt användarnamn');
    });

    socket.on('JOINED_ROOM', (value: any) => {
      setRoomId(value);
      setCurrentRoom(value);
      console.log('JOINED_ROOM: ' + value);
      navigate('/chat');
      // setMessages([]);
    });

    socket.on('new message', message => {
      const newM = messages;
      console.log(newM)
      
    // direkt när man trycker att meddelandet ska skickas
    // behöver message sättas
    })

  }, []);

  useEffect(() => {
    socket.on('allUsersOnline', (users) => {
      setAllUsersOnline(users);
    });
  }, [allUsersOnline]);


 

  socket.on('ROOMS', (value: any) => {
    setRooms(value);
  });

  socket.on('isTyping', (username: string) => {
    if (username) {
      setIsTyping(`${username} is typing...`);
    }
  });

  const leaveRoom = () => {
    console.log('LEAVE ROOM START');
    console.log(currentRoom);
    socket.emit('LEAVE_ROOM', currentRoom, (response: string) => {
      console.log(response);
      setCurrentRoom('');
      console.log(currentRoom);
      console.log('LEAVE ROOM END');
      console.log(allUsersOnline);
    });
  };

  // socket.on('message', (message, from) => {});

  const sendMessage = (content: string) => {
    setNewMessage({
      from: username,
      to: currentRoom,
      body: content,
    });

    socket.emit('send message', newMessage)

  };



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
        sendMessage,
        allUsersOnline,
      }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;
