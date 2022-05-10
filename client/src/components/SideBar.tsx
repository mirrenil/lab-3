import React, { CSSProperties, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewRoom from './NewRoom';
import { useSockets } from '../Context/Socket.context';
import  './Style/SideBar.css';
import { FaUserAlt } from "react-icons/fa";


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
    <div className="sideBar-container">
      <div>
        <div className="usernameDiv">
          <FaUserAlt className="user-icon" />
          <h1 className='name'>{username}</h1>
        </div>
        <div className="available-rooms-container">
          <h5 className="available-rooms-header">Open rooms</h5>
          <ul >
          {Object.keys(rooms).map((key: any) => {
            return (
              <div key={key}>
                <button
                  className = 'button room-list-button'
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
        </div>
        

        <div>
          <h5>Users online:</h5>
          {allUsersOnline.map((user: any) => {
            return <p key={user.username}>{user.username}</p>;
          })}
        </div>

        <button  onClick={() => setIsAddNewRoomOpen(true)}>
          +
        </button>
      </div>

      <NewRoom
        open={isAddNewRoomOpen}
        onClose={() => setIsAddNewRoomOpen(false)}
      ></NewRoom>

      <button  onClick={handleOnLogOut}>
        Sign out
      </button>
    </div>
  );
};
// const btn: CSSProperties = {
//   height: '3.5rem',
//   width: '3.5rem',
//   borderRadius: '100%',
//   fontSize: '2.5rem',
//   color: '#333',
//   marginTop: '3rem',
// };

// const sidebar: CSSProperties = {
//   padding: '20px',
//   width: '180px', //om ändras måste även margin left i ChatRoom ändras
//   backgroundColor: '#888',
//   position: 'absolute',
//   bottom: 0,
//   height: '100%',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// };
// const signOut: CSSProperties = {
//   borderRadius: '50px',
//   border: 'none',
//   color: "#fff",
//   fontWeight: "bold",
//   height: '3rem',
//   width: '5rem',
//   fontSize: "1rem",
//   marginBottom: '8rem',
//   backgroundColor: 'transparent',
// };

export default SideBar;
