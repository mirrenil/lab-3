import { CSSProperties } from 'react';
import { useSockets } from '../Context/Socket.context';
//import {useSockets} from '../context/socket.context'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface Props {
  message: string,
  username: string, 
  time: string
}



const ChatBubble = (props: Props) => {
  const navigate = useNavigate();


  const {
    socket,
    username,
    messages,
    roomId,

  } = useSockets();

  const test = () => {
    if (username === "you") {
      return true;
    } else return false;
    
  }

  return (
    <>
      <span style={usernameStyle}>{username}</span>
      <div style={!test ? rootStyle : myMessageStyle}>
            <div style={textStyle}>
            <div>
                  <span>
                    {props.username} - {props.time}
                  </span>
                  <br />
                  <span>{props.message}</span>
                </div>
        </div>

      </div>
    </>
  );
};

const rootStyle: CSSProperties = {
  height: '3rem',
  width: '90%',
  background: `rgba(255, 255, 255, 0.3)`,
  borderRadius: '20px 20px 20px 20px',
  padding: '3px',
  margin: ".5rem",
};

const myMessageStyle: CSSProperties = {
    height: '3rem',
  width: '90%',
  background: `red`,
  borderRadius: '20px 20px 20px 20px',
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
