import Button from "components/button";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const SignUp: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleSignUp = (data: any) => {
    console.log(data);
  };

  const loginValidation = {
    name: {
      required: "Name is required",
      pattern: {
        value: /^[A-Za-z]{2,}$/i,
        message: "Invalid ame",
      },
    },
    userName: {
      required: "User name is required",
      pattern: {
        value: /^[A-Za-z]{2,}$/i,
        message: "Invalid user name",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must have at least 6 characters",
      },
    },
    confirmPassword: {
      required: "Confirm password is required",
      minLength: {
        value: 6,
        message: "Password must have at least 6 characters",
      },
      validate: {
        value: (value: string) =>
          value !== getValues("password") && "Passwords do not match",
      },
    },
    terms: {
      required: "You must accept the terms and conditions",
      checked: {
        message: "You must accept the terms and conditions",
      },
    },
  };

  return (
    <>
      <Head>
        <title>SignUp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div
          className="mx-6 w-4/5 rounded-md bg-gray-100 py-8 px-10 shadow-md dark:bg-gray-800 md:w-2/5 md:px-14
        "
        >
          <h1 className="pb-4 text-center text-2xl font-bold">Sign Up</h1>
          <form>
            <label htmlFor="name" className="flex flex-col">
              <span className="pb-1">Name</span>
              <input
                type="name"
                placeholder="John Doe"
                {...register("name", loginValidation.name)}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="text-red-500">
                {errors.name && errors.name.message}
              </span>
            </label>
            <label htmlFor="userName" className="flex flex-col pt-3">
              <span className="pb-1">User Name</span>
              <input
                type="userName"
                placeholder="john_332"
                {...register("userName", loginValidation.userName)}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="text-red-500">
                {errors.userName && errors.userName.message}
              </span>
            </label>
            <label htmlFor="email" className="flex flex-col pt-3">
              <span className="pb-1">Email address</span>
              <input
                type="email"
                placeholder="john@gmail.com"
                {...register("email", loginValidation.email)}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="text-red-500">
                {errors.email && errors.email.message}
              </span>
            </label>
            <label htmlFor="password" className="flex flex-col pt-3">
              <span className="pb-1">Password</span>
              <input
                type="password"
                placeholder="********"
                {...register("password", loginValidation.password)}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="text-red-500">
                {errors.password && errors.password.message}
              </span>
            </label>
            <label htmlFor="confirmPassword" className="flex flex-col pt-3">
              <span className="pb-1">Confirm Password</span>
              <input
                type="password"
                placeholder="********"
                {...register(
                  "confirmPassword",
                  loginValidation.confirmPassword,
                )}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="mb-4 text-red-500">
                {errors.confirmPassword && errors.confirmPassword.message}
              </span>
            </label>
            <div className="flex flex-col">
              <label htmlFor="terms">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", loginValidation.terms)}
                />
                <span className="pl-2">
                  I agree to the terms and conditions
                </span>
              </label>
              <span className="text-red-500">
                {errors.terms && errors.terms.message}
              </span>
            </div>
            <Button.Filled
              onClick={handleSubmit(handleSignUp)}
              size="full"
              rounded
            >
              Sign Up
            </Button.Filled>
            <p className="mt-2">
              Already a Member ?
              <span className="pl-2 font-bold hover:text-blue-500 hover:underline">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
