export interface ServerToClientEvents {
  message: (message: string, from: {id: string, username: string}) => void;
  connected: (username: string) => void;
  roomList: (rooms: string[]) => void;
  joined: (room: string) => void;
  left: (room: string) => void;
  _error: (errorMessage: string) => void;
  isTyping: (username: string) => void;
}

export interface ClientToServerEvents {
  message: (message: string, to: string) => void;
  join: (room: string) => void;
  leave: (rooms: string) => void;
  typing: () => void;
}

export interface InterServerEvents {
  
}

export interface ServerSocketData {
  username: string;
}
