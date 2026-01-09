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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        <h3 className="text-xl font-bold mb-4 text-green-700">
          Confirm Visit – {RestaurantName}
        </h3>

        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-green-500 outline-none"
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
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponseModal;
