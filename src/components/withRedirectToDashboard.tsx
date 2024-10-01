import * as React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const withRedirectToDashboard = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const RedirectComponent: React.FC<P> = (props) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // check if the user is already login
    if (token) {
      redirect("/dashboard");
    }

    return <WrappedComponent {...props} />;
  };

  return RedirectComponent;
};

export default withRedirectToDashboard;
