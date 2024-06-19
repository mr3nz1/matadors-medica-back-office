// components/SignupForm.js
"use client";
import { useState } from 'react';
import { FaApple, FaFacebook, FaGoogle, FaEnvelope, FaEyeSlash, FaEye, FaLock } from 'react-icons/fa';
import Image from 'next/image';
import Navbar from '../../components/navbar';
import Logo from '../../assets/images/sign.png';
import Link from 'next/link';
import Button from '@/app/components/button';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  
    localStorage.setItem('userData', JSON.stringify({ email, password }));

  
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }

    setEmail('');
    setPassword('');
    setRememberMe(false);

    console.log('Form submitted', email, password);
  };

  return (
    <>
      <div className="bg-white py-5 px-8">
        <Navbar />
        <div className="flex h-screen">
          <div className="flex-1 flex items-center justify-center">
            <Image src={Logo} alt="Medica Logo" width={400} height={400} />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your Account</h2>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm flex flex-col gap-5">
                  <div className="relative">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-black" />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-black" />
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex justify-center items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                  </div>
                </div>
                <div>
                  <Button name='Sign Up'/>
                
                </div>
                <div className="text-center">
                  <p className="text-gray-500 py-6">or continue with</p>
                  <div className="flex items-center justify-center mt-2 space-x-3">
                    <button type="button" className="bg-white py-2 px-5 rounded-xl border border-gray-300">
                      <FaFacebook className="text-blue-500" />
                    </button>
                    <button type="button" className="bg-white py-2 px-5 rounded-xl border border-gray-300">
                      <FaGoogle className="text-red-500" />
                    </button>
                    <button type="button" className="bg-white py-2 px-5 rounded-xl border border-gray-300">
                      <FaApple className="text-black" />
                    </button>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p className="text-gray-500">You have an account? <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
