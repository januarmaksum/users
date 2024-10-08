"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";
import Cookies from "js-cookie";
import { LoginPayload } from "@/interfaces/auth.interface";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const data = await loginUser(formData);

      if (data && data.token) {
        Cookies.set("token", data.token, { expires: 1 });
        window.location.href = "/dashboard";
      } else {
        setErrorMessage("Login failed. Please try again.");
        setIsSubmitting(false);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
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
          className="w-full p-2 border rounded mt-1 text-black"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-4">
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
          className="w-full p-2 border rounded mt-1 text-black"
          value={formData.password}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <button
        type="submit"
        className={`w-full p-2 rounded ${
          isSubmitting ? "bg-gray-500" : "bg-blue-500"
        } text-white`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
