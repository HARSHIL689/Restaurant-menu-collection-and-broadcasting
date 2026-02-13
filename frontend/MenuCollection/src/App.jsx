import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MenuPage from "./pages/MenuPage";
import MainLayout from "./layouts/MainLayout";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import Admin from "./pages/Admin";
import RestaurantRegisterInfo from "./pages/RestaurantRegisterInfo";

const isLoggedIn = () =>
  localStorage.getItem("isLoggedIn") === "true";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path = "/restaurant-register"
          element = {<RestaurantRegisterInfo />} 
        />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn() &&
            localStorage.getItem("role") === "User"
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        />

        {/* Admin Main Analytics Page */}
        <Route
          path="/admin"
          element={
            isLoggedIn() &&
            localStorage.getItem("role") !== "User"
              ? <Admin />
              : <Navigate to="/login" />
          }
        />

        {/* Admin Panel */}
        <Route
          path="/Admin-dashboard"
          element={
            isLoggedIn() &&
            localStorage.getItem("role") !== "User"
              ? <AdminDashboard />
              : <Navigate to="/login" />
          }
        />

        {/* Shared Layout Pages */}
        <Route
          path="/menus"
          element={
            isLoggedIn()
              ? (
                <MainLayout>
                  <MenuPage />
                </MainLayout>
              )
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/orders"
          element={
            isLoggedIn()
              ? (
                <MainLayout>
                  <Orders />
                </MainLayout>
              )
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;