import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/DashBoard";
import MenuPage from "./pages/MenuPage";
import MainLayout from "./layouts/MainLayout";

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

        {/* ✅ WRAP MENU PAGE WITH MAIN LAYOUT */}
        <Route
          path="/menus"
          element={
            // isLoggedIn() ? (
              <MainLayout>
                <MenuPage />
              </MainLayout>
            //) : (
              // <Navigate to="/login" />
            // )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
