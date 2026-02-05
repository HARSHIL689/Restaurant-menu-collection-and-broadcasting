import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import ResponseModal from "../components/ResponseModal";


export function MenuPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [submitting, setSubmitting] = useState(false);

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
    <div className="w-full">
      <h2 className="text-3xl font-extrabold mb-1 text-green-700">
        Today’s Menus
      </h2>
      <p className="text-gray-600 mb-6">
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
  );
}

export default MenuPage;