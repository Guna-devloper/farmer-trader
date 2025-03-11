import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/ProductForm.css"; // Importing the CSS file

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !description || !imageUrl) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        title,
        price: parseFloat(price),
        description,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      alert("Product added successfully!");
      setTitle("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add a New Product</h2>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
