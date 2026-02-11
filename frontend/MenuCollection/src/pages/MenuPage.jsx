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

  // const fetchMenu = (() => {
  //   setMenu(menuDummyData);
  // }, []);  

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
  }, 2000); 

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
    setMenu((prev) =>
      prev.map((item) =>
        item.phoneNumber === phone
          ? { ...item, orderCount: item.orderCount - quantity }
          : item
      )
    );
  };

  const updateOrderCount = (restaurantPhoneNumber, quantity) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item.phoneNumber === restaurantPhoneNumber
          ? {
              ...item,
              orderCount: item.orderCount + quantity,
            }
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
    if(submitting) return;
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
    } finally{
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
      {orderSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg shadow">
          <h3 className="text-green-800 font-semibold mb-2">
            ✅ Order Placed Successfully!
          </h3>

          <p className="text-sm text-gray-700">
            <span className="font-medium">Restaurant:</span> {orderSuccess.restaurantName}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-medium">Quantity:</span> {orderSuccess.quantity}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-medium">Total Paid:</span> ₹{orderSuccess.totalAmount}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Ordered at: {new Date(orderSuccess.orderedAt).toLocaleString()}
          </p>
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-green-700 hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>

      <h2 className="text-3xl font-extrabold mb-2 text-green-700">
        Today’s Menus
      </h2>
      <p className="text-gray-600 mb-8">
        Choose a restaurant and confirm your visit
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((res, index) => (
        <RestaurantCard
          key={`${res.phoneNumber}-${index}`}
          restaurant={res}
          disabled={res.orderCount >= res.limit}
          onSelect={() => handleSelect(res)}
      />
))}

      </div>

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
        // onSubmit={(payload) => {
        //   updateOrderCount(payload.restaurantPhoneNumber, payload.quantity);
        //   setIsModalOpen(false);
        //   setSelectedRestaurant(null);
        // }}
      />
      </div>
    </div>
  );
}

export default MenuPage;