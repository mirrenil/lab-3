import { CSSProperties, useRef, useState } from 'react';
import { useSockets } from '../Context/Socket.context';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

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
    sendMessage,
    roomId,
  } = useSockets();
  const newMessageRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('socketid: ', socket.id);
    //sendMessage(value);
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
        time: moment().format(`HH:mm`),
      },
    ]);
    if (newMessageRef && newMessageRef.current) {
      newMessageRef.current.value = '';
    }
    console.log(message);
    console.log(messages);
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
      <div style={chatsDivStyle}>
        {/* <ChatBubble /> */}
        <p>{currentRoom}</p>
      </div>
      <div>
        <div>
          {messages.map(({ message, username, time }, index) => {
            return (
              <div key={index}>
                <div key={index}>
                  <span>
                    {username} - {time}
                  </span>
                  <br />
                  <span>{message}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <form style={formStyle} onSubmit={handleSubmit}>
            <input
              value={value}
              onChange={handleChange}
              style={inputStyle}
              type="text"
              placeholder="Join the conversation..."
              ref={newMessageRef}
            />
          </form>
          <button style={buttonStyle} onClick={handleOnLeave}>
            Leave room
          </button>
          {/* <input
          placeholder="write a message"
          onChange={handleChange}
          
        />
        <button onClick={handleSendMessage}>SEND</button> */}
        </div>
      </div>
      {/* <button style={buttonStyle} onClick={handleOnLeave}>Leave room</button> */}
      {/* <form style={formStyle} onSubmit={handleSubmit} >
                <input value={value} onChange={handleChange} style={inputStyle} type="text" placeholder="Join the conversation..." ref={newMessageRef}/>
            </form>
            <button style={buttonStyle} onClick={handleOnLeave}>Leave room</button> */}
    </div>
  );
};

const rootstyle: CSSProperties = {
  border: '2px solid red',
  height: '60vh',
  width: '70%',
  marginLeft: '20%', //Samma som sidebarens width
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle: CSSProperties = {
  width: '60%',
  borderRadius: '50px',
  border: 'none',
  height: '2.5rem',
  background: 'rgba(255, 255, 255, 0.3)',
};

const chatsDivStyle: CSSProperties = {
  border: '2px solid blue',
  height: '85%',
  width: '60%',
  marginBottom: '2rem',
};

const formStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: '10%',
};

export const buttonStyle: CSSProperties = {
  padding: '0.5em 1.5em',
  margin: '0 0.3em 0.3em 0',
  borderRadius: '2em',
  color: '#FFFFFF',
  backgroundColor: '#4eb5f1',
  textAlign: 'center',
  transition: 'all 0.2s',
  fontSize: '1rem',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '1rem',
};

export default ChatRoom;
