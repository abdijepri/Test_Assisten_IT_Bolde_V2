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
      setId(decoded.userID);
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
      <h1>Selamat Datang: {name}</h1>
      <div className="box">
        {user ? (
          <>
            <h2>User Details</h2>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <div className="field mt-3">
        <button
          className="button is-info is-fullwidth"
          type="button"
          onClick={() => navigate("/update", { state: { id, token } })}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
