import React, { ChangeEvent, CSSProperties, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Input() {
const [username, setUsername] = useState({});
const [value, setValue] = useState('');
const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleUsername = () => {
      setUsername(value);
      /* socket.auth = { username: value }; */
      localStorage.setItem('user', value);
      navigate('/')
     
  };

    return (
        <div style={rootstyle}>
            <h3>Choose your username:</h3>
            <form onSubmit={handleUsername}>
                <input
                    style={inputStyle}
                    type="text"
                    value={value}
                    onChange={handleOnChange} 
                    minLength={3}
                />
                <button className="button" type="submit">
                    Done
                </button>
            </form>
        </div>
    )
}

const rootstyle: CSSProperties = {
    position: 'fixed',
    top: '40%',
    left: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: "column"
};

const inputStyle: CSSProperties = {
    borderRadius: '100px',
    border: 'none',
    height: '3rem',
    width: '15rem',
    marginRight: '1rem',
};

