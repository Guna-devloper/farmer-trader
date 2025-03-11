import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import axios from "axios";
import "../styles/ProductList.css";

const UNSPLASH_ACCESS_KEY = "N59uE-V9XY_U6JXwjYYRPQNWAr11V9MDlkNEMYLziTQ"; // 🔥 Replace with your valid API key

const ProductList = () => {
  const [firestoreProducts, setFirestoreProducts] = useState([]); // ✅ Only user-added products from Firestore
  const [apiProducts, setApiProducts] = useState([]); // ✅ Fetched from API, not stored in Firestore
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user-added products from Firestore
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const productsArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFirestoreProducts(productsArray);
        } else {
          console.warn("No user-added products found in Firestore.");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ✅ Fetch additional products from API (not stored in Firestore)
  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: "farm vegetables grains",
              per_page: 10,
              client_id: UNSPLASH_ACCESS_KEY,
            },
          }
        );

        if (response.data.results.length > 0) {
          const fetchedProducts = response.data.results.map((img, index) => ({
            id: `api-${index}`, // Unique ID for API products
            title: `Product ${index + 1}`,
            description: "Fresh farm produce available.",
            price: Math.floor(Math.random() * 500) + 100, // Random price
            imageUrl: img.urls.small, // Image from Unsplash
          }));

          setApiProducts(fetchedProducts);
        } else {
          console.warn("Unsplash API returned no images.");
        }
      } catch (error) {
        console.error("Error fetching products from Unsplash:", error);
      }
    };

    fetchApiProducts();
  }, []);

  // ✅ Merge Firestore products with API-fetched products
  const combinedProducts = [...firestoreProducts, ...apiProducts];

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">🌾 Available Products 🚜</h2>

      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : combinedProducts.length > 0 ? (
        <div className="product-grid">
          {combinedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.imageUrl || "https://via.placeholder.com/400"}
                alt={product.title}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <h4 className="product-price">₹{product.price}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products available</p>
      )}
    </div>
  );
};

export default ProductList;
