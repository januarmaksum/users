"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/userService";
import { User } from "@/interfaces/user.interface";
import UserCard from "@/components/users/UserCard";
import { useRouter } from "next/navigation";

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await fetchUsers();
      if (result) {
        setUsers(result.data);
      } else {
        setError("Failed to load users.");
      }
      setLoading(false);
    };

    loadUsers();
  }, []);

  const handleDetailClick = (id: number) => {
    router.push(`/profile/${id}`);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>; 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDetailClick={handleDetailClick} />
      ))}
    </div>
  );
};

export default UserList;
