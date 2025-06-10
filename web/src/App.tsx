import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/Home";
import { AuthStore } from "./store/authStore";
import Escrow from "./pages/Escrow";

function App() {
  const isLoggedIn = AuthStore((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/escrow" element={<Escrow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
