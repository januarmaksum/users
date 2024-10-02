import LoginForm from "@/components/login/LoginForm";
import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookie = req.cookies.token;

  // Check if the user is already logged in
  if (cookie) {
    res.writeHead(302, { Location: "/dashboard" });
    res.end();
    return { props: {} };
  }

  return { props: {} };
};

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to access your account." />
      </Head>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
