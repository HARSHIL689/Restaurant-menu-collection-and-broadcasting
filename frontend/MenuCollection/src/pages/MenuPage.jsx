import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";

const restaurants = [
  {
    id: 1,
    name: "Annapurna Tiffin",
    menu: ["Dal Fry", "Aloo Sabzi", "Rice", "Roti"],
    price: 70,
    timing: "12:00 PM – 3:00 PM",
  },
  {
    id: 2,
    name: "Shree Veg Bhojan",
    menu: ["Paneer Sabzi", "Dal", "Rice", "Chapati"],
    price: 80,
    timing: "1:00 PM – 4:00 PM",
  },
  {
    id: 3,
    name: "Sai Pure Veg",
    menu: ["Mix Veg", "Dal Tadka", "Jeera Rice", "Roti"],
    price: 75,
    timing: "12:30 PM – 3:30 PM",
  },
];

export function MenuPage() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">
        Today's Veg Menus
      </h2>
      <p className="text-gray-600 mb-6">
        Choose one restaurant
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((res) => (
          <RestaurantCard
            key={res.id}
            restaurant={res}
            isSelected={selectedRestaurantId === res.id}
            onSelect={() => setSelectedRestaurantId(res.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
