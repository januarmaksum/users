import Image from "next/image";
import { User } from "@/interfaces/user.interface";

interface UserCardProps {
  user: User;
  onDetailClick: (id: number) => void;
}

const UserCard = ({ user, onDetailClick }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <Image
        src={user.avatar}
        alt={user.first_name}
        className="w-24 h-24 rounded-full mx-auto mb-4"
        width={96}
        height={96}
        priority
      />
      <h3 className="font-semibold">id: {user.id}</h3>
      <p className="text-gray-500">{user.email}</p>
      <button
        className="mt-4 bg-blue-500 text-white py-1 px-3 rounded"
        onClick={() => onDetailClick(user.id)}
      >
        Detail
      </button>
    </div>
  );
};

export default UserCard;
