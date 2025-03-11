import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css"; // Import updated styles

const UNSPLASH_ACCESS_KEY = "N59uE-V9XY_U6JXwjYYRPQNWAr11V9MDlkNEMYLziTQ"; // Replace with a valid API key

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: "farm vegetables grains",
            per_page: 6,
            client_id: UNSPLASH_ACCESS_KEY,
          },
        });

        if (response.data.results.length > 0) {
          const fetchedProducts = response.data.results.map((img, index) => ({
            id: `api-${index}`,
            title: `Trending Product ${index + 1}`,
            description: "High-quality fresh produce",
            imageUrl: img.urls.small,
          }));

          setTrendingProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="home-container">
      {/* 🌟 Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>🌱 Fresh from Farm to Market 🚜</h1>
            <p>Buy & Sell Fresh Farm Produce at the Best Prices</p>
            <Link to="/trade" className="hero-button">Start Trading</Link>
          </div>
        </div>
      </header>

      {/* 🌾 Categories Section */}
      <section className="categories">
        <h2>🌾 Explore Categories</h2>
        <div className="category-grid">
          {["🥦 Vegetables", "🍎 Fruits", "🌾 Grains", "🥜 Nuts", "🌻 Seeds"].map((category, index) => (
            <Link key={index} to="/trade" className="category-card">
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* 🔥 Trending Products Section */}
      <section className="trending">
        <h2>🔥 Trending Products</h2>
        <div className="trending-grid">
          {trendingProducts.map((product) => (
            <div key={product.id} className="trending-card">
              <img src={product.imageUrl} alt={product.title} className="trending-image" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌟 Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>🌟 Why Choose Us?</h2>
        <div className="benefits">
          {["🚜 Direct from Farmers", "📦 Fast & Secure Delivery", "💰 Best Market Prices", "🌿 100% Organic Products"].map((benefit, index) => (
            <div key={index} className="benefit-card">
              {benefit}
            </div>
          ))}
        </div>
      </section>

      {/* 🏁 Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Agri Trade Market. All Rights Reserved.</p>
        <div className="social-links">
          <a href="#">📘 Facebook</a>
          <a href="#">📸 Instagram</a>
          <a href="#">🐦 Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
