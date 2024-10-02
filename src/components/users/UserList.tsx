"use client";

import UserCard from "@/components/users/UserCard";
import { User } from "@/interfaces/user.interface";
import { useRouter } from "next/navigation";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  const router = useRouter();

  const handleDetailClick = (id: number) => {
    router.push(`/profile/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDetailClick={handleDetailClick} />
      ))}
    </div>
  );
};

export default UserList;
