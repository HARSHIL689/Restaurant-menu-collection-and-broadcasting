import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Invalid credentials");
        return;
      }

      const user = await res.json();

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);
      localStorage.setItem("userPhone", user.phone);

      if (user.role === "User") {
        navigate("/dashboard", { replace: true });
      } else if (user.role === "Admin") {
        navigate("/Admin-dashboard", { replace: true });
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-orange-100">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🍽️ Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Login to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-orange-200 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-orange-200 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-amber-500 text-white py-2.5 rounded-xl font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500 font-semibold">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;