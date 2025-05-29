// App.js
import React from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import FacebookLogin from "./components/FacebookLogin";

function App() {
  return (
    <div className="app-container">
      <h1>Welcome to Our App</h1>
      <div className="auth-container">
        <div className="form-section">
          <AuthForm type="signup" />
        </div>
        <div className="form-section">
          <AuthForm type="login" />
        </div>
        <div className="form-section">
          <FacebookLogin />
        </div>
      </div>
    </div>
  );
}

export default App;
