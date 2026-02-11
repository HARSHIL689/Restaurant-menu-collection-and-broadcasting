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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl border border-orange-100">

        {/* Header */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Confirm Order –{" "}
          <span className="text-red-500">{RestaurantName}</span>
        </h3>

        {/* Quantity */}
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Number of Orders
        </label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border border-orange-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 rounded-xl p-2.5 mb-5 outline-none transition"
        >
          {Array.from({ length: safeMaxQuantity }, (_, i) => i + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>

        {/* Address */}
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Delivery Address
        </label>
        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-orange-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 rounded-xl p-3 mb-5 outline-none transition resize-none"
          rows={3}
        />

        {/* Total */}
        <div className="mb-6 text-right text-lg font-bold text-red-500">
          Total: ₹ {totalAmount}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={!address.trim() || submitting}
            className={`
              px-5 py-2 rounded-xl text-white font-semibold transition
              ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-amber-500 hover:opacity-90"
              }
            `}
            onClick={handleSubmit}
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponseModal;