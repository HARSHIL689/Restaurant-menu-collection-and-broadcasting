import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import ResponseModal from "../components/ResponseModal";

export function MenuPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    const res = await fetch("http://localhost:8080/api/message");
    const data = await res.json();
    setMenu(data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSelect = (restaurant) => {
    if (restaurant.orderCount >= restaurant.limit) {
      alert("Order limit reached for this restaurant");
      return;
    }
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleSubmitResponse = async (payload) => {
    try {
      await fetch("http://localhost:8080/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-USER-PHONE": localStorage.getItem("userPhone"),
        },
        body: JSON.stringify(payload),
      });

      await fetchMenu(); // refresh real count from backend
      setIsModalOpen(false);
      setSelectedRestaurant(null);
    } catch (err) {
      alert(err.message || "Order limit reached");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold mb-1 text-green-700">
        Today’s Menus
      </h2>
      <p className="text-gray-600 mb-6">
        Choose a restaurant and confirm your visit
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((res) => (
          <RestaurantCard
            key={res.phoneNumber}
            restaurant={res}
            disabled={res.orderCount >= res.limit}
            onSelect={() => handleSelect(res)}
          />
        ))}
      </div>

      <ResponseModal
        isOpen={isModalOpen}
        RestaurantName={selectedRestaurant?.restaurantName}
        RestaurantPhoneNumber={selectedRestaurant?.phoneNumber}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitResponse}
      />
    </div>
  );
}

export default MenuPage;
