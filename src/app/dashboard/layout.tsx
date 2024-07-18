"use client";

import React, { useEffect } from "react";
import { useWithAuth } from "../../../hooks/useWithAuth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../ctx/AuthContext";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { isLoggedIn, status } = useAuth();
  const router = useRouter();

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    router.replace("/auth/login");
    return null;
  }

  return <div>{children}</div>;
}
