import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx"
import RegisterForm from "./components/RegisterForm.jsx";
import Body from "./components/Body.jsx";
import SelectProduct from "./components/SelectProduct.jsx";

export default function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/products" element={<Body />} />{" "}
          <Route path="/products/:productId" element={<SelectProduct />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<RegisterForm />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}
