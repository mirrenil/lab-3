import { Socket } from 'socket.io';
import { nanoid } from 'nanoid';
import moment from 'moment';
import type { IOServer } from './server';
import { getRooms } from './roomStore';

const rooms: Record<string, { name: string, roomUsers: number }> = {};

function socket({ io }: { io: IOServer }) {
  console.log('in function socket');

  io.use((socket: Socket, next) => {
    console.log('in io.use');
    const username: string = socket.handshake.auth.username;
    console.log(username);
    if (!username) {
      return next(new Error('invalid username'));
    }

    socket.data.username = username;
    console.log('socket.data.username: ' + socket.data.username);
    next();

    const getAllRooms = () => {
      const allRooms = getRooms(io);
      io.emit('allRooms', allRooms)
    }
    getAllRooms();
  });

  io.on('connection', (socket: Socket) => {
    
    const getOnlineUsers = () => {
      const users = [];
      for (let [id, socket] of io.of('/').sockets) {
        users.push({
          userId: id,
          username: socket.data.username,
        });
        io.emit('allUsersOnline', users);
      }
    };
    getOnlineUsers();



    socket.on('usersInRoom', (roomName: string, callback) => {
      const fetchUsers = async () => {
        let users = [];
        let roomUsers = await io.in(roomName).fetchSockets();
        for (let user of roomUsers) {
          users.push(user.data.username);
        }
        callback(users);
        return;
      };
      fetchUsers();
      // callback(roomUsers);
      const test = getRooms(io);
      console.log(test); 
    });

    // const renderUsersInRoom = async (room: string) => {
    //   let roomUsers = await io.in(room).fetchSockets();
    //   console.log(roomUsers);
    // }

    console.log(`User is connected ${socket.id}`);

    socket.emit('welcome', `welcome new user!`);
    // socket.emit("ROOMS", rooms);

    socket.on('CREATE_ROOM', ({ roomName, roomUsers }, callback) => {
      console.log('in create room');
      console.log({ roomName });
      const roomId = nanoid();
      rooms[roomId] = {
        name: roomName,
        roomUsers: 0,
      };
      socket.join(roomId);

      //broadcast
      io.emit('ROOMS', roomName, roomId);

      // emit back to the room creator
      socket.emit('ROOMS', roomName, roomId);
      socket.emit('JOINED_ROOM', roomId);

      callback(roomId);
    });

    socket.on('SEND_ROOM_MESSAGE', ({ roomId, message, username }) => {
      socket.broadcast.to(roomId).emit('ROOM_MESSAGE', {
        message,
        username,
        time: moment().calendar(),
      });
      console.log(message, roomId, username);
    });

    socket.emit('connected', socket.data.username);

    // socket.on('chat-message', (message) => {
    //   console.log(message);
    //   // io.emit('chat message', message);
    // });

    socket.on('JOIN_ROOM', (roomId, roomName) => {
      console.log(roomId);
      console.log(socket.data.username);
      socket.join(roomId);
      socket.emit('JOINED_ROOM', roomId);
      //getAllRooms()
      // getAllRooms();
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      getOnlineUsers();
      // getAllRooms();
    });

    // CALLBACK NOT WORKING!! -its working, its just not in 
    socket.on('LEAVE_ROOM', (room, callback) => {
      socket.leave(room);
      console.log(`${socket.data.username} has left room ${room}`);
      callback(`${socket.data.username} has left room`);
      
    });

    socket.on('isTyping', (room) => {
      socket.broadcast.to(room).emit('isTyping', socket.data.username);
      console.log('isTyping');
    });
  });
}

export default socket;
