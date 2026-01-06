import { useState } from "react";

function ResponseModal({
  isOpen,
  restaurantName,
  restaurantPhone,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({
      restaurantName,
      restaurantPhone,
      name: form.name,
      mobile: form.mobile,
      description: form.description,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Confirm Visit – {restaurantName}
        </h3>

        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <textarea
          name="description"
          placeholder="Extra description"
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
