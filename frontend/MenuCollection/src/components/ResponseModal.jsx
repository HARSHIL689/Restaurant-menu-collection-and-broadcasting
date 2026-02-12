import { useState, useEffect } from "react";

function ResponseModal({
  isOpen,
  menuId,
  restaurantName,
  price,
  remainingSlots,
  submitting,
  onClose,
  onSubmit,
}) {
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setAddress("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = price * quantity;

  const handleSubmit = () => {
    if (!address.trim()) {
      alert("Address required");
      return;
    }

    onSubmit({
      menuId,
      address,
      quantity,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">

        <h3 className="text-2xl font-bold mb-4">
          Confirm Order – {restaurantName}
        </h3>

        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border p-2 mb-4"
        >
          {Array.from({ length: remainingSlots }, (_, i) => i + 1).map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <textarea
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <div className="mb-4 font-bold text-red-500">
          Total: ₹ {totalAmount}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={submitting}
            onClick={handleSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {submitting ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponseModal;
