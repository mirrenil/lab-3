import { CSSProperties } from "react";
import { useSockets } from "../Context/Socket.context";

 const IsTyping = () => {
    const { isTyping, username } = useSockets();

    return <div style={rootStyle}>{username} is typing...</div>
};

const rootStyle: CSSProperties = {
    color: '#444',
    marginLeft: '1.3rem',
    fontSize: '.8rem',
    fontWeight: 'thin',
    
}
export default IsTyping;