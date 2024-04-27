import { useEffect, useState } from "react";
import Products from "./Products.jsx";
import { productUsers } from "../api's/apis.jsx";
import Loading from "./Loading.jsx";

function Body() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading state to true initially

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(productUsers);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching data (success or failure)
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Products data={products} />;
}

export default Body;
