import React from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext"; // Import Context
import "../styles/Portfolio.css";

const Portfolio = () => {
  const navigate = useNavigate();
  const { portfolio, removeFromPortfolio } = usePortfolio(); // Use Context

  const totalInvestment = portfolio.reduce((acc, stock) => acc + stock.quantity * stock.price, 0);

  return (
    <div className="portfolio-container">
      <h2 className="portfolio-title">🚜 Farmer & Trader Portfolio</h2>
      
      {portfolio.length > 0 ? (
        <>
          <div className="portfolio-list">
            {portfolio.map((stock) => (
              <div key={stock.id} className="portfolio-card">
                <img src={stock.imageUrl} alt={stock.title} className="stock-image" />
                <div className="stock-info">
                  <h3>{stock.title}</h3>
                  <p>📊 Quantity: {stock.quantity} Units</p>
                  <p>💰 Price per Unit: ₹{stock.price}</p>
                  <p>💵 Total: ₹{stock.quantity * stock.price}</p>
                  <button className="sell-button" onClick={() => removeFromPortfolio(stock.id)}>Sell</button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="total-investment">Total Investment: ₹{totalInvestment}</h3>
        </>
      ) : (
        <h3 className="empty-portfolio">🚜 No Agricultural Stocks in Portfolio! Start Trading Now.</h3>
      )}

      <button className="back-button" onClick={() => navigate("/home")}>🏠 Back to Home</button>
    </div>
  );
};

export default Portfolio;
