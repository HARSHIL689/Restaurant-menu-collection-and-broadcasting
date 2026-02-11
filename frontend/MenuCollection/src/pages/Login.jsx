import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Invalid Phone or Password !");
      return;
    }

    const user = await res.json();

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userPhone", user.phone);
    localStorage.setItem("name", user.name);
    localStorage.setItem("role", user.role);

    if (user.role === "User") {
      navigate("/dashboard");
    } else {
      navigate("/Admin-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-4">

      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-orange-100">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🍽️ Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Login to continue ordering delicious meals
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="
              w-full px-4 py-2.5
              border border-orange-200
              rounded-xl
              focus:outline-none
              focus:ring-2 focus:ring-red-300
              focus:border-red-400
              transition
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
              w-full px-4 py-2.5
              border border-orange-200
              rounded-xl
              focus:outline-none
              focus:ring-2 focus:ring-red-300
              focus:border-red-400
              transition
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-gradient-to-r from-red-500 to-amber-500
              text-white py-2.5
              rounded-xl
              font-semibold
              shadow-sm
              hover:opacity-90
              transition
            "
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-500 font-semibold hover:text-red-600 transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
