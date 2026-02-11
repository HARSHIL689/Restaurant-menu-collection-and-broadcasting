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
      setOrders(data);
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

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-sm text-green-700 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-semibold text-green-800 mb-6">
        Your Past Orders
      </h2>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No past orders found.</p>
      )}

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4"
          >
            <h3 className="font-semibold text-gray-800">
              {order.restaurantName}
            </h3>

            <p className="text-sm text-gray-600">
              Quantity: {order.quantity}
            </p>

            <p className="text-sm text-gray-600">
              Price per item: ₹{order.pricePerItem}
            </p>

            <p className="text-sm font-semibold text-gray-800">
              Total Paid: ₹{order.totalAmount}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Ordered at: {new Date(order.orderedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
