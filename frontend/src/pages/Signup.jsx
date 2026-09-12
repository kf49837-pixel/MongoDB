import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://mongo-db-ten-drab.vercel.app");

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.log(err);
      setError("Server se connect nahi ho saka. Backend check karo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        {error && <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={e=>setForm({...form,name:e.target.value})} />
          <input type="email" placeholder="Email" required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={e=>setForm({...form,email:e.target.value})} />
          <input type="password" placeholder="Password" required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={e=>setForm({...form,password:e.target.value})} />
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Signup
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">Have account? <Link to="/login" className="text-green-600 font-semibold">Login</Link></p>
      </div>
    </div>
  );
}