import { Server, Socket } from 'socket.io';
import { nanoid } from "nanoid";



const rooms: Record<string, {name: string}> = {};


function socket({ io }: { io: Server }) {
  console.log('Socket connected');
  
  io.use((socket: Socket, next) => {
    const username: string = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    socket.data.username = username;
    next();
  });

  io.on('connection', (socket: Socket) => {
    console.log(`User is connected ${socket.id}`);

    socket.emit('welcome', `welcome new user!`);
    socket.emit("ROOMS", rooms);

    socket.on("CREATE_ROOM", ({roomName}) => {
      console.log({ roomName });
      const roomId = nanoid();
      rooms[roomId] = {
        name: roomName,
      }
      socket.join(roomId);
      //broadcast
      socket.broadcast.emit("ROOMS", rooms)

      // emit back to the room creator
      socket.emit("ROOMS", rooms)
      socket.emit("JOINED_ROOM", roomId)
    })




    socket.emit('connected', socket.data.username);

    socket.on('chat-message', (message) => {
      console.log(message);
      // io.emit('chat message', message);
    });

    socket.on("JOIN_ROOM", (roomId) => {
      socket.join(roomId);
      console.log({roomId});
      
      socket.emit("JOINED_ROOM", roomId);
    })
  });


  
}


export default socket;