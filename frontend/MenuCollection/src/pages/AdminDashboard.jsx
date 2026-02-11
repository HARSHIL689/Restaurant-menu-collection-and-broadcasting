import React from 'react'
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
    const navigate = useNavigate();
  const studentName = localStorage.getItem("name");

  return (
    <div className="min-h-screen bg-green-50">
      
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-green-800">
          Welcome, {studentName} 👋
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/login");
          }}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </header>

      <main className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Dashboard
        </h2>

        <section className="bg-white rounded-lg shadow p-6 max-w-md">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Today’s Menu
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            View available restaurants and today’s food menus
          </p>

          <button
            onClick={() => navigate("/menus")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            View Menu
          </button>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard
