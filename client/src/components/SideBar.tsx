import React, { CSSProperties, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewRoom from './NewRoom';
import { useSockets } from '../Context/Socket.context';
import './Style/SideBar.css';
import { BiLogOutCircle } from "react-icons/bi";
import { Icon } from '@iconify/react';
import userEvent from '@testing-library/user-event';

interface Props {
  children?: React.ReactNode;
}

const SideBar = ({ children }: Props) => {
  const [isAddNewRoomOpen, setIsAddNewRoomOpen] = useState(false);
  const {
    username,
    rooms,
    roomId,
    socket,
    currentRoom,
    allUsersOnline,
    usersInRoom,
  } = useSockets();
  const navigate = useNavigate();

  const handleOnLogOut = () => {
    navigate('/');
    window.location.reload();

  };



  const handleJoinRoom = (key: any) => {
    socket.emit('JOIN_ROOM', key);

    if (currentRoom) {
      socket.emit('LEAVE_ROOM', currentRoom);
    }
  };

  return (
    <div className="sideBar-container">
      <div>
        <div className="usernameDiv">
          <div className="user-icon"> {username?.charAt(0)} </div>
          <h1 className="name">{username}</h1>
        </div>
        <div className="create-room">
          <button onClick={() => setIsAddNewRoomOpen(true)}>
            +
          </button>

        </div>
        <div className="available-rooms-container">
          <h5 className="available-rooms-header">Open rooms</h5>

          <ul className="rooms-list">
            {rooms.map((room) => {
              return (
                <div key={room}>
                  <button
                    className='button room-list-button'

                    disabled={room === roomId}
                    onClick={() => handleJoinRoom(room)}
                    title={`Join ${room}`}
                  >
                    {room}
                  </button>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="online-users-container">
          <h5>online Users : {allUsersOnline.length}</h5>
          {allUsersOnline.map((user: any) => {
            return (

              <div className='online-users-list' key={user.username}>
                <p className="user-list-icon"> {user.username.charAt(0)} </p>
                <h3 className='online-user'> {user.username} </h3>
              </div>
            );
          })}

        </div>
        <div className="logout">
          <BiLogOutCircle
            onClick={handleOnLogOut}
            className="logout-icon"
          />
        </div>

        {/* <div className='room-users-container'>
          <h5 className = 'room-users-title'>{!currentRoom ? "" : "Users in room:"}{usersInRoom.length}</h5>
          <UsersDiv />
        </div> */}
      </div>

      <NewRoom
        open={isAddNewRoomOpen}
        onClose={() => setIsAddNewRoomOpen(false)}
      ></NewRoom>
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
  border: 'none',
  color: '#fff',
  fontWeight: 'bold',
  height: '3rem',
  width: '5rem',
  fontSize: '1rem',
  marginBottom: '8rem',
  backgroundColor: 'transparent',
};

export default SideBar;
