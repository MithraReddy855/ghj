import React, { useState } from "react";
import "./Auth.css";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const endpoint = type === "signup" ? "signup" : "login";

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:5000/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className="auth-box">
      <h2>{type === "signup" ? "Sign Up" : "Login"}</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>{type === "signup" ? "Sign Up" : "Login"}</button>
    </div>
  );
};

export default AuthForm;
