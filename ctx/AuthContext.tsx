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
    doctorId: "",
    token: "",
    image: "",
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

const images = [
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1643297654416-05795d62e39c?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1643297653753-2d3f459edc6b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1666886573681-a8fbe983a3fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1666887360742-974c8fce8e6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    about: "",
    doctorId: "",
    token: "",
    image: "",
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

    console.log("User: ", user);
    console.log("doctor[0].doctor_id: ", doctor[0].doctor_id);
    setUser({
      id: data.user.id,
      firstName: doctor[0].first_name,
      lastName: doctor[0].last_name,
      email: doctor[0].email,
      about: doctor[0].about,
      specialization: doctor[0].specialization,
      token: data.session?.access_token!,
      doctorId: doctor[0].id,
      image: doctor[0].image,
    });
    setStatus("authenticated");
  }

  console.log(
    "images[Math.floor(Math.random() * 4)]: ",
    images[Math.floor(Math.random() * 4)]
  );

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
      image: images[Math.floor(Math.random() * 4)],
    });

    if (doctorInsertError) throw doctorInsertError;

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
