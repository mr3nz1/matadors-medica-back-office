import React, { ComponentType } from "react";
import { useAuth } from "../ctx/AuthContext";
import { useRouter } from "next/router";

interface Props {
  children: React.JSX.Element;
}

export function useWithAuth<T extends object>(WrappedComponent: ComponentType<T>) {
  const { user } = useAuth();

  return function AuthenticatedCompontent(props: T) {
    const { isLoggedIn, status } = useAuth();
    const router = useRouter();

    if (status == "authenticated") {
      return <div>Loading...</div>;
    }

    if (!status) {
      router.replace("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
