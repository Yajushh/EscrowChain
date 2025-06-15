import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/Home";
import { AuthStore } from "./store/authStore";
import Escrow from "./pages/Escrow";
import EscrowDetails from "./pages/EscrowDetails";

function App() {
  const isLoggedIn = AuthStore((state) => state.isLoggedIn);
  // const user = AuthStore((state) => state.user);

  // function escrowValidation() {
  //   if (!isLoggedIn && user.)
  // }
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
        <Route
          path="/escrow"
          element={isLoggedIn ? <Escrow /> : <Navigate to="/login" replace />}
        />
        <Route path="/escrow/:id/" element={<EscrowDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
