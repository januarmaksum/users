import withRedirectToDashboard from "@/components/withRedirectToDashboard";
import LoginForm from "@/components/login/LoginForm";

export const metadata = {
  title: "Login - My App",
  description: "Login to access your account and manage your settings.",
};

const LoginPage = async () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default withRedirectToDashboard(LoginPage);
