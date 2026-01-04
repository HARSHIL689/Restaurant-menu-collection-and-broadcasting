import React from 'react'
import RestaurantCard from "../components/RestaurantCard";
import "../styles/menu-page.css";

const dummyRestaurants = [
    {
      id: 1,
      name: "Dankawala",
      menu: ["Dal Fry", "Aloo Sabzi", "Rice", "Roti"],
      price: 120,
      timing: "12:00 – 3:00 PM"
    },
    {
      id: 2,
      name: "kathiyawadi twist",
      menu: ["Paneer Sabzi", "Dal", "Rice", "Chapati"],
      price: 80,
      timing: "1:00 – 4:00 PM"
    }
];

export default function MenuPage() {
  return (
    <div className="menu-page">
      <h1>Today's Menu</h1>
      <p className="subtitle">Choose one restaurant only</p>

      <div className="menu-grid">
        {dummyRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  )
}
