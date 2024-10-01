import LoginForm from "@/components/login/LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Login - My App",
  description: "Login to access your account and manage your settings.",
};

const LoginPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
