import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUsers } from "../api's/apis";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "", //
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
      const response = await fetch(registerUsers, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Registered successful:", data);
        navigate("/login");
      } else {
        setErrorMessage(data.message || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="register-form">
      <label className="register-form__label">Register Now!</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="register-form__input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="register-form__input"
        />
        <button type="submit" className="register-form__button">
          Register
        </button>
      </form>
      {errorMessage && (
        <label className="register-form__error-message">
          {errorMessage}
        </label>
      )}
      <label className="register-form__label">
        Already Have An Account? <Link to="/login" className="click">Sign in!</Link>
      </label>
    </div>
  );
}

export default RegisterForm;
