import { Socket } from "socket.io";
import { nanoid } from "nanoid";
import moment from "moment";
import type { IOServer } from "./server";

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: IOServer }) {
  console.log("in function socket");

  io.use((socket: Socket, next) => {
    console.log("in io.use");
    const username: string = socket.handshake.auth.username;
    console.log(username);
    if (!username) {
      return next(new Error("invalid username"));
    }

    socket.data.username = username;
    console.log("socket.data.username: " + socket.data.username);
    next();
  });

  io.on("connection", (socket: Socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: id,
        username: socket.data.username,
      });
      socket.emit("allUsersOnline", users);
    }

    socket.on("usersInRoom", (roomName: string, callback) => {
      console.log("usersinroom:", roomName);

      const fetchUsers = async () => {
        let users = [];
        let roomUsers = await io.in(roomName).fetchSockets();
        for (let user of roomUsers) {
          console.log(user.data.username);
          users.push(user.data.username);
        }
        callback(users);
        return;
      };
      fetchUsers();
      // callback(roomUsers);
    });
    // const renderUsersInRoom = async (room: string) => {
    //   let roomUsers = await io.in(room).fetchSockets();
    //   console.log(roomUsers);
    // }

    console.log(`User is connected ${socket.id}`);

    socket.emit("welcome", `welcome new user!`);
    socket.emit("ROOMS", rooms);

    socket.on("CREATE_ROOM", ({ roomName }, callback) => {
      console.log("in create room");
      console.log({ roomName });
      const roomId = nanoid();
      rooms[roomId] = {
        name: roomName,
      };
      socket.join(roomId);
      //broadcast
      socket.broadcast.emit("ROOMS", rooms);

      // emit back to the room creator
      socket.emit("ROOMS", rooms);
      socket.emit("JOINED_ROOM", roomId);

      callback(roomId);
    });

    socket.on("SEND_ROOM_MESSAGE", ({ roomId, message, username }) => {
      socket.to(roomId).emit("ROOM_MESSAGE", {
        message,
        username,
        time: moment().format(`HH:mm`),
      });
      console.log(message, roomId, username);
    });

    socket.emit("connected", socket.data.username);

    // socket.on('chat-message', (message) => {
    //   console.log(message);
    //   // io.emit('chat message', message);
    // });

    socket.on("JOIN_ROOM", (roomId) => {
      console.log(roomId);
      console.log(socket.data.username);
      socket.join(roomId);

      socket.emit("JOINED_ROOM", roomId);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    // CALLBACK NOT WORKING!!
    socket.on("LEAVE_ROOM", (room, callback) => {
      socket.leave(room);
      console.log(`${socket.data.username} has left room ${room}`);
      callback(`${socket.data.username} has left room`);
    });

    socket.on("isTyping", (room) => {
      socket.broadcast.to(room).emit("isTyping", socket.data.username);
    });
  });
}

export default socket;
