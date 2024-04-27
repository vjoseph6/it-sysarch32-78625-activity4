import { Link } from "react-router-dom";
import { defaultUsers, productUsers } from "../api's/apis";
import { useState, useEffect } from "react";

function Products() {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(productUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
    }
  };


  return (
    <>
      {/* Render error message if there's an error */}
      {errorMessage && (
        <div className="">{errorMessage}</div>
      )}

      <div className="products-container">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="product-card">
            <img
              src={`${defaultUsers}${product.productImage}`}
              alt={product.name}
              className="product-card__image"
            />
            <div className="product-card__info">
              <h2 className="product-card__name">{product.name}</h2>
              <p className="product-card__price">Price: ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Products;
