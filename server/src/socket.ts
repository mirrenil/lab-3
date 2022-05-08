import { Server, Socket } from 'socket.io';





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

    socket.emit('connected', socket.data.username);

    socket.on('chat-message', (message) => {
      console.log(message);
      // io.emit('chat message', message);
    });
  });
}


export default socket;