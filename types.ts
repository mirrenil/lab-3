export interface User { 
  userId: string,
  username?: string
}

export interface Message {
  // { message, username, time }
}

export interface ServerToClientEvents {
  message: (message: string, from: {id: string, username: string}) => void;
  connected: (username: string) => void;
  roomList: (rooms: string[]) => void;
  joined: (room: string) => void;
  left: (room: string) => void;
  _error: (errorMessage: string) => void;
  isTyping: (username: string) => void;
  allUsersOnline: (users: User[]) => void;
  usersInRoom: (response: string) => void;
  ROOMS: (roomName: string, roomId: string) => void
  allRooms: (rooms: string[]) => void
  
}

export interface ClientToServerEvents {
  message: (message: string, to: string) => void;
  join: (room: string) => void;
  leave: (rooms: string) => void;
  typing: () => void;
  usersInRoom: (response: string) => void;
}

export interface InterServerEvents {
  
}

export interface ServerSocketData {
  username: string;
}
