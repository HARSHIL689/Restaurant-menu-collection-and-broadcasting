import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/orders", {
        headers: {
          "X-USER-PHONE": localStorage.getItem("userPhone"),
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();

      // Most recent first
      const sortedOrders = [...data].sort(
        (a, b) => new Date(b.orderedAt) - new Date(a.orderedAt)
      );

      setOrders(sortedOrders);
    } catch (err) {
      console.error(err);
      alert("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalSpent = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 text-sm font-medium text-red-500 hover:text-red-600 transition"
        >
          ← Back to Dashboard
        </button>

        {/* Page Heading */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Your Orders
          </h2>
          <p className="text-gray-500 text-lg">
            Review your previous meals and spending history.
          </p>
        </div>

        {/* Summary Section */}
        {!loading && orders.length > 0 && (
          <div className="bg-white border border-orange-100 rounded-2xl shadow-md p-6 mb-10">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">
                  {orders.length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-red-500">
                  ₹ {totalSpent}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <p className="text-gray-500">Loading your delicious history...</p>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-orange-100">
            <p className="text-gray-500 text-lg">
              🍽️ You haven’t placed any orders yet.
            </p>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-orange-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {order.restaurantName}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(order.orderedAt).toLocaleString()}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">
                    Quantity:
                  </span>{" "}
                  {order.quantity}
                </p>

                <p>
                  <span className="font-medium text-gray-700">
                    Price:
                  </span>{" "}
                  ₹ {order.pricePerItem}
                </p>

                <p className="font-semibold text-red-500">
                  Total: ₹ {order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Orders;