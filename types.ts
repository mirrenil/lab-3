export interface User {
  userId: string;
  username?: string;
}

export interface Message {
  message: string;
  time?: string;
  roomId: string;
  username: string;
}

export interface ServerToClientEvents {
  ROOM_MESSAGE: (message: Message) => void;
  connected: (username: string) => void;
  roomList: (rooms: string[]) => void;
  JOINED_ROOM: (room: string) => void;
  left: (room: string) => void;
  _error: (errorMessage: string) => void;
  isTyping: (username: string) => void;
  allUsersOnline: (users: User[]) => void;
  ROOMS: (a: string[]) => void;
}

export interface ClientToServerEvents {
  CREATE_ROOM: (roomName: string) => void;
  SEND_ROOM_MESSAGE: (from: Message) => void;
  JOIN_ROOM: (room: string) => void;
  leave: (rooms: string) => void;
  isTyping: (room: string) => void;
  usersInRoom: (response: string) => void;
  LEAVE_ROOM: (room: string) => void;
}

export interface InterServerEvents {}

export interface ServerSocketData {
  username: string;
}
