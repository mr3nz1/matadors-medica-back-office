// components/SignupForm.js
"use client";
import { useState } from "react";
import {
  FaApple,
  FaFacebook,
  FaGoogle,
  FaEnvelope,
  FaEyeSlash,
  FaEye,
  FaLock,
} from "react-icons/fa";
import Image from "next/image";
import Navbar from "../../components/navbar";
import Logo from "../../assets/images/sign.png";
import Link from "next/link";
import { signup } from "../action";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { useAuth } from "../../../../ctx/AuthContext";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    about: "",
    password: "",
    passwordRetry: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();

  async function handleFormChange(name: string, value: string) {
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    try {
      if (formData.password !== formData.passwordRetry)
        throw Error("Entered passwords should match");

      setIsLoading(true);

      await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.specialization,
        formData.about
      );

      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="bg-white py-5 px-8">
        <Navbar />
        <div className="flex h-screen">
          <div className="flex-1 flex items-center justify-center">
            <Image src={Logo} alt="Medica Logo" width={400} height={400} />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full flex flex-col gap-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Create Your Account
                </h2>
              </div>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  config={{ required: true }}
                />
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  config={{ required: true }}
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  config={{ required: true }}
                />
                <Input
                  name="specialization"
                  type="text"
                  placeholder="Specialization"
                  value={formData.specialization}
                  onChange={handleFormChange}
                  config={{ required: true }}
                />
                <textarea
                  name="about"
                  // value={formData.about}
                  placeholder="About you.."
                  className="text-gray-900 text-sm border border-gray-300 px-4 py-2 rounded-md outline-none"
                  onChange={(e) =>
                    handleFormChange(
                      e.target.name,
                      formData.about + e.target.value
                    )
                  }
                  required={true}
                />
                <Input
                  name="password"
                  value={formData.password}
                  type="password"
                  placeholder="Password"
                  onChange={handleFormChange}
                  config={{ required: true }}
                />
                <Input
                  name="passwordRetry"
                  value={formData.passwordRetry}
                  type="password"
                  placeholder="Re-enter password"
                  onChange={handleFormChange}
                  config={{ required: true }}
                />
                {error !== "" && (
                  <div className="bg-red-100 border border-red-300 text-red-500 px-4 py-2 rounded-md text-xs">
                    {error}
                  </div>
                )}
                <Button name="Register" isLoading={isLoading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
