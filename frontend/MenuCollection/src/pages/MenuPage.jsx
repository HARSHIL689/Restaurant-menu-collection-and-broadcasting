import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";
import ResponseModal from "../components/ResponseModal";

export function MenuPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const fetchMenu = async () => {
    const res = await fetch("http://localhost:8080/api/message");
    const data = await res.json();
    setMenu(data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMenu();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const applyOptimisticUpdate = (phone, quantity) => {
    setMenu(prev =>
      prev.map(item =>
        item.phoneNumber === phone
          ? { ...item, orderCount: item.orderCount + quantity }
          : item
      )
    );
  };

  const rollbackUpdate = (phone, quantity) => {
    setMenu(prev =>
      prev.map(item =>
        item.phoneNumber === phone
          ? { ...item, orderCount: item.orderCount - quantity }
          : item
      )
    );
  };

  const updateOrderCount = (restaurantPhoneNumber, quantity) => {
    setMenu(prevMenu =>
      prevMenu.map(item =>
        item.phoneNumber === restaurantPhoneNumber
          ? { ...item, orderCount: item.orderCount + quantity }
          : item
      )
    );
  };

  const handleSelect = (restaurant) => {
    if (restaurant.orderCount >= restaurant.limit) {
      alert("Order limit reached for this restaurant");
      return;
    }
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleSubmitResponse = async (payload) => {
    if (submitting) return;
    setSubmitting(true);

    applyOptimisticUpdate(
      payload.restaurantPhoneNumber,
      payload.quantity
    );

    try {
      const res = await fetch("http://localhost:8080/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-USER-PHONE": localStorage.getItem("userPhone"),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Order rejected");
      }

      const data = await res.json();
      setOrderSuccess(data);

      await fetchMenu();
      setIsModalOpen(false);
      setSelectedRestaurant(null);

    } catch (err) {
      rollbackUpdate(
        payload.restaurantPhoneNumber,
        payload.quantity
      );
      alert(err.message || "Order limit reached");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Success Banner */}
        {orderSuccess && (
          <div className="mb-8 p-6 bg-white border border-amber-200 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-amber-600 mb-4">
              🍽️ Order Placed Successfully!
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-semibold">Restaurant:</span>{" "}
                {orderSuccess.restaurantName}
              </p>

              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {orderSuccess.quantity}
              </p>

              <p>
                <span className="font-semibold">Total Paid:</span>{" "}
                ₹{orderSuccess.totalAmount}
              </p>

              <p className="text-sm text-gray-500">
                Ordered at:{" "}
                {new Date(orderSuccess.orderedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Page Heading */}
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Today’s Menus
        </h2>
        <p className="text-gray-500 mb-10">
          Discover delicious meals and reserve your plate.
        </p>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menu.map((res, index) => (
            <RestaurantCard
              key={`${res.phoneNumber}-${index}`}
              restaurant={res}
              disabled={res.orderCount >= res.limit}
              onSelect={() => handleSelect(res)}
            />
          ))}
        </div>

        {/* Modal */}
        <ResponseModal
          isOpen={isModalOpen}
          RestaurantName={selectedRestaurant?.RestaurantName}
          RestaurantPhoneNumber={selectedRestaurant?.phoneNumber}
          price={selectedRestaurant?.price || 0}
          remainingSlots={
            selectedRestaurant
              ? selectedRestaurant.limit - selectedRestaurant.orderCount
              : 0
          }
          submitting={submitting}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitResponse}
        />
      </div>
    </div>
  );
}

export default MenuPage;