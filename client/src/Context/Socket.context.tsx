import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
// import { User } from '../../types'

export interface User {
  userId: string;
  username: string;
}
export interface Message {
  author: User;
  body: string;
}

export interface Room {
  name: string;
  id: string;
}

export interface ISocketContext {
  socket: Socket;
  username?: string;
  setUsername: Function;
  //users: User[];
  messages: { message: string; time: string; username: string }[];
  setMessages: Function;
  rooms: Room[];
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
  users: [],
}

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

const SocketContext = createContext<ISocketContext>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  users: [],
  rooms: [],
  currentRoom: '',
  setCurrentRoom: () => {},
  createRoom: () => '',
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
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState({});
  const [messages, setMessages] = useState(
    [] as { message: string; username: string; time: string }[]
  );
  const [roomUseres, setRoomUsers] = useState<User[]>([])
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
    };
    socket.on('allUsersOnline', listener);
    return () => {
      socket.off('allUsersOnline', listener);
    };
  }, []);

  socket.on('allRooms', (roomsIds) => {
    getRoomsWithUsers();
    console.log(rooms);
    for (let i = 0; i < roomsIds.length; i++) {
      console.log(roomsIds[i]);
      console.log(rooms[i]?.id);
      // if (roomsIds[i] === rooms[i].id) {
      //   newRoomslist.push(rooms[i]);
      // }
    }
    // console.log(newRoomslist);
    // setRooms(newRoomslist);
  });

  socket.on('ROOMS', (roomname: any, id: any) => {
    if (roomname && id) {
      setRooms([...rooms, { name: roomname, id: id }]);
    } else return;
    console.log(rooms);
  });

  useEffect(() => {
    socket.on('ROOM_MESSAGE', ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = `new message: ${message}`;
      }
      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, []);

  useEffect(() => {
    socket.emit('usersInRoom', currentRoom, (response: any) => {
      setUsersInRoom(response);
      console.log(response.length);
      
      return;
    });

    getRoomsWithUsers();
  }, [currentRoom, socket, username]);

  socket.on('isTyping', (username: string) => {
    if (username) setIsTyping(`${username} is typing...`);
    setTimeout(() => setIsTyping(''), 2000);
  });

  const createRoom = (roomName: string, username: string) => {
    leaveRoom();
    socket.emit('CREATE_ROOM', { roomName, username }, (response: string) => {
      console.log(response);
    });
  };

  const getRoomsWithUsers = () => {
    let newRoomsArray: Room[] = [];
    for (let room of rooms) {
      console.log(room);
      socket.emit('usersInRoom', room.id, (response: any) => {
        console.log(response);
        if (response.length >= 1) {
          newRoomsArray.push(room);
        }
        console.log('rooms', rooms);
        console.log("newRoomsArray", newRoomsArray);
        setRooms(newRoomsArray);
      });
    }
    console.log(rooms);
  };

  const leaveRoom = () => {
    console.log('LEAVE ROOM START');
    console.log(currentRoom);
    socket.emit('LEAVE_ROOM', currentRoom, (response: string) => {
      setCurrentRoom('');
      console.log('LEAVE ROOM END');
    });
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
        roomUseres
      }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;
