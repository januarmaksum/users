import Head from "next/head";
import LogoutButton from "@/components/LogoutButton";
import UserList from "@/components/users/UserList";
import { fetchUsers } from "@/services/userService";
import { User } from "@/interfaces/user.interface";

export const getServerSideProps = async () => {
  const result = await fetchUsers();

  if (!result) {
    return {
      props: {
        error: "Failed to load users.",
        users: [],
      },
    };
  }

  return {
    props: {
      users: result.data,
    },
  };
};

interface DashboardPageProps {
  users: User[];
  error?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ users, error }) => {
  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4 border-b py-2">
          <h1 className="text-2xl font-bold">User List</h1>
          <LogoutButton />
        </div>
        {error && <p>{error}</p>}
        <UserList users={users} />
      </div>
    </>
  );
};

export default DashboardPage;
