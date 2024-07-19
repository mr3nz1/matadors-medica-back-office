"use client";
import Navbar from "../../components/navbar";
import Image from "next/image";
import {
  FaApple,
  FaFacebook,
  FaGoogle,
  FaEnvelope,
  FaEyeSlash,
  FaEye,
  FaLock,
} from "react-icons/fa";
import Logo from "../../assets/images/log.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../../ctx/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState<{
    [key: string]: string;
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const { login, user, setStatus } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(user.firstName + " " + user.lastName);
    console.log(user.email);
  }, [user]);

  function handleFormData(name: string, value: string) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);
      setError("")
      await login(formData.email, formData.password);
      setIsLoading(false);
      router.replace("/dashboard");
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
      setStatus("error");
    }
  }

  return (
    <>
      <div className="bg-white p-8">
        <Navbar />
        <div className="flex h-screen">
          <div className="flex-1 flex items-center justify-center">
            <Image src={Logo} alt="Medica Logo" width={400} height={400} />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Login to Your Account
                </h2>
              </div>
              <form className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm flex flex-col gap-5">
                  <div className="relative">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md   :text-sm"
                      placeholder="Email address"
                      onChange={(e) => handleFormData("email", e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-black" />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={"password"}
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md    sm:text-sm"
                      placeholder="Password"
                      onChange={(e) =>
                        handleFormData("password", e.target.value)
                      }
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-black" />
                    </div>
                  </div>
                </div>
                {error !== "" && (
                  <div className="bg-red-100 border border-red-300 px-4 py-2 rounded-md text-red-500 text-xs t">
                    {error}
                  </div>
                )}
                <div className="flex items-center justify-center">
                  <div className="flex justify-center items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600  border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    formAction={handleSubmit}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 mb-4"
                  >
                    {isLoading ? "Loading" : "Sign In"}
                  </button>

                  <div className="text-center py-6">
                    <Link href="/forgot-password" className="text-blue-600 ">
                      Forgot Password
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 py-6">or continue with</p>
                  <div className="flex items-center justify-center mt-2 space-x-3">
                    <button
                      type="button"
                      className="bg-white py-2 px-5 rounded-xl border border-gray-300"
                    >
                      <FaFacebook className="text-blue-500" />
                    </button>
                    <button
                      type="button"
                      className="bg-white py-2 px-5 rounded-xl border border-gray-300"
                    >
                      <FaGoogle className="text-red-500" />
                    </button>
                    <button
                      type="button"
                      className="bg-white py-2 px-5 rounded-xl border border-gray-300"
                    >
                      <FaApple className="text-black" />
                    </button>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p className="text-gray-500">
                    Don&apost have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
