import { CSSProperties } from "react";
import { useSockets } from "../Context/Socket.context";

 const IsTyping = () => {
    const { isTyping} = useSockets();



    return <div style={rootStyle}>{isTyping}</div>
};

const rootStyle: CSSProperties = {
    color: '#fff',
    marginLeft: '1.3rem',
    fontSize: '.8rem',
    fontWeight: 'thin',
    
}
export default IsTyping;