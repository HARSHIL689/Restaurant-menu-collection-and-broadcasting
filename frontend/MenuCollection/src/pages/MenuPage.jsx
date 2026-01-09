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
      <h2 className="text-3xl font-extrabold mb-1 text-green-700">
        Today’s Menus
      </h2>
      <p className="text-gray-600 mb-6">
        Choose one restaurant and confirm your visit
      </p>

      {hasSubmitted && (
        <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-xl mb-6 shadow-sm">
          🙏 Thank you! Your response has been recorded.
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
