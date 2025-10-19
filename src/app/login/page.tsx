"use client";
import { useState } from "react";
import { login, signup } from "./actions";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const emailError = (message: string) =>
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const signUpSuccess = (message: string) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    const result = await login(formData);
    if (result?.error) {
      emailError(result.error.message);
    }
    setIsLoading(false);
  }

  async function handleSignup(formData: FormData) {
    setIsLoading(true);
    const result = await signup(formData);
    if (result?.error) {
      emailError(result.error.message);
    } else {
      signUpSuccess("Signup successful! Please confirm your email.");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <form className="max-w-md w-[100%] mx-auto min-h-96 flex flex-col items-center justify-start p-5 rounded-2xl bg-component-background gap-5">
        <div className="flex flex-col items-center mb-5">
          <img src="/logo.png" alt="main logo" className="max-w-25" />
          <h1 className="text-2xl font-bold">Welcome</h1>
        </div>

        <input
          type="email"
          id="email"
          name="email"
          required
          className="bg-background outline-0 rounded-lg p-3 w-[100%]"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          required
          className="bg-background outline-0 rounded-lg p-3  w-[100%]"
          placeholder="Password"
        />
        <button
          formAction={handleLogin}
          className="w-[100%] bg-primary-color p-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-primary-color-hovered disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
        <button
          formAction={handleSignup}
          className="w-[100%] bg-secondary-color p-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-secondary-color-hovered disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
