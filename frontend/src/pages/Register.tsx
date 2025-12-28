import { useState, useContext, type ChangeEvent, type FormEvent } from "react";
import type { RegisterFormData } from "../types/Types";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { Register } = authContext;

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    profile: null,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFormData((prev) => ({
        ...prev,
        profile: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    if (formData.profile) {
      formDataToSend.append("profile", formData.profile);
    }

    try {
      setLoading(true);
      await Register(formDataToSend);

      alert("Registration Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        profile: null,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-gray-100 w-96 rounded-md space-y-6 p-6 shadow-lg">
        <h1 className="text-2xl text-center font-bold">Register</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border-2 border-blue-600 rounded-md px-2 w-full h-10"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

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

          <input
            type="file"
            name="profile"
            accept="image/*"
            className="border-2 border-blue-600 rounded-md p-1 w-full h-10 bg-white"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
