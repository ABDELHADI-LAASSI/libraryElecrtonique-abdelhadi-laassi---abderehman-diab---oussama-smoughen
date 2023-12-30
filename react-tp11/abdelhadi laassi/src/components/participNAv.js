import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

export default function ParticipantnNav(){
    const navigate = useNavigate();


    function handleLogOut(){
        localStorage.removeItem('login')
        navigate('/')
    }

    return(
        <Container maxWidth="xg">
          <div>
            <nav>
              <p>logo</p>
              <ul>
                <li><Link to="/participant/formations"><button>formations</button></Link></li>
                <li><Link to="#"><button>test 3</button></Link></li>
              </ul>
              <p className="logOut" onClick={handleLogOut} >log out</p>
            </nav>
          </div>
          <div>
            <Outlet />
          </div>
          </Container>
    )
}