import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("name");

  return (
    <div className="min-h-screen bg-green-50">
      
      {/* Top Bar */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-green-700">
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
        </div>
      </header>
  
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-green-700 mb-8">
          Dashboard
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  
          {/* Menu Card */}
          <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Today’s Menu
            </h3>
  
            <p className="text-sm text-gray-500 mb-6">
              View available restaurants and today’s food menus.
            </p>
  
            <button
              onClick={() => navigate("/menus")}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              View Menu
            </button>
          </section>
  
          {/* Past Orders Card */}
          <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Past Orders
            </h3>
  
            <p className="text-sm text-gray-500 mb-6">
              View all your previous food orders.
            </p>
  
            <button
              onClick={() => navigate("/orders")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Show Past Orders
            </button>
          </section>
  
        </div>
      </main>
    </div>
  );  
}

export default Dashboard;
