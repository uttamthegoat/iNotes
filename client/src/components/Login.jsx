import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import {host} from '../utils';

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      // save the auth token
      localStorage.setItem("token", data.authToken);
      navigate("/");
    } else {
      alert("Invalid creds");
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "iNotes - Login";
  }, []);
  return (
    <div className="container">
      <h1 className="mt-5">Login</h1>
      <form className="signupform" onSubmit={handleSubmit}>
        <label htmlFor="email">Enter E-mail address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={handleLoginChange}
          required
        />
        <label htmlFor="password">Enter password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p className="mx-auto mt-5">Don't have an account?</p>
        <Link to="/signup" className="d-block mx-auto mt-1">Sign Up</Link>
      </form>
    </div>
  );
}
