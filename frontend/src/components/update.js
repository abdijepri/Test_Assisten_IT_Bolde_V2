// UpdateUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setEmail(decoded.email);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expired * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setExpired(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const updateUser = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setMsg("Username dan email harus diisi!");
      return;
    }
    const refreshedToken = await axiosJWT.get("http://localhost:5000/token");
    setToken(refreshedToken.data.accessToken);
    try {
      await axiosJWT.patch(
        `http://localhost:5000/users/update`,
        {
          name,
          email,
          password,
          confPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
