import { CSSProperties } from "react";
import { useSockets } from "../Context/Socket.context";

 const IsTyping = () => {
    const { isTyping, username } = useSockets();

    return <div style={rootStyle}>{isTyping}...</div>
};

const rootStyle: CSSProperties = {
    color: '#444',
    marginLeft: '1.3rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    
}
export default IsTyping;