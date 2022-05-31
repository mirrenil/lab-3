import { nanoid } from "nanoid";
import moment from "moment";
import type { IOServer, IOSocket } from "./server";

// const rooms = <any>[];

// GET ROOMS
//Hämtar alla öppna rum från servern.
function getRooms(io: IOServer) {
  const roomsList: string[] = [];

  for (let [key, value] of io.sockets.adapter.rooms) {
    // Kollar om rummet innehåller sig själv
    // I så fall är det en user och därmed inte följer med till listan
    if (!value.has(key)) {
      roomsList.push(key);
    }
  }

  console.log(roomsList);
  return roomsList;
}

function socket({ io }: { io: IOServer }) {
  io.use((socket: IOSocket, next) => {
    const username: string = socket.handshake.auth.username;

    if (!username) {
      return next(new Error("invalid username"));
    }

    socket.data.username = username;

    next();
  });

  io.on("connection", (socket: IOSocket) => {
    socket.emit("ROOMS", getRooms(io));

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: id,
        username: socket.data.username,
      });
      socket.emit("allUsersOnline", users);
    }

    socket.on("usersInRoom", (roomName: string) => {
      const fetchUsers = async () => {
        let users = [];
        let roomUsers = await io.in(roomName).fetchSockets();
        for (let user of roomUsers) {
          users.push(user.data.username);
        }
      };
      fetchUsers();
    });

    console.log(`User is connected ${socket.id}`);

    socket.on("CREATE_ROOM", (roomName) => {
      socket.join(roomName);

      io.emit("ROOMS", getRooms(io));

      // let activeRooms = getRooms(io);
      // io.emit("UPDATED_ROOMS_LIST", activeRooms);

      socket.emit("JOINED_ROOM", roomName);
    });

    socket.on("SEND_ROOM_MESSAGE", ({ roomId, message, username }) => {
      socket.to(roomId).emit("ROOM_MESSAGE", {
        message,
        username,
        roomId,
        time: moment().calendar(),
      });
    });

    socket.emit("connected", socket.data.username);

    socket.on("JOIN_ROOM", (roomId) => {
      socket.join(roomId);
      socket.emit("JOINED_ROOM", roomId);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      socket.emit("ROOMS", getRooms(io));
    });

    // CALLBACK NOT WORKING!!
    socket.on("LEAVE_ROOM", (room) => {
      socket.leave(room);

      let activeRooms = getRooms(io);
      for (let activeRoom of activeRooms) {
        console.log("active room: ", activeRoom);
      }
      io.emit("ROOMS", activeRooms);
    });

    socket.on("isTyping", (room) => {
      socket.broadcast.to(room).emit("isTyping", socket.data.username);
    });
  });
}

export default socket;
