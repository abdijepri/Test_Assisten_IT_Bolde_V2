import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setMsg("Username dan email harus diisi!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/");
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
              <form className="box" onSubmit={Register}>
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
                    ></input>
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
                    ></input>
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
                    ></input>
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
                    ></input>
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Register
                  </button>
                </div>
                <div className="field mt-3">
                  <button
                    className="button is-info is-fullwidth"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Login
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

export default Register;
