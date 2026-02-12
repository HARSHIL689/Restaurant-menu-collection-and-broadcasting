import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MenuPage from "./pages/MenuPage";
import MainLayout from "./layouts/MainLayout";
import Orders from "./pages/Orders"
import AdminDashboard from "./pages/AdminDashboard"
import Admin from  './pages/Admin'
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
           element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={isLoggedIn()? <Admin/> : <Navigate to="/login"/>}
        />

        <Route
          path="/Admin-dashboard"
          element={isLoggedIn() ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/menus"
          element={ isLoggedIn()?
              <MainLayout>
                <MenuPage />
              </MainLayout>:<Navigate to="/login"/>
          }
        />

        <Route
          path="/orders"
          element={isLoggedIn()?
            <MainLayout>
              <Orders />
            </MainLayout>:<Navigate to="/login"/>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;