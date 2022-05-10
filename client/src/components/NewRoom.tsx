import { ChangeEvent, CSSProperties, FormEvent, useState } from 'react'
import ReactDOM from 'react-dom'
import {  useNavigate } from 'react-router';
import { useSockets } from "../Context/Socket.context";

type Modal = {
  onClose: () => void;
  open: boolean;
}

const NewRoom = ({ open, onClose }: Modal) => {
  const [roomName, setNewRoomName] = useState<string>('');
  const { socket, username } = useSockets();

  const navigate = useNavigate();


  if (!open) return null;

  //skicka med username och value
 
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNewRoomName(roomName)
    onClose();
    navigate('/chat');
    console.log('Room created!');
    return;
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRoomName(e.target.value);
  };

  const handleCreateRoom = () => {
    //get the room name
    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit("CREATE_ROOM", { roomName, username }, (response: string) => {
      console.log(response)
    });
    
    console.log(username);
    // set room name input to empty string
  }
  
return ReactDOM.createPortal(
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>
            Create a new room
          </h2>
          <form onSubmit={handleOnSubmit}>
            <input
              style={{ width: '100%', height: '3rem', marginBottom: '1rem', fontSize: '1.5rem' }}
              type="text"
              value={roomName}
              onChange={handleOnChange}
              name="roomName"
              id="roomName"
              required
            />
            <button style={submitButtonStyle} onClick={handleCreateRoom}>
              Create room
            </button>
          </form>
        </div>
        <button style={closeButtonStyle}>
          X
        </button>
      </div>
    </>,
    document.getElementById('portal')!
  );
}

const modalStyles: CSSProperties = {
  position: 'fixed',
  top: '56%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#999',
  padding: '50px',
  zIndex: 1000,
  width: '30rem',
  borderRadius: '22px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const overlayStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .8)',
  zIndex: 1000,
};

const closeButtonStyle: CSSProperties = {
  position: 'fixed',
  padding: '0',
  top: '10px',
  left: '5px',
  height: '2.5rem',
  width: '2.5rem',
  background: 'transparent',
  border: 'none',
};

const submitButtonStyle: CSSProperties = {
  height: '2.5rem',
  width: '5rem',
  color: 'white',
  backgroundColor: '#777',
  border: 'none',
  borderRadius: '10px',
  fontSize: '1.3rem',
};

export default NewRoom;