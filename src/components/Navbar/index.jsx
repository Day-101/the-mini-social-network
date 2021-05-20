import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {

  const handleClick = (e) => {
    e.preventDefault();
    Cookies.remove('token');
    Cookies.remove('id');
    window.location.href = '/signin';
    return false;
  };
  
  return (
    <div>
      <nav className="container navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users/me">Profile</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
          <li>
            <Link to="#" onClick={handleClick}>Sign out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
