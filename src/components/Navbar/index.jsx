import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";

const Navbar = () => {

  const { check } = useSelector(state => state);

  const handleClick = (e) => {
    e.preventDefault();
    Cookies.remove('token');
    Cookies.remove('id');
    window.location.href = '/signin';
    return false;
  };
  
  return (
    <div className="nav-container">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/"><img src="logo192.png" id="brand-img" alt="" /></Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          {check ?
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            :
            <span />
          }
          {check ?
            <span />
            :
            <li>
              <Link to="/register">Register</Link>
            </li>
          }
          {check ?
            <li>
              <Link to="#" onClick={handleClick}>Sign out</Link>
            </li>
            :
            <li>
              <Link to="/signin">Sign in</Link>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
