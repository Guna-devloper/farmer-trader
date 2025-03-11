import React, { createContext, useContext, useState } from "react";

// Create Context
const PortfolioContext = createContext();

// Context Provider
export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([
    { id: 1, title: "Wheat Futures", quantity: 10, price: 250, imageUrl: "/images/wheat.jpg" },
    { id: 2, title: "Corn Market", quantity: 15, price: 180, imageUrl: "/images/corn.jpg" },
    { id: 3, title: "Soybean Trade", quantity: 5, price: 400, imageUrl: "/images/soybean.jpg" },
    { id: 4, title: "Cotton Industry", quantity: 8, price: 220, imageUrl: "/images/cotton.jpg" },
  ]);

  // Add product to portfolio
  const addToPortfolio = (product, quantity) => {
    setPortfolio((prevPortfolio) => {
      const existingProduct = prevPortfolio.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevPortfolio.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevPortfolio, { ...product, quantity }];
      }
    });
  };

  // Remove product from portfolio
  const removeFromPortfolio = (id) => {
    setPortfolio((prevPortfolio) => prevPortfolio.filter((item) => item.id !== id));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom Hook
export const usePortfolio = () => useContext(PortfolioContext);
