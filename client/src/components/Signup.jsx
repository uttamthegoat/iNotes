import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSignup = async (e) => {
    e.preventDefault();
    let response = await fetch('https://inotes-server.vercel.app/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      }),
    });
    let data = await response.json();
    if (data.success) {
      // save the auth token
      localStorage.setItem("token", data.authToken);
      navigate("/");
    } else {
      alert("Invalid creds");
    }
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "iNotes - Signup";
  }, []);
  return (
    <div className="container">
      <h1 className="mt-5">Signup</h1>
      <form className="signupform" onSubmit={handleSignup}>
        <label htmlFor="name">Enter Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={signupData.name}
          onChange={handleSignupChange}
          required
        />
        <label htmlFor="signemail">Enter E-mail address</label>
        <input
          type="email"
          name="email"
          id="signemail"
          placeholder="Enter your email"
          value={signupData.email}
          onChange={handleSignupChange}
          required
        />
        <label htmlFor="signpassword">Enter password</label>
        <input
          type="password"
          name="password"
          id="signpassword"
          placeholder="Enter your password"
          value={signupData.password}
          onChange={handleSignupChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
        <p className="mx-auto mt-5">Already have an account?</p>
        <Link to="/login" className="d-block mx-auto mt-1">Login</Link>
      </form>
    </div>
  );
}
