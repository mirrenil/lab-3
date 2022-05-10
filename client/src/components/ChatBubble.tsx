import { CSSProperties } from 'react';
import { useSockets } from '../Context/Socket.context';
//import {useSockets} from '../context/socket.context'

// interface Message {
// userName: string;
// message: string;
// }

// interface chatBubble {
//   message: Message; 
// }
const ChatBubble = () => {
    const { username, socket, sendMessage } = useSockets();
  return (
    <>
      <span style={usernameStyle}>{username}</span>
      <div style={rootStyle}>
          <p style={textStyle}>Lorem ipsum dolor sit amet</p>

      </div>
    </>
  );
};

const rootStyle: CSSProperties = {
  height: '3rem',
  width: '11rem',
  background: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '20px 0px 20px 20px',
  padding: '3px',
  margin: ".5rem",
};

const usernameStyle: CSSProperties = {
  fontSize: '11px',
  color: '#333',
  letterSpacing: '1px',
  textAlign: 'right',
  margin: ".8rem"
};

const textStyle: CSSProperties = {
    fontSize: "12px",
    color: 'black',
    margin: ".5rem"


}
export default ChatBubble;
