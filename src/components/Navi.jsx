import { useContext, useEffect, useState } from "react";
import "../assets/scss/navi.scss";
import DataContext from "../context/DataContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navi = () => {
  const { state, dispatch } = useContext(DataContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getCurrentUser = async () => {
    const url = "https://api.escuelajs.co/api/v1/auth/profile";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).access_token
        }`,
      },
    });
    const user = response.data;
    setCurrentUser(user);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      getCurrentUser();
    }
  }, []);
  return (
    <>
      <nav className="navbar">
        <img className="navbar-logo" src="../public/logo.jpg" alt="" />

        <div className="userarea">
          {currentUser && (
            <div className="user-card">
              <img src={currentUser.avatar} alt="" />
              <div className="user-text">
                <span>
                  {currentUser.email}/{currentUser.role}
                </span>
              </div>
            </div>
          )}
          <button onClick={isAuthenticated ? handleLogout : handleLogin}>
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>

        <div className="navbar-search">
          <button className="search-btn">🔍</button>

          <input
            onChange={(e) =>
              dispatch({ type: "search", payload: e.target.value })
            }
            value={state.search}
            type="text"
            placeholder="Ara..."
          />
        </div>
      </nav>
    </>
  );
  <Outlet />;
};

export default Navi;
