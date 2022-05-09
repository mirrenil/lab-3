import { ChangeEvent, CSSProperties, FormEvent, useRef, useState } from "react";
import { useSockets } from "../Context/Socket.context";
//import ChatBubble from "./ChatBubble";
//import { Socket } from "socket.io-client";
//import SocketProvider, { ISocketContext, Message, User } from "../context/socket.context";
//import { useSockets } from '../context/socket.context';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import moment from 'moment';

// interface Room {
//     name: string;
//     members: User[];
// }

const ChatRoom = () => {
    const [value, setValue] = useState<string>("");
    const navigate = useNavigate();
    const { socket, messages, roomId, username, setMessages, roomName } = useSockets();

    const newMessageRef =  useRef<HTMLInputElement>(null);
    
    const handleSendMessage = () => {
        const inputMessage = newMessageRef.current
        let newMessage = inputMessage?.value;

        if (!String(newMessage).trim()) {
            return;
        } else {
          socket.emit("chat-message", { roomId, newMessage, username });

          setMessages([...messages,
              {
                username: "You",
                newMessage,
                time: moment().format(`HH:mm`),
              },
            ]);
            if (newMessageRef !== undefined) {
                
                newMessage = "";
            }
      }
    }
    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.target.value)
    // }

    const handleOnChange = (e: any) => {
        setValue(e.target.value);
      };

    if (!roomId) {
        return <div />;
      }
    return (
        <div style={rootstyle}>
            <div style={chatsDivStyle}>
                {/* <ChatBubble /> */}
                <p>{roomName}</p>
            </div>
            <div>
            {messages?.map(({ message, username, time }, index) => {
          return (
            <div key={index} >
              <div key={index} >
                <span >
                  {username} - {time}
                </span>
                <span >{message}</span>
              </div>
            </div>
          );
        })}
            </div>
            <form style={formStyle} >
            <textarea
          rows={1}
          placeholder="write a message"
          onChange={handleOnChange}
        />
        <button onClick={handleSendMessage}>SEND</button>
            </form>
            <button style={buttonStyle} onClick={handleSendMessage}>Leave room</button>
        </div>
    );
}

const rootstyle: CSSProperties = {
    border: "2px solid red",
    height: "60vh",
    width: "70%",
    marginLeft: "20%", //Samma som sidebarens width
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
  marginTop: "1rem"
};

export default ChatRoom;