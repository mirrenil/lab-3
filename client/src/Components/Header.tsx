import { CSSProperties} from 'react';
//import chatLogo from 'chat.png';


const Header = () => {


  return (
    <div style={headerStyle}>
      <div style={{ display: 'flex' }}>
        <h1 style={{ fontSize: "3rem"}}>Chat App - ʧæt æp</h1>
       {/*  <img style={logo} src={chatLogo} alt="Chat logo" /> */}
      </div>
    </div>
  );
};


// const logo: CSSProperties = {
//   width: '75px',
//   height: '60px',
// };

const headerStyle: CSSProperties = {
backgroundColor: "#202027",
display: "flex",
justifyContent: "center",
height: "8rem",
margin: "0",
color: "white",
}

export default Header;