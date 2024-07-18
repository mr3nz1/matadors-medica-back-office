"use client";
import { createContext, useContext, useState } from "react";
import { AuthData, AuthType } from "../constants/types/Types";
import { supabase } from "../utils/supabase/config";

export const AuthContext = createContext<AuthType>({
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    about: "",
    userId: "",
    token: "",
  },
  status: "",
  isLoggedIn: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
  setStatus: () => {},
  login: async (email: string, password: string) => {},
  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    specialization: string,
    about: string
  ) => {},
});

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    about: "",
    userId: "",
    token: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState("");

  async function login(email: string, password: string) {
    setStatus("loading");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    const { data: doctor, error: doctorError } = await supabase
      .from("doctors")
      .select("*")
      .eq("auth_id", data.user.id);

    if (doctorError) throw doctorError;

    if (doctor == null)
      throw new Error("No doctor matches provided credentials");
    if (error) {
      throw error;
    }

    setIsLoggedIn(true);
    setUser({
      id: data.user.id,
      firstName: doctor[0].first_name,
      lastName: doctor[0].last_name,
      email: doctor[0].email,
      about: doctor[0].about,
      specialization: doctor[0].specialization,
      token: data.session?.access_token!,
      userId: data.session?.user.id!,
    });
    setStatus("authenticated");
  }

  async function register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    specialization: string,
    about: string
  ) {
    setStatus("loading");

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    if (data == null) throw new Error("Error registering doctor");

    const { error: doctorInsertError } = await supabase.from("doctors").insert({
      first_name: firstName,
      last_name: lastName,
      specialization,
      about,
      auth_id: data.session?.user.id!,
    });

    if (doctorInsertError) throw doctorInsertError;

    console.log({
      firstName,
      lastName,
      email,
      about,
      specialization,
      token: data.session?.access_token!,
      userId: data.session?.user.id!,
    });

    setUser({
      id: data.user?.id!,
      firstName,
      lastName,
      email,
      about,
      specialization,
      token: data.session?.access_token!,
      userId: data.session?.user.id!,
    });
    setStatus("authenticated");
  }

  const value = {
    user,
    isLoggedIn,
    status,
    setUser,
    setIsLoggedIn,
    setStatus,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
