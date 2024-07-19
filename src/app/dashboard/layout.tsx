"use client";

import React, { useEffect } from "react";
import { useWithAuth } from "../../../hooks/useWithAuth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../ctx/AuthContext";
import DesignLayout from "../components/layout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { isLoggedIn, status, user } = useAuth();
  const router = useRouter();

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    router.replace("/auth/login");
    return null;
  }

  return <DesignLayout>{children}</DesignLayout>;
}
