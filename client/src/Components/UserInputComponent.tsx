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
    
     
  };

  return (
      <div style={rootstyle}>
        <p>Choose your username:</p>
        <form onSubmit={handleOnSubmit}>
          <input
            style={inputStyle}
            type="text"
            value={value}
            onChange={handleOnChange}
            minLength={3}
          ></input>
          <button className="button" type="submit">
            Done
          </button>
        </form>
      </div>
  );
};

const rootstyle: CSSProperties = {
  width: '30rem',
  height: '10rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'column',
};

const inputStyle: CSSProperties = {
  borderRadius: '100px',
  height: '2rem',
  width: '10rem',
  marginRight: '1rem',
  padding: '.3em'
};

export default UserInputComponent;
