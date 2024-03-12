import React, { useEffect, useState } from 'react';
import './Header.css'; // Import the CSS file for styling
import { Dropdown } from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom';
const Header=() => {
const username="Charan"
const [showDropdown, setShowDropdown] = useState(false);
const [isLoggedIn,setIsLoggedIn]=useState(false)
const user=localStorage.getItem("token")
const navigate=useNavigate()
const toggleDropdown = () => {
  setShowDropdown(!showDropdown);
};

const handleProfile = () => {
  setShowDropdown(false); 
};
const handleLogout = () => {
  localStorage.removeItem("token")
  setShowDropdown(false); 
  setIsLoggedIn(false)
  navigate("/")

};
const handleLogin=()=>{
  navigate("/login")
}
  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/images/logo.png" className="Logo" alt="Logo" />
        <span className="title">Codewars</span>
      </div>
      {user?<nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><a href="/home">Home</a></li>
          <li className="nav-item"><a href="/problems">Problems</a></li>
          <li className="nav-item"><a href="/contests">Contests</a></li>
          <li className="nav-item"><a href="/interview-experiences">Interview Experiences</a></li>
          <li className="nav-item"><a href="/discuss">Discuss</a></li>
        </ul>
      </nav>:''}
      <div className="user-actions">
        {user ? (
          <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
            <div className="circle-icon" onClick={toggleDropdown}>
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="dropdown-content">
              <button className='profile-btn' onClick={handleProfile}>Profile</button>
              <button className="logout-btn"onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <>

            <button className=" btn login-btn"onClick={handleLogin}>Login</button>
            <button className="btn signup-btn" onClick={()=>navigate("/signup")}>Signup</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
