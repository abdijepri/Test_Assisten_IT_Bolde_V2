import Login from "./components/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import UpdateUser from "./components/update";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<UpdateUser />} />
          <Route path="/dashboard" element={<>
                <Navbar />
                <Dashboard />
              </>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
