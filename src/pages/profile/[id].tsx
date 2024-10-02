import Head from "next/head";
import { GetServerSideProps } from "next";
import { User } from "@/interfaces/user.interface";
import UserDetail from "@/components/users/UserDetail";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import Modal from "@/components/Modal";
import UserForm from "@/components/users/UserForm";
import { useRouter } from "next/router";

interface Params {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as unknown as Params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/userDetail?id=${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await response.json();

    return {
      props: { user },
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { notFound: true };
  }
};

const UserDetailPage = ({ user: initialUser }: { user: User }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>(initialUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultTitle = "User Profile";

  const handleNav = () => {
    router.push("/");
  };

  const refetchUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/userDetail?id=${user.id}`
    );

    if (!response.ok) {
      throw new Error("Failed to refetch user");
    }

    const updatedUser = await response.json();
    setUser(updatedUser);
  };

  const handleUserCreated = async (updatedUser: User) => {
    console.log("Updated user:", updatedUser);
    try {
      await refetchUser();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUserDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      router.push("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Head>
        <title>
          {user
            ? `${user.first_name} ${user.last_name} - Profile`
            : defaultTitle}
        </title>
      </Head>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4 border-b py-2">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold">Detail Profile</h1>
            <button
              onClick={handleNav}
              className="border border-blue-500 text-black hover:bg-blue-700 hover:border-bg-blue-700 hover:text-white rounded py-2 px-4"
            >
              Home
            </button>
          </div>
          <div className="flex gap-2">
            <LogoutButton />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleUserDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <UserDetail user={user} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit User"
      >
        <UserForm
          submitLabel="Update User"
          initialValues={{
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
          }}
          onSubmit={handleUserCreated}
        />
      </Modal>
    </>
  );
};

export default UserDetailPage;
