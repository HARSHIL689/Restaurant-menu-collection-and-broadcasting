import { useState } from "react";

function ResponseModal({
  isOpen,
  RestaurantName,
  RestaurantPhoneNumber,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    PhoneNumber: "",
    Address: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({
      RestaurantName,
      RestaurantPhoneNumber,
     name: form.name,
    PhoneNumber: form.PhoneNumber,
    Address: form.Address,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Confirm Visit – {RestaurantName}
        </h3>

        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <input
          name="PhoneNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <textarea
          name="Address"
          placeholder="Address"
          rows={3}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponseModal;
