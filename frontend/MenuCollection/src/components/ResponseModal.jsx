import { useState, useEffect } from "react";

function ResponseModal({
  isOpen,
  RestaurantName,
  RestaurantPhoneNumber,
  price,
  remainingSlots,
  submitting,
  onClose,
  onSubmit,
}) {
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const remaining = Number.isFinite(remainingSlots) ? remainingSlots : 0;
  const maxAllowedQuantity = Math.min(5, remaining);
  const safeMaxQuantity = maxAllowedQuantity > 0 ? maxAllowedQuantity : 1;


  useEffect(() => {
    if (quantity > maxAllowedQuantity) {
      setQuantity(maxAllowedQuantity);
    }
  }, [maxAllowedQuantity, quantity]);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setAddress("");
    }
  }, [isOpen]);  

  if (!isOpen) return null;

  const totalAmount = price * quantity;

  const handleSubmit = () => {
    if (submitting) return;
    if (!address.trim()) {
      alert("Address is required");
      return;
    }

    onSubmit({
      restaurantName: RestaurantName,
      restaurantPhoneNumber: RestaurantPhoneNumber,
      address,
      quantity,
      totalAmount,
    });

    setAddress("");
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          Confirm – {RestaurantName}
        </h3>

        <label className="block text-sm font-semibold mb-1">
          Number of Orders
        </label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border rounded p-2 mb-4"
        >
          {Array.from({ length: safeMaxQuantity }, (_, i) => i + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>

        <textarea
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <div className="mb-4 text-right font-semibold text-green-700">
          Total: ₹ {totalAmount}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            disabled={!address.trim() || submitting}
            className="bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => {
              console.log("Submit clicked");
              handleSubmit();
            }}
          >
            {submitting ? "Placing Order..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponseModal;