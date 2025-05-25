import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const resp = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!resp.ok) throw new Error("Failed to fetch products");
      const data = await resp.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:{error}</p>;
  return (
    <div className="product-details">
      <h2>ProductInfo</h2>
      {product ? (
        <>
          <div className="product-info">
            <h3>{product.title}</h3>
            <img
              className="product-image"
              src={product.thumbnail || ""}
              alt={product.title}
            />
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <Link className="back-to-products" to={`/products/`}>
              {" "}
              Back to Products
            </Link>
          </div>
        </>
      ) : (
        <p>No Products Found</p>
      )}
    </div>
  );
};

export default ProductDetails;
