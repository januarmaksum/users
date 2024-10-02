import { User } from "@/interfaces/user.interface";
import useToast from "@/components/Toast";
import * as React from "react";

interface UserFormProps {
  onSubmit: (updatedUser: User) => Promise<void>;
  initialValues?: {
    id: number;
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
  const [formData, setFormData] = React.useState({
    email: initialValues?.email || "",
    first_name: initialValues?.first_name || "",
    last_name: initialValues?.last_name || "",
    avatar: initialValues?.avatar || "",
  });
  const showToast = useToast();

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    if (!formData.first_name || !namePattern.test(formData.first_name)) {
      newErrors.first_name = "Must contain only alphabets.";
    }

    if (formData.last_name && !namePattern.test(formData.last_name)) {
      newErrors.last_name = "Must contain only alphabets.";
    }

    if (!formData.avatar) {
      newErrors.avatar = "Must be a valid filename or url.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;
    const method = initialValues ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        if (response.status === 400 && error === "Email already exists") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email already exists.",
          }));
          return;
        }

        throw new Error(
          initialValues ? "Failed to update user" : "Failed to create user"
        );
      }

      const updatedUser = await response.json();
      await onSubmit(updatedUser);
      showToast.success(
        initialValues
          ? "User updated successfully!"
          : "User created successfully!"
      );
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
        disabled={initialValues && !!initialValues}
        className="w-full p-2 mb-2 border rounded disabled:text-gray-600"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2 -mt-2">{errors.email}</p>
      )}

      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-2 mb-2 border rounded"
      />
      {errors.first_name && (
        <p className="text-red-500 text-sm mb-2 -mt-2">{errors.first_name}</p>
      )}

      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-2 mb-2 border rounded"
      />
      {errors.last_name && (
        <p className="text-red-500 text-sm mb-2 -mt-2">{errors.last_name}</p>
      )}

      <input
        type="url"
        name="avatar"
        value={formData.avatar}
        onChange={handleChange}
        placeholder="Avatar Filename"
        className="w-full p-2 mb-2 border rounded"
      />
      {errors.avatar && (
        <p className="text-red-500 text-sm mb-2 -mt-2">{errors.avatar}</p>
      )}

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
