import React, { useContext, useEffect, useState } from 'react';
import "./navbar.scss";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SocketContext from '../../../Context/SocketContext';

const Navbar = () => {
  const [modal, setopenmodal] = useState(false);
  const navigate = useNavigate();
  const{socket} = useContext(SocketContext);
  const handleEditProfile = () => {
    setopenmodal(false)
    navigate('/home/edit-profile');
  };
  

const handlelogout = () =>{
  try {
    sessionStorage.clear();
    socket.disconnect();
    navigate("/login");
  } catch (error) {
    console.log("error " ,error)
  }
}
 

  return (
    <>
      <div className='nav-container'>
        <div>
       <h3 style={{color:"white"}}>TeamUp</h3>
        </div>
        <div className="navbar">
          <ul>
            <Link to="/home">Home</Link>
            <Link to="/home/teams">Teams</Link>
            <Link to="/home/hackathons">Hackathons</Link>
            <Link to="/home/messages">Messages</Link>
          </ul>
          <div className="search-bar">
            <form action="">
              <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
              <input type="text" placeholder='Search' />
            </form>
          </div>
        </div>

        <div className='profile-dropdown'>
          <div className="circle"></div>
          <div style={{color:"white"}} className="Me">
            Me <FontAwesomeIcon
              onClick={() => setopenmodal(!modal)}
              className='triangle-down' icon={faCaretDown} />
            <div className={`modaloverlay ${modal ? 'modalshow' : ''}`}>
              <button onClick={handleEditProfile}>Edit profile</button>
              <br />
              <button onClick={handlelogout}>Logout</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
