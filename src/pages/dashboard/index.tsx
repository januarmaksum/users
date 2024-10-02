import Head from "next/head";
import { GetServerSideProps } from "next";
import LogoutButton from "@/components/LogoutButton";
import UserList from "@/components/users/UserList";
import { User } from "@/interfaces/user.interface";
import { PUBLIC_API_URL } from "@/constants";
import { useState } from "react";
import UserForm from "@/components/users/UserForm";
import Modal from "@/components/Modal";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    return { props: { users } };
  } catch (error) {
    console.error("Failed to load users:", error);
    return {
      props: {
        error: "Failed to load users.",
        users: [],
      },
    };
  }
};

interface DashboardPageProps {
  users: User[];
  error?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  users: initialUsers,
  error,
}) => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserCreated = async () => {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const updatedUsers = await response.json();
      setUsers(updatedUsers);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to reload users:", error);
    }
  };

  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4 border-b py-2">
          <h1 className="text-2xl font-bold">User List</h1>
          <div className="flex gap-2">
            <LogoutButton />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Create User
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <UserList users={users} />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New User"
        >
          <UserForm submitLabel="Create User" onSubmit={handleUserCreated} />
        </Modal>
      </div>
    </>
  );
};

export default DashboardPage;
