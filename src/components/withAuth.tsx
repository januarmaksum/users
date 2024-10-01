import * as React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    // if no token, redirect to the login page
    if (!token) {
      redirect("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
