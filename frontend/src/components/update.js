// UpdateUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.id;
  const token = state?.token; // Get the ID from state

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUserData();
  }, [id, token, navigate]);

  const updateUser = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setMsg("Username dan email harus diisi!");
      return;
    }
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        password,
        confPassword,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form className="box" onSubmit={updateUser}>
                {msg && (
                  <div className="notification is-danger is-light">{msg}</div>
                )}
                <div className="field mt-5">
                  <div className="label">Username</div>
                  <div className="controls">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Username"
                      className="input"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="label">Email</div>
                  <div className="controls">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email"
                      className="input"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="label">Password</div>
                  <div className="controls">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="******"
                      className="input"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="label">Confirm Password</div>
                  <div className="controls">
                    <input
                      value={confPassword}
                      onChange={(e) => setconfPassword(e.target.value)}
                      type="password"
                      placeholder="******"
                      className="input"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Update
                  </button>
                </div>
                <div className="field mt-3">
                  <button
                    className="button is-info is-fullwidth"
                    type="button"
                    onClick={() => navigate("/dashboard")}
                  >
                    Kembali ke Dashboard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
