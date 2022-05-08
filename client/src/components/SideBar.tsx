import React, { CSSProperties, useState } from 'react';
import NewRoom from './NewRoom';
//import { Icon } from '@iconify/react';

//import { useSockets } from '../context/socket.context';
//import user from '../lady.png';


const SideBar = () => {
  const [isAddNewRoomOpen, setIsAddNewRoomOpen] = useState(false);
  //const { setUsername, currentRoom, username, rooms, setCurrentRoom } = useSockets();
  const navigate = useNavigate();


  const handleOnLogOut = () => {
    localStorage.removeItem('user');
    //setUsername(null)
    navigate('/');
  }

  return (
    <div style={sidebar}>
      <div>
       {/* <img src={user} alt="User" /> */}
        <h1 style={{marginTop: "5rem"}}>username</h1>
        
        <h3>Fler rum</h3>
        <h3>Fler rum</h3>
        <h3>Fler rum</h3>
        {/* <div>
          {rooms.length ? (
            rooms.map((room) => <AvailableRooms key={room.name} room={room} />)
          ) : (
            <span>No rooms to join</span>
          )}
        </div> */}
          <button style={{border: 'none', backgroundColor: 'transparent', fontSize: "1.5rem", marginTop: "2rem"}}>currentRoom</button>
  

        <button style={btn} onClick={() => setIsAddNewRoomOpen(true)}>
          +
        </button>
        </div>
        <NewRoom
          open={isAddNewRoomOpen}
           onClose={() => setIsAddNewRoomOpen(false)} 
        ></NewRoom>
      
      <button 
      style={signOut} 
      onClick={handleOnLogOut}>
         <Icon icon="bx:log-out" />
      </button>
    </div>
  );
};
const btn: CSSProperties = {
  height: '3.5rem',
  width: '3.5rem',
  borderRadius: '100%',
  marginLeft: '60px',
  fontSize: '2.5rem',
  color: '#333',
  marginTop: '2rem',
};

const sidebar: CSSProperties = {
  margin: '0',
  padding: '20px',
  width: '180px', //om ändras måste även margin left i ChatRoom ändras
  backgroundColor: '#777',
  position: 'absolute',
  bottom: 0,
  top: "3rem",
  height: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center"
};
const signOut: CSSProperties = {
  border: 'none',
  borderRadius: "50px",
  height: "2rem",
  width: "3.5rem",
  marginBottom: "8rem",
}

export default SideBar;
