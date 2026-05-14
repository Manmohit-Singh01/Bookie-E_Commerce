import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function logIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/logIn", formData);

      localStorage.setItem("token", response.data.token);

      setMsg(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } 
    catch (error) {
      setMsg(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Log In to Your Account
        </h2>

        {msg && (
          <p className="text-red-500 mb-4 text-center">
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}