import { Link, useNavigate } from "react-router-dom";
import { loginUsers } from "../api's/apis";
import { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "", // Changed field name from "username" to "email"
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(loginUsers, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Authentication successful:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", formData.email); // Changed storage key from "username" to "email"
        navigate("/products"); // Redirect to products page
      } else {
        setErrorMessage(data.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div className="login-form">
      <label className="login-form__label">Login Now!</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="login-form__input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-form__input"
        />
        <button type="submit" className="login-form__button">
          Login
        </button>
      </form>
      {errorMessage && (
        <label className="login-form__error-message">
          {errorMessage}
        </label>
      )}
      <label className="login-form__label">
        Register Here! <Link to="/register" className="click">Sign up!</Link>
      </label>
    </div>
  );
}

export default LoginForm;
