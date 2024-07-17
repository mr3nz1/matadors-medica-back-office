"use client";
import { createContext, useContext, useState } from "react";
import { AuthData, AuthType } from "../constants/types/Types";
import { supabase } from "../utils/supabase/config";

export const AuthContext = createContext<AuthType>({
  user: {
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    about: "",
    userId: "",
    token: "",
  },
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
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
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    about: "",
    userId: "",
    token: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login(email: string, password: string) {
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
  }

  async function register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    specialization: string,
    about: string
  ) {
    console.log("email: " + email, "password: " + password);

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
      firstName,
      lastName,
      email,
      about,
      specialization,
      token: data.session?.access_token!,
      userId: data.session?.user.id!,
    });
  }

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
