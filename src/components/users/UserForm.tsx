import { User } from "@/interfaces/user.interface";
import React, { useEffect, useState } from "react";

interface UserFormProps {
  onSubmit: (updatedUser: User) => Promise<void>; // Accepts updated user
  initialValues?: {
    id: number; // Make sure to include id for updates
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  submitLabel: string;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialValues,
  submitLabel,
}) => {
  const [formData, setFormData] = useState({
    email: initialValues?.email || "",
    first_name: initialValues?.first_name || "",
    last_name: initialValues?.last_name || "",
    avatar: initialValues?.avatar || "",
  });

  // Update formData when initialValues changes
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users`
    const method = initialValues ? "PUT" : "POST"; // Use PUT for editing, POST for creating

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          initialValues ? "Failed to update user" : "Failed to create user"
        );
      }

      const updatedUser = await response.json(); // Get the updated user from response

      // Trigger the onSubmit callback with updated user
      await onSubmit(updatedUser);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 mb-2 border rounded disabled:text-gray-600"
        disabled={initialValues && !!initialValues}
      />
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        required
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="url"
        name="avatar"
        value={formData.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
        required
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default UserForm;
