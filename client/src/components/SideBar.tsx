import React, { CSSProperties, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewRoom from './NewRoom';
import { useSockets } from '../Context/Socket.context';
import { Icon } from '@iconify/react';

const SideBar = () => {
  const [isAddNewRoomOpen, setIsAddNewRoomOpen] = useState(false);
  const { username, rooms, roomId, socket, currentRoom, allUsersOnline } =
    useSockets();
  const navigate = useNavigate();

  const handleOnLogOut = () => {
    //localStorage.removeItem('user');
    //setUsername(null)
    navigate('/');
  };

  const handleJoinRoom = (key: any) => {
    console.log('ROOM JOIN START');
    console.log(key);
    socket.emit('JOIN_ROOM', key);

    if (currentRoom) {
      socket.emit('LEAVE_ROOM', currentRoom, (response: string) => {
        console.log(`${response} and joined ${key}`);
      });
    }
    console.log('ROOM JOIN END');
  };

  return (
    <div style={sidebar}>
      <div>
        {/* <img src={user} alt="User" /> */}
        <h1 style={{ marginTop: '9rem' }}>{username}</h1>
        <h5>Open rooms</h5>
        <ul>
          {Object.keys(rooms).map((key: any) => {
            return (
              <div key={key}>
                <button
                  disabled={key === roomId}
                  onClick={() => handleJoinRoom(key)}
                  title={`Join ${rooms[key].name}`}
                >
                  {rooms[key].name}
                </button>
              </div>
            );
          })}
        </ul>

        <div>
          <h5>Users online:</h5>
          {allUsersOnline.map((user: any) => {
            return <p key={user.username}>{user.username}</p>;
          })}
        </div>

        <button style={btn} onClick={() => setIsAddNewRoomOpen(true)}>
          +
        </button>
      </div>

      <NewRoom
        open={isAddNewRoomOpen}
        onClose={() => setIsAddNewRoomOpen(false)}
      ></NewRoom>

      <button style={signOut} onClick={handleOnLogOut}>
        <Icon icon="bx:log-out" />
      </button>
    </div>
  );
};
const btn: CSSProperties = {
  height: '3.5rem',
  width: '3.5rem',
  borderRadius: '100%',
  fontSize: '2.5rem',
  color: '#333',
  marginTop: '3rem',
};

const sidebar: CSSProperties = {
  padding: '20px',
  width: '180px', //om ändras måste även margin left i ChatRoom ändras
  backgroundColor: '#888',
  position: 'absolute',
  bottom: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const signOut: CSSProperties = {
  borderRadius: '50px',
  height: '2.3rem',
  width: '4.5rem',
  marginBottom: '8rem',
};

export default SideBar;
