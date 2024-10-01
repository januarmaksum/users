import LogoutButton from "@/components/LogoutButton";
import UserList from "@/components/users/UserList";
import withAuth from "@/components/withAuth";

export const metadata = {
  title: "Users - Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4 border-b py-2">
        <h1 className="text-2xl font-bold">User List</h1>
        <LogoutButton />
      </div>
      <UserList />
    </div>
  );
};

export default withAuth(DashboardPage);
