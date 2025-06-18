import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", { email, password });
      alert("Registration successful");
      navigate("/login"); // redirect to login page
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 transition-all duration-300"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-indigo-900 dark:text-indigo-100 mb-2">
            <span className="inline-block transform rotate-12">🌟</span> Join
            Chronicle
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Begin your storytelling journey today
          </p>
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Create a password (min. 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
        >
          Create Account
        </button>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
