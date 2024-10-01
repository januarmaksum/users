import UserList from "@/components/users/UserList";
import withAuth from "@/components/withAuth";

export const metadata = {
  title: "Users - Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4">
      <h1 className="text-2xl border-b mb-4 font-bold">User List</h1>
      <UserList />
    </div>
  );
};

export default withAuth(DashboardPage);
