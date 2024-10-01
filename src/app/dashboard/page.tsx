import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Users - Dashboard",
};

export default function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-2xl">Welcome to the Dashboard</h1>
    </div>
  );
}
