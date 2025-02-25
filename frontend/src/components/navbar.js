import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const LogOut = () => {
    setShowNotification(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      setShowNotification(false); 
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelLogout = () => {
    setShowNotification(false);
  };

  return (
    <>
      {showNotification && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Konfirmasi Logout</p>
              <button className="delete" aria-label="close" onClick={handleCancelLogout}></button>
            </header>
            <section className="modal-card-body">
              <p>Apakah Anda yakin ingin logout?</p>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={handleConfirmLogout}>
                Ya, Logout
              </button>
              <button className="button mx-3" onClick={handleCancelLogout}>
                Batal
              </button>
            </footer>
          </div>
        </div>
      )}

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
                  <a href=" " onClick={(e) => { e.preventDefault(); LogOut(); }} className="button is-light">LogOut</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
