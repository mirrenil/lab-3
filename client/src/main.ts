import "./style.css";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
});

let nickname: string;
let joinedRoom: string;

window.addEventListener("load", () => {
  renderNameInput();
});

// Renderar input för val av namn
function renderNameInput() {
  document.body.innerHTML = "";

  let container = document.createElement("div");
  container.classList.add("inputNameContainer");

  let nameInputHeader = document.createElement("h3");
  nameInputHeader.innerText = "Ange ditt namn";

  let nameInput = document.createElement("input");

  let nameInputButton = document.createElement("button");
  nameInputButton.innerText = "Spara";
  nameInputButton.addEventListener("click", () => {
    socket.auth = { nickname: nameInput.value };
    socket.connect();
  });

  container.append(nameInputHeader, nameInput, nameInputButton);
  document.body.append(container);
}

// Renderar input för val av rum
function renderRoomInput() {
  document.body.innerHTML = "";

  let container = document.createElement("div");
  container.classList.add("inputNameContainer");

  let roomInputHeader = document.createElement("h3");
  roomInputHeader.innerText = "Ange ditt rum";

  let roomInput = document.createElement("input");

  let roomInputButton = document.createElement("button");
  roomInputButton.innerText = "Gå med";
  roomInputButton.addEventListener("click", () => {
    const room = roomInput.value;
    if (!room.length) {
      console.log("Ogiltigt namn på rum...");
      return;
    }
    socket.emit("join", room);
  });

  container.append(roomInputHeader, roomInput, roomInputButton);
  document.body.append(container);
}

// Rendering av chatformulär
function renderForm() {
  document.body.innerHTML = "";

  let chatList = document.createElement("ul");
  chatList.id = "messages";

  let chatInput = document.createElement("input");
  chatInput.autocomplete = "off";
  chatInput.id = "input";

  let chatForm = document.createElement("form");
  chatForm.id = "form";
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (chatInput.value.length) {
      socket.emit("message", chatInput.value, joinedRoom);
    } else {
      console.log("Du får inte skicka tomma meddelanden!");
    }
  });

  let sendButton = document.createElement("button");
  sendButton.innerText = "Skicka";

  chatForm.append(chatInput, sendButton);
  document.body.append(chatList, chatForm);
}

socket.on("connect_error", (err) => {
  if (err.message == "Invalid nickname") {
    console.log("Du angav ett ogiltigt användarnamn, var god försök igen...");
  }
});

socket.on("_error", (errorMessage) => {
  console.log(errorMessage);
});

socket.on("roomList", (rooms) => {
  console.log(rooms);
});

socket.on("joined", (room) => {
  console.log("Joined room: ", room);
  joinedRoom = room;
  renderForm();
});



// socket.on("message", (message, from) => {
//   //console.log(message, from.nickname);

//   const chatItem = document.createElement("li");
//   //chatItem.textContent = from.nickname + ": " + message;

//   const messageList = document.getElementById("messages");

//   if (messageList) {
//     messageList.append(chatItem);
//   }

//   window.scrollTo(0, document.body.scrollHeight);
// });

socket.on("connected", (nickname) => {
  console.log("Connected: ", nickname);
  nickname = nickname;
  renderRoomInput();
});

socket.on("connect", () => {
  console.log("Inbyggd event för connect (här skickas ingen data med)");
});

socket.on("disconnect", (reason, description) => {
  console.log(
    "Inbyggd event för disconnect (här skickas anledning och beskrivning med)"
  );
});
