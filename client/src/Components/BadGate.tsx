import { Link } from "react-router-dom";

 function BadGate() {

    return (
        <div className="">
            <h3>
               
                404: We can't find what you're looking for..
            </h3>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <button>Return to the Homepage</button>
            </Link>
        </div>)
}

export default BadGate;