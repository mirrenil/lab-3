import ReactDOM from 'react-dom';
import { useState, CSSProperties, useEffect, useRef } from 'react';
import { useSockets } from '../Context/Socket.context';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const UserInputComponent = () => {
  const { username, setUsername, socket } = useSockets();
  const [value, setValue] = useState<string>('');
  const parent = useRef<Element>();



  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleOnSubmit = () => {
      setUsername(value);
      socket.auth = { username: value };
      socket.connect();
      // manager.open(); 
    
     
  };

  return (
      <div style={rootstyle}>
        <p>Choose your username</p>
        <form onSubmit={handleOnSubmit}>
          <input
            style={inputStyle}
            type="text"
            value={value}
            onChange={handleOnChange}
            minLength={3}
          ></input>
          <button style={btnStyle} type="submit">
            Done
          </button>
        </form>
      </div>
  );
};

const rootstyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'column',
  color: 'white',
  position: 'absolute',
};

const inputStyle: CSSProperties = {
  borderRadius: '1em',
  height: '2rem',
  width: '10rem',
  marginRight: '1rem',
  padding: '.5em',
  fontSize: '1.2em'
};
const btnStyle: CSSProperties = {
  borderRadius: '100px',
  height: '3rem',
  width: '5rem',
  marginRight: '1rem',
  padding: '.3em',
  cursor: 'pointer',
  backgroundColor: '#0acef123',
  color: '#FFFFFF'
};

export default UserInputComponent;
