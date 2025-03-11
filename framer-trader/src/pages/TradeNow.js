import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext"; // Import Context
import "../styles/TradeNow.css";

const TradeNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToPortfolio } = usePortfolio(); // Use Context
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="trade-now-container">
        <h2>Product not found!</h2>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  const handleBuy = () => {
    addToPortfolio(product, quantity); // Add to Portfolio
    alert(`✅ Bought ${quantity} ${product.title}(s) for ₹${product.price * quantity}`);
    navigate("/portfolio");
  };

  return (
    <div className="trade-now-container">
      <h2 className="trade-now-title">Confirm Your Trade</h2>
      <div className="trade-now-card">
        <img src={product.imageUrl} alt={product.title} className="trade-now-image" />
        <div className="trade-now-info">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h4 className="trade-now-price">₹{product.price} per unit</h4>
          
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => setQuantity((q) => Math.max(q - 1, 1))}>➖</button>
            <span className="quantity-count">{quantity}</span>
            <button className="quantity-button" onClick={() => setQuantity((q) => Math.min(q + 1, 100))}>➕</button>
          </div>

          <h4 className="total-price">Total: ₹{product.price * quantity}</h4>

          <button className="buy-button" onClick={handleBuy}>Buy</button>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Cancel</button>
    </div>
  );
};

export default TradeNow;
