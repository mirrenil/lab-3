import React, { CSSProperties, useState } from 'react';
import AddNewRoom from './AddNewRoom';
//import { Icon } from '@iconify/react';
//import { useSockets } from '../context/socket.context';


const SideBar = () => {
  const [isAddNewRoomOpen, setIsAddNewRoomOpen] = useState(false);
  //const { setUsername, currentRoom, username } = useSockets();


  const handleOnLogOut = () => {
    localStorage.removeItem('user');
    //setUsername(null)
  }

  return (
    <div style={sidebar}>
      <div>
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
        <AddNewRoom
          open={isAddNewRoomOpen}
           onClose={() => setIsAddNewRoomOpen(false)} 
        ></AddNewRoom>
      
      <button 
      className="button" 
      style={{marginBottom: "1rem"}}
      onClick={handleOnLogOut}>
        {/* <Icon icon="bx:log-out" /> */}
      </button>
    </div>
  );
};
const btn: CSSProperties = {
  height: '3.5rem',
  width: '3.5rem',
  borderRadius: '100%',
  marginLeft: '50px',
  fontSize: '2.5rem',
  color: '#333',
};

const sidebar: CSSProperties = {
  margin: '0',
  padding: '20px',
  width: '180px', //om ändras måste även margin left i ChatRoom ändras
  backgroundColor: '#777',
  position: 'absolute',
  bottom: 0,
  height: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center"
};


export default SideBar;
