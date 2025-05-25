import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./styles.css";
import Home from "./Home";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
const App = () => (
  <>
    <BrowserRouter basename="/">
      <nav className="navbar">
        <Link to={"/"} className="navLink">
          Home
        </Link>
        <Link to={"/products"} className="navLink">
          Products
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
