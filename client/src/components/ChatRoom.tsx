import { CSSProperties, useRef, useState } from 'react';
import { useSockets } from '../Context/Socket.context';
import { useNavigate } from 'react-router-dom';
import ChatBubble from "./ChatBubble";  
import { Icon } from '@iconify/react';      
import moment from 'moment';
import { time } from 'console';


const ChatRoom = () => {
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();
  const {
    socket,
    username,
    leaveRoom,
    messages,
    setMessages,
    currentRoom,
    roomId,
  } = useSockets();

  const newMessageRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  function handleSendMessage(e: any) {
    const message = newMessageRef.current?.value;

    e.preventDefault();
    // const message = value

    if (!String(message).trim()) {
      return;
    }

    socket.emit('SEND_ROOM_MESSAGE', { roomId, message, username });

    setMessages([
      ...messages,
      {
        username: 'You',
        message,
        time: moment().calendar(),
      },
    ]);
    if (newMessageRef && newMessageRef.current) {
      newMessageRef.current.value = '';
    }
    console.log(message);
    console.log(messages);
    setValue('');
  }

  const handleOnLeave = () => {
    leaveRoom();
    navigate('/lobby');
  };
  if (!roomId) {
    return <div />;
  }

  return (
    <div style={rootstyle}>
       <button style={buttonStyle} onClick={handleOnLeave}>
           <Icon icon="bx:log-out" />
          </button>
      <p>{currentRoom} name of room here</p>
      <div style={chatsDivStyle} >

       {messages.map(({ message, username, time }, index) => {
          return ( <ChatBubble key={index} message={message} username={username} time={time} /> );
       })}

      </div>
        <div>
          <form style={formStyle} onSubmit={handleSendMessage}>
            <input
              value={value}
              onChange={handleChange}
              style={inputStyle}
              type="text"
              placeholder="Join the conversation..."
              ref={newMessageRef}
            />
          </form>
      </div>
    </div>
  );
};

const rootstyle: CSSProperties = {
  backgroundColor: '#999',
  borderRadius: '10px',
  height: '75vh',
  width: '550px',
  marginLeft: '30%', //Samma som sidebarens width
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
 
};

const inputStyle: CSSProperties = {
    width: "300px",
    borderRadius: "50px",
    border: 'none',
    height: '2.5rem',
    background: "rgba(255, 255, 255, 0.3)",
    paddingLeft: "5%",
    marginBottom: "20px",
}


const chatsDivStyle: CSSProperties = {

    border: '2px solid #666',
    borderRadius: '10px',
    height: "85%",
    maxHeight: "50rem",
    width: "60%",
    marginBottom: "2rem",
    marginTop: "1rem",
    overflow: "scroll"
}
        

const formStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: '10%',
};

export const buttonStyle: CSSProperties = {
  padding: "0.5em 1.5em",
  borderRadius: "2em",
  color: "#FFFFFF",
  backgroundColor: "transparent",
  textAlign: "center",
  transition: "all 0.2s",
  fontSize: "2rem",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "1.5rem",
  left: "250px",
  top: "140px",
};

export default ChatRoom;
