import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import ResponseModal from "../components/ResponseModal";

  export function MenuPage() {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [menu,setMenu]=useState([
      
    ]);

    useEffect(()=>{
      fetch('http://localhost:8080/api/message')
      .then((res)=>res.json())
      .then((data)=>{
        setMenu(data)
      })
      .catch((err) => console.error(err));
    },[])

    const handleSelect = (msg) => {
      if (hasSubmitted) return;
      setSelectedMessage(msg);
      setIsModalOpen(true);
    };
  
    const handleSubmitResponse = async (payload) => {
      try {
        console.log(payload);
        await fetch("http://localhost:8080/api/response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log("helo");
        setIsModalOpen(false);
        setHasSubmitted(true);
      } catch (err) {
        console.error("Submission failed", err);
      }
    };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">
        Today's Menus
      </h2>

      {hasSubmitted && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
          Thank you! Your response has been submitted.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((res, index) => (
          <RestaurantCard
            key={res.phoneNumber + res.createdDate}
            restaurant={res}
            isSelected={selectedMessage === res}
            onSelect={() => handleSelect(res)}
          />
        ))}
      </div>
      <ResponseModal
        isOpen={isModalOpen}
        RestaurantName={selectedMessage?.restaurantName}
        RestaurantPhoneNumber={selectedMessage?.phoneNumber}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitResponse}
      />
    </div>
  );
}

export default MenuPage;
