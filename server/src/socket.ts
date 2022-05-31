import { Socket } from 'socket.io';
import { nanoid } from 'nanoid';
import moment from 'moment';
import type { IOServer } from './server';

// const rooms = <any>[];

// GET ROOMS 
//Hämtar alla öppna rum från servern.
function getRooms(io: IOServer) {
  const roomsList: string[] = [];

  for (let [key, value] of io.sockets.adapter.rooms) {
    console.log('-ADAPTER ROOMS:-');
    console.log(io.sockets.adapter.rooms);
    console.log('---------------');
    console.log('key: ', key);
    console.log('value: ', value);
    console.log('---------------');

    console.log(!value.has(key));

    roomsList.push(key);

    // Kollar om rummet innehåller sig själv 
    // I så fall är det en user och därmed inte följer med till listan
    if (!value.has(key)) {
      console.log(key);
      roomsList.push(key);
    }
  }
  return roomsList;
}

function socket({ io }: { io: IOServer }) {
  io.use((socket: Socket, next) => {
    const username: string = socket.handshake.auth.username;

    if (!username) {
      return next(new Error('invalid username'));
    }

    socket.data.username = username;

    next();
  });

  io.on('connection', (socket: Socket) => {
    let activeRooms = getRooms(io);
    // console.log("active rooms: ", activeRooms);

    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userId: id,
        username: socket.data.username,
      });
      socket.emit('allUsersOnline', users);
    }

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
      // const test = getRooms(io);
      // console.log(test);
    });

    // const renderUsersInRoom = async (room: string) => {
    //   let roomUsers = await io.in(room).fetchSockets();
    //   console.log(roomUsers);
    // }

    console.log(`User is connected ${socket.id}`);

    socket.emit('welcome', `welcome new user!`);
    socket.emit('ROOMS', getRooms(io));

    socket.on('CREATE_ROOM', ({ roomName }, callback) => {

      // rooms[roomId] = {
      //   name: roomName,
      // };

      // rooms.push({
      //   name: roomName,
      //   id: roomId,
      // });

      socket.join(roomName);


      io.emit('ROOMS', getRooms(io));

      // let activeRooms = getRooms(io);
      // io.emit("UPDATED_ROOMS_LIST", activeRooms);
 
      socket.emit('JOINED_ROOM', roomName);
      callback(roomName);
    });

    socket.on('SEND_ROOM_MESSAGE', ({ roomId, message, username }) => {
      socket.to(roomId).emit('ROOM_MESSAGE', {
        message,
        username,
        time: moment().calendar(),
      });
    });

    socket.emit('connected', socket.data.username);

    socket.on('JOIN_ROOM', (roomId) => {
      socket.join(roomId);
      socket.emit('JOINED_ROOM', roomId);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    // CALLBACK NOT WORKING!!
    socket.on('LEAVE_ROOM', (room, callback) => {
      socket.leave(room);


      let activeRooms = getRooms(io);
      for (let activeRoom of activeRooms) {
        console.log('active room: ', activeRoom);
      }

      // io.emit('UPDATED_ROOMS_LIST', activeRooms);

      callback(`${socket.data.username} has left room`);
    });

    socket.on('isTyping', (room) => {
      socket.broadcast.to(room).emit('isTyping', socket.data.username);
    });
  });

  // Kan använda iställer men är kanske inte nödvändigt
  io.of("/").adapter.on("join-room", (room, id) => {
   
  });

  io.of("/").adapter.on("leave-room", (room, id) => {
    
  });


}

export default socket;
