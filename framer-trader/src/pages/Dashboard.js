import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // Custom styles
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [stockData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Stock Price",
        data: [120, 135, 110, 145, 160], // Example stock data
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.3)",
        tension: 0.3,
      },
    ],
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* User Info Section */}
      <div className="dashboard-card">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="user-avatar"
        />
        <h2 className="user-email">{currentUser?.email || "Guest User"}</h2>
        <p className="user-role">Role: Trader</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Stock Market Chart Section */}
      <div className="stock-chart-container">
        <h3>📈 Stock Market Trends</h3>
        <div className="chart-wrapper">
          <Line data={stockData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* User Portfolio Section */}
      <div className="portfolio-section">
        <h3>💰 Your Portfolio</h3>
        <ul>
          <li>Bitcoin (BTC) - <span>1.5 BTC</span></li>
          <li>Ethereum (ETH) - <span>3.2 ETH</span></li>
          <li>Apple (AAPL) - <span>10 Shares</span></li>
          <li>Google (GOOGL) - <span>5 Shares</span></li>
        </ul>
      </div>

      {/* Recent Trades Section */}
      <div className="recent-trades">
        <h3>🔄 Recent Trades</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Type</th>
                <th>Price</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bitcoin (BTC)</td>
                <td>Buy</td>
                <td>₹42,50,000</td>
                <td className="profit">+₹10,000</td>
              </tr>
              <tr>
                <td>Apple (AAPL)</td>
                <td>Sell</td>
                <td>₹14,500</td>
                <td className="loss">-₹2,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
