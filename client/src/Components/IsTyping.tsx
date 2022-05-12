import { CSSProperties } from "react";
import { useSockets } from "../Context/Socket.context";

 const IsTyping = () => {
    const { isTyping, username } = useSockets();



    return <div style={rootStyle}>{isTyping}</div>
};

const rootStyle: CSSProperties = {
    color: '#f1f1f16c',
    marginLeft: '1.3rem',
    fontSize: '.8rem',
    fontWeight: 'thin',
    
}
export default IsTyping;