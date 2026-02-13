import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("name");

   const handleLogout = () => {
  localStorage.clear();
  navigate("/login", { replace: true });
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">

      {/* Header */}
      <header className="bg-white shadow-md border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">

          <h1 className="text-xl font-semibold text-gray-800">
            🛠️ Admin Panel – {studentName}
          </h1>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Admin Dashboard
          </h2>
          <p className="text-gray-500 text-lg">
            Manage menus and monitor restaurant activity.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* View Menu Card */}
          <section className="bg-white rounded-2xl shadow-md p-8 border border-orange-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Today’s Menu
            </h3>

            <p className="text-gray-500 mb-8">
              View all active restaurant menus and availability.
            </p>

            <button
              onClick={() => navigate("/menus")}
              className="bg-gradient-to-r from-red-500 to-amber-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transition"
            >
              View Menu
            </button>
          </section>

          <section className="bg-white rounded-2xl shadow-md p-8 border border-orange-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Past Orders
            </h3>

            <p className="text-gray-500 mb-8">
              Review your previous meals and spending history.
            </p>

            <button
              onClick={() => navigate("/orders")}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transition"
            >
              Show Orders
            </button>
          </section>

          <section className="bg-white rounded-2xl shadow-md p-8 border border-orange-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
             Restaurant Analytics
            </h3>
            <p className="text-gray-500 mb-8">
              Order analytics, restaurant management, and more.
            </p>

            <button
              className="bg-gradient-to-r from-red-500 to-amber-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transition"
              onClick={()=>navigate('/admin')}
            >
               View Static
            </button>
          </section>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
