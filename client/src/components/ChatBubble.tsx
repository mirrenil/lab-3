import { CSSProperties } from 'react';
//import {useSockets} from '../context/socket.context'

interface Message {
userName: string;
message: string;
}

interface chatBubble {
  message: Message; 
}
const ChatBubble = (props: chatBubble) => {
   // const { username, socket } = useSockets();
    const { message } = props;
  return (
    <>
      <span style={usernameStyle}>{/* {username}  */}</span>
      <div style={rootStyle}>
          <p style={textStyle}>Lorem ipsum dolor sit amet</p>
            <p style={textStyle}>{message.userName}</p>
          <p style={textStyle}>{message.message}</p>

      </div>
    </>
  );
};

const rootStyle: CSSProperties = {
  height: '4rem',
  width: '15rem',
  background: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '20px 0px 20px 20px',
  padding: '3px'
};

const usernameStyle: CSSProperties = {
  fontSize: '11px',
  fontWeight: 'lighter',
  letterSpacing: '1px',
  textAlign: 'right',
};

const textStyle: CSSProperties = {
    fontSize: "12px",
    color: 'black',

}
export default ChatBubble;
