import { useEffect, useState } from "react";
import "../styles.css";
import ProductCard from "./ProductCard";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const PAGE_SIZE = 10;

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getProductData();
  }, []);
  const getProductData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=200");
    const json = await data.json();
    setProducts(json.products);
  };
  const handleNumPage = (num) => {
    setCurrentPage(num);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const totalResults = products.length;
  const numOfPages = Math.ceil(totalResults / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return !products.length ? (
    "No products found"
  ) : (
    <div>
      <h1 className="header">Pagination</h1>
      <div className="pagination-container">
        <button
          id="previous"
          disabled={currentPage === 0}
          onClick={() => {
            handlePrevPage();
          }}
        >
          <FiChevronsLeft />
        </button>
        {[
          ...Array(numOfPages)
            .keys()
            .map((num) => (
              <button
                className={currentPage === num ? "active" : ""}
                onClick={() => handleNumPage(num)}
              >
                {num + 1}
              </button>
            )),
        ]}
        <button
          id="next"
          disabled={currentPage === numOfPages - 1}
          onClick={() => {
            handleNextPage();
          }}
        >
          <FiChevronsRight />
        </button>
      </div>
      <div className="product-container">
        {products.slice(start, end).map((product) => {
          return (
            <ProductCard
              key={product.id}
              image={product.thumbnail}
              title={product.title}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Pagination;
