import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import { ServerToClientEvents, ClientToServerEvents, Message } from '../../../types';

export interface User {
  userId: string;
  username: string;
}

export interface Room {
  name: string;
  id?: string;
}

export interface ISocketContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  username?: string;
  setUsername: Function;
  //users: User[];
  messages: { message: string; time: string; username: string }[];
  setMessages: Function;
  rooms: string[];
  roomId?: string;
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
  createRoom: (a: string, b: string) => void;
  joinRoom: (roomName: string) => void;
  leaveRoom: () => void;
  isTyping: string;
  sendMessage: Function;
  allUsersOnline: [];
  usersInRoom: [];
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
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
  createRoom: () => "",
  joinRoom: () => {},
  leaveRoom: () => {},
  isTyping: '',
  sendMessage: () => '',
  messages: [],
  allUsersOnline: [],
  usersInRoom: [],
});

const SocketProvider = (props: any) => {
  const [username, setUsername] = useState<string>('');
  const [rooms, setRooms] = useState<string[]>([]);
  const [roomId, setRoomId] = useState({});
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState<string>('');
  const [currentRoom, setCurrentRoom] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [allUsersOnline, setAllUsersOnline] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.onfocus = function () {
      document.title = 'Chat app';
    };

    socket.on('connect_error', (err) => {
      console.log('ogiltigt användarnamn');
    });

    socket.on('JOINED_ROOM', (value: any) => {
      setRoomId(value);
      setCurrentRoom(value);
      console.log('JOINED_ROOM: ' + value);
      navigate('/chat');
      setMessages([]);
    });

  }, []);

  useEffect(() => {
    const listener = (users: any) => {
      setAllUsersOnline(users);
      console.log(users);
    };
    socket.on('allUsersOnline', listener);
    return () => {
      socket.off('allUsersOnline', listener);
    };
  }, []);

  useEffect(() => {
    // console.log('ADD MESSAE SUBSCRIBER');
    socket.on('ROOM_MESSAGE', (message) => {
      if (!document.hasFocus()) {
        document.title = `new message: ${message}`;
      }
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  // useEffect(() => {
  //   socket.emit('usersInRoom', currentRoom, (response) => {
  //     console.log(response);
  //     setUsersInRoom(response);
  //     return;
  //   });
  // }, [currentRoom]);

  useEffect(() => {
    const listener = (rooms: string[]) => {
      console.log(rooms);
      setRooms(rooms);
    };
    
    socket.on('ROOMS', listener);
    return () => { socket.off('ROOMS', listener) };
  }, []);

  useEffect(() => {
    const listener = (username: string) => {
      if (username) setIsTyping(`${username} is typing...`);
      setTimeout(() => setIsTyping(''), 2000);
    };
    
    socket.on('isTyping', listener);
    return () => { socket.off('isTyping', listener) };
  }, []);

  const createRoom = (roomName: string, username: string) => {
    leaveRoom();

    //Behöver ändras här eller i types.ts
    socket.emit("CREATE_ROOM", roomName);
  }

  const leaveRoom = () => {
    console.log('LEAVE ROOM START');
    console.log(currentRoom);

    //Behöver ändras här eller i types.ts
    socket.emit('LEAVE_ROOM', currentRoom);
    setCurrentRoom('');
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
        createRoom,
        leaveRoom,
        isTyping,
        messages,
        setMessages,
        allUsersOnline,
        usersInRoom,
      }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;
