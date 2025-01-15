import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/scss/loginPage.scss";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user, password);
      navigate("/");
    } catch (error) {
      alert("OOooopss! Login Failed!");
      setUser("");
      setPassword("");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input type="submit" value={"Login"} />
        <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
          Click here to continue without logging in.
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
