import React from "react";

function Admin() {
  // Static demo data (no backend)
  const restaurants = [
    { name: "Dankawala", orders: 120, revenue: 14400 },
    { name: "Food Plaza", orders: 85, revenue: 10200 },
    { name: "Spice Hub", orders: 60, revenue: 7200 },
  ];

  const totalOrders = restaurants.reduce((sum, r) => sum + r.orders, 0);
  const totalRevenue = restaurants.reduce((sum, r) => sum + r.revenue, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage restaurants and view monthly analytics
        </p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white p-6 rounded-2xl shadow-md border border-orange-100">
          <h3 className="text-sm text-gray-500 mb-2">Total Restaurants</h3>
          <p className="text-3xl font-bold text-gray-800">
            {restaurants.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-orange-100">
          <h3 className="text-sm text-gray-500 mb-2">Total Orders (This Month)</h3>
          <p className="text-3xl font-bold text-gray-800">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-orange-100">
          <h3 className="text-sm text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-red-500">
            ₹ {totalRevenue}
          </p>
        </div>

      </div>

      {/* Restaurant Analytics Table */}
      <div className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">

        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Restaurant Performance
          </h2>
        </div>

        <table className="w-full text-left">
          <thead className="bg-orange-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Restaurant</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4">Revenue</th>
              <th className="px-6 py-4">Performance</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.map((r, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {r.name}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {r.orders}
                </td>

                <td className="px-6 py-4 text-red-500 font-semibold">
                  ₹ {r.revenue}
                </td>

                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full"
                      style={{ width: `${(r.orders / totalOrders) * 100}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Add Restaurant Button */}
      <div className="mt-12 text-right">
        <button className="bg-gradient-to-r from-red-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:opacity-90 transition">
          ➕ Add New Restaurant
        </button>
      </div>

    </div>
  );
}

export default Admin;
