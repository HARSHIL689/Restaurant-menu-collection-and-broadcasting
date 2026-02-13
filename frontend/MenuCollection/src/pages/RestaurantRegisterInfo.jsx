import { useNavigate } from "react-router-dom";

function RestaurantRegisterInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-orange-100">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🍽️ Restaurant Registration
          </h2>
          <p className="text-gray-500 text-sm">
            Contact us to list your restaurant on our platform.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-5 text-gray-700 text-sm">

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="font-semibold text-gray-800 mb-1">
              📞 Phone Number
            </p>
            <p className="text-red-500 font-medium">
              +91 8799525425
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="font-semibold text-gray-800 mb-1">
              📧 Email Address
            </p>
            <p className="text-red-500 font-medium">
              harshilbhungaliya689@gmail.com
            </p>
          </div>

        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-white font-semibold hover:opacity-90 transition"
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default RestaurantRegisterInfo;
