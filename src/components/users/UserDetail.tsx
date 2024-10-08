import { User } from "@/interfaces/user.interface";
import Image from "next/image";

interface UserDetailProps {
  user: User;
}

const UserDetail = ({ user }: UserDetailProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <Image
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-24 h-24 rounded-full mx-auto my-4"
          width={96}
          height={96}
        />
        <p>ID: {user.id}</p>
        <h1 className="text-2xl font-bold">
          {user.first_name} {user.last_name}
        </h1>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserDetail;
