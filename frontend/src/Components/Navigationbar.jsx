import react from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigationbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    }

    return (<nav>
        
        <Link to="/index">Home</Link>
        <button onClick={handleLogout}>logout</button>
        
    </nav>);
}

export default Navigationbar;
