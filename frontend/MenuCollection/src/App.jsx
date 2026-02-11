import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MenuPage from "./pages/MenuPage";
import MainLayout from "./layouts/MainLayout";
import Orders from "./pages/Orders"
import AdminDashboard from "./pages/AdminDashboard";

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
          path="/dashboard"
          // element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
           element={<Dashboard />}
        />

        <Route
          path="/Admin-dashboard"
          element={isLoggedIn() ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/menus"
          element={
              <MainLayout>
                <MenuPage />
              </MainLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <MainLayout>
              <Orders />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;