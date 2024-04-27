import { Link } from "react-router-dom";
import { useState } from "react";
import { users } from "../api's/apis";

function Header() {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleDeleteUser = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setErrorMessage("User ID or token not found.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }

    try {
      const response = await fetch(`${users}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // User deleted successfully, perform logout
        handleLogout();
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Failed to delete user.");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
    }
  };

  const username = localStorage.getItem("username");

  return (
    <header className="header">
      <div className="logo">
        <Link className="logo-link" to="/">
          VILLARIAZADA
        </Link>
      </div>
      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            {username ? (
              <Link className="nav-link" to="/login" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link className="nav-link" to="/login">
                Login/Register
              </Link>
            )}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={handleLogout}>
              {username ? `Logout (${username})` : ""}
            </Link>
          </li>
        </ul>
      </nav>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </header>
  );
}

export default Header;
