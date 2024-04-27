import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productUsers } from "../api's/apis.jsx";
import { defaultUsers } from "../api's/apis.jsx";
import Loading from "./Loading.jsx";

function SelectProduct() {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      const response = await fetch(productUsers + "/" + productId);
      const data = await response.json();
      if (response.ok) {
        const fileName = data.product.productImage.substring(
          data.product.productImage.lastIndexOf("/") + 1
        );
        data.product.productImage = fileName;
        setProduct(data.product);
      } else {
        setErrorMessage(data.message);
      }
      setLoading(false);
    };
    fetchAPI();
  }, [productId]);

  const handleUpdate = () => {
    setIsUpdating(true);
    setFormData({
      name: product.name,
      price: product.price,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(productUsers + "/" + productId, {
        method: "PATCH", // Change method to PATCH
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([
          {
            propName: "name",
            value: formData.name,
          },
          {
            propName: "price",
            value: formData.price,
          },
        ]),
      });
      const data = await response.json();
      if (response.ok) {
        setIsUpdating(false);
        window.location.href = `/products/${productId}`;
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCancel = () => {
    setIsUpdating(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(productUsers + "/" + productId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.location.href = "/products";
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (loading || product === null) {
    return <Loading />;
  }

  return (
    <>
      <div className="product-wrapper">
        {errorMessage && (
          <label className="error-message">{errorMessage}</label>
        )}
        <div className="product-container">
          <img
            className="product-image"
            src={`${defaultUsers}${product.productImage}`}
            alt={product.name}
          />
          <div className="product-details">
            {isUpdating ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                <button type="submit" className="submit-button">
                  Save
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <label className="product-name">{product.name}</label>
                <label className="product-price">₱{product.price}</label>
              </>
            )}
          </div>
          <div className="product-actions">
            {!isUpdating && (
              <button className="update-button" onClick={handleUpdate}>
                Update
              </button>
            )}
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectProduct;
