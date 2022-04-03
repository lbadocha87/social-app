import './AppNav.css';

import { Link } from "react-router-dom";
import axios from "axios";


const AppNav = (props) => {


  const handleLogout = (e) => {
    e.preventDefault();
  
      axios
        .post(
          "http://akademia108.pl/api/social-app/user/logout"
        )
        .then((req) => {
          let reqData = req.data;
          if(reqData.message) {
            localStorage.setItem('user', null);
            props.setUser(null)
          }
       
        })
        .catch((error) => {
          localStorage.setItem('user', null);
            props.setUser(null)
          console.error(error);
        });
    
  }

  return (
    <nav className="mainNav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!props.user && <li>
          <Link to="/login">Login</Link>
        </li>}
        {!props.user && <li>
          <Link to="/signup">SignUp</Link>
        </li>}
        {props.user && <li>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>}
      </ul>
    </nav>
  );
};

export default AppNav;
