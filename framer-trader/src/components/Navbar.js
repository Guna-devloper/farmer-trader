import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css"; // Import updated CSS

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/home">🌾 Farmer Trader</Link>
        </div>

        {/* Hamburger Menu */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/trade" onClick={() => setMenuOpen(false)}>Trade</Link></li>

          {user ? (
            <>
              <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
              <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
