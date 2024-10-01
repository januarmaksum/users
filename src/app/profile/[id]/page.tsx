import withAuth from '@/components/withAuth';
import { Metadata } from 'next';

export const generateMetadata = ({ params }: { params: { id: string } }): Metadata => ({
  title: `User Profile - id: ${params.id}`,
});

interface UserDetailPageWrapperProps {
  params: {
    id: string;
  };
}

const UserDetailPageWrapper = (props: UserDetailPageWrapperProps) => {
  const { params } = props;
  return <UserDetailPage params={params} />;
};

const UserDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-2xl">User Profile for ID: {params.id}</h1>
    </div>
  );
};

export default withAuth(UserDetailPageWrapper as React.ComponentType);
