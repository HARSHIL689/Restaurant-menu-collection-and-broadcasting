import React from 'react'
import "../styles/restaurant-card.css";

export default function RestaurantCard({restaurant}) {
  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>

      <ul>
        {restaurant.menu.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="price">Price: ₹{restaurant.price}</p>
      <p className="timing">Timing: {restaurant.timing}</p>
    </div>
  )
}
