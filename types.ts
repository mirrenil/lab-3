export interface User { 
  userId: string,
  username?: string
}

export interface Message {
  // { message, username, time }
}

export interface ServerToClientEvents {
  ROOM_MESSAGE: ( from: {message: string, time: string, username: string}) => void;
  connected: (username: string) => void;
  roomList: (rooms: string[]) => void;
  JOINED_ROOM: (room: string) => void;
  left: (room: string) => void;
  _error: (errorMessage: string) => void;
  isTyping: (username: string) => void;
  allUsersOnline: (users: User[]) => void;
  usersInRoom: (response: string) => void;
  ROOMS: (a: string[]) => void;
}

export interface ClientToServerEvents {
  CREATE_ROOM: (from: {roomName: string, username: string}, response: string) => void;
  message: (message: string, to: string) => void;
  join: (room: string) => void;
  leave: (rooms: string) => void;
  typing: () => void;
  usersInRoom: (response: string) => void;
  LEAVE_ROOM: (room: string, response: string ) => void;
}

export interface InterServerEvents {
  
}

export interface ServerSocketData {
  username: string;
}
