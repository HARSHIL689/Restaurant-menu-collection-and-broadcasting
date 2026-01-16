import { useState } from "react";

function ResponseModal({
  isOpen,
  RestaurantName,
  RestaurantPhoneNumber,
  onClose,
  onSubmit,
}) {
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!address.trim()) {
      alert("Address is required");
      return;
    }

    onSubmit({
      restaurantName: RestaurantName,
      restaurantPhoneNumber: RestaurantPhoneNumber,
      address,
    });

    setAddress("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          Confirm – {RestaurantName}
        </h3>

        <textarea
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponseModal;
