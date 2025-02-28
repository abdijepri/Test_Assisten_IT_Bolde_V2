import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUserById();
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
      setId(decoded.userId);
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

  const getUserById = async () => {
    try {
      const response = await axiosJWT.get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-content">
          <p className="subtitle is-5">
            Selamat Datang,{" "}
            <span className="title is-4 has-text-weight-bold">{name}</span>
          </p>
          <h2 className="subtitle is-6">Dashboard Anda :</h2>
          <div className="media is-align-items-center is-justify-content-center">
            <div className="media-left">
              <figure className="image is-128x128">
                <img src="/profile.png" alt="Profile Icon" />
              </figure>
            </div>
          </div>

          {user ? (
            <>
              <div className="content has-text-centered">
                <p>
                  <strong>Nama:</strong> {name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}

          <div className="buttons is-centered mt-3">
            <button
              className="button is-info is-medium"
              onClick={() => navigate("/update")}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
