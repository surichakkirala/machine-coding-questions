import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const resp = await fetch("https://dummyjson.com/products");
      if (!resp.ok) throw new Error("Failed to fetch products");
      const data = await resp.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:{error}</p>;
  return (
    <div className="products">
      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <img
                className="product-image"
                src={product.thumbnail || ""}
                alt={product.title}
              />
              <h3>{product.title}</h3>
              <div className="product-info">
                <p>{product.description.slice(0, 100)}...</p>
              </div>
              <Link className="view-more" to={"/products/" + product.id}>
                View More
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
