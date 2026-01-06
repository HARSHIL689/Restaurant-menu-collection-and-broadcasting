import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";


 

  export function MenuPage() {
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
     const [menu,setMenu]=useState([]);

    useEffect(()=>{
      fetch('http://localhost:8080/api/message')
      .then(res=>res.json())
      .then(data=>{
        setMenu(data)
      })
    },[])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">
        Today's Menus
      </h2>
      <p className="text-gray-600 mb-6">
        Choose one restaurant
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((res, index) => (
          <RestaurantCard
            key={index}
            restaurant={res}
            isSelected={selectedRestaurantId === index}
            onSelect={() => setSelectedRestaurantId(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
