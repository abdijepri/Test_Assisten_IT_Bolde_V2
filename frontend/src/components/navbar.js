import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const LogOut = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://www.boldestore.com" target="_blank" rel="noopener noreferrer">
            <img
              alt=""
              src="https://www.boldestore.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.cf6c666b.png&w=256&q=75"
              
            />
          </a>

        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href=" " className="navbar-item">
              Home
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href=" " onClick={LogOut} className="button is-light">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
