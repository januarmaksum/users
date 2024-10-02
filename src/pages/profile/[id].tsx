import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchUser } from "@/services/userService";
import { User } from "@/interfaces/user.interface";
import UserDetail from "@/components/users/UserDetail";

interface Params {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as unknown as Params;

  const userResponse = await fetchUser(id);

  if (!userResponse) {
    return {
      notFound: true, // show 404 page if the user is not found
    };
  }

  return {
    props: {
      user: userResponse.data,
    },
  };
};

const UserDetailPage = ({ user }: { user: User }) => {
  const defaultTitle = "User Profile";
  return (
    <>
      <Head>
        <title>
          {user
            ? `${user.first_name} ${user.last_name} - Profile`
            : defaultTitle}
        </title>
      </Head>
      <div className="min-h-screen flex justify-center items-center">
        <UserDetail user={user} />
      </div>
    </>
  );
};

export default UserDetailPage;
