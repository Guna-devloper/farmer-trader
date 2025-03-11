import React, { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css"; // Import the updated CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back! 👋</h2>
        <p>Login to continue</p>
        
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input 
              type="email" 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <FaLock className="icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <span 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* Signup Link */}
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
