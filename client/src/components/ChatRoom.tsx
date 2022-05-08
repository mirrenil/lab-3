import { ChangeEvent, CSSProperties, FormEvent, useState } from "react";
//import ChatBubble from "./ChatBubble";
//import { Socket } from "socket.io-client";
//import SocketProvider, { ISocketContext, Message, User } from "../context/socket.context";
//import { useSockets } from '../context/socket.context';

// interface Room {
//     name: string;
//     members: User[];
// }

const ChatRoom = () => {
    const [value, setValue] = useState<string>("");
    //const navigate = useNavigate();
    //const { sendMessage, updateRooms } = useSockets();


    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(value)
        //sendMessage(value);
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(value)
    }

    const handleOnLeave = () => {
    // if (room) {
    //   io.updateRooms(room.name);
    //   io.leaveRoom(room.name);
      console.log("left room")
      //navigate("/home");
    }

    return (
        <div style={rootstyle}>
            <div style={chatsDivStyle}>
                {/* <ChatBubble /> */}
            </div>
            <form style={formStyle} onSubmit={handleSendMessage}>
                <input value={value} onChange={handleChange} style={inputStyle} type="text" placeholder="Join the conversation..."/>
            </form>
            <button style={buttonStyle} onClick={handleOnLeave}>Leave room</button>
        </div>
    );
}

const rootstyle: CSSProperties = {
    border: "2px solid red",
    height: "100%",
    marginLeft: "180px", //Samma som sidebarens width
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const inputStyle: CSSProperties = {
    width: "60%",
    borderRadius: "50px",
    border: 'none',
    height: '2.5rem',
    background: "rgba(255, 255, 255, 0.3)"
}

const chatsDivStyle: CSSProperties = {
    border: '2px solid blue',
    height: "85%",
    width: "60%",
    marginBottom: "2rem"
}

const formStyle: CSSProperties = {
    width: "100%",
    textAlign: 'center',
    height: "10%"
}

export const buttonStyle: CSSProperties = {
  padding: "0.5em 1.5em",
  margin: "0 0.3em 0.3em 0",
  borderRadius: "2em",
  color: "#FFFFFF",
  backgroundColor: "#4eb5f1",
  textAlign: "center",
  transition: "all 0.2s",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};
export default ChatRoom;