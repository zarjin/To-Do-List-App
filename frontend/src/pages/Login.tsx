import { useState, useContext, type ChangeEvent, type FormEvent } from "react";
import type { LoginFormData } from "../types/Types";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

  const { Login } = auth;

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await Login(formData);
      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center text-black">
      <div className="bg-gray-100 w-96 rounded-md space-y-6 p-6 shadow-lg">
        <h1 className="text-2xl text-center font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-2 border-blue-600 rounded-md px-2 w-full h-10"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 border-blue-600 rounded-md px-2 w-full h-10"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
