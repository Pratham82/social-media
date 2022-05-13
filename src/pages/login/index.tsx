import Button from "components/button";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

const Login: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const handleLogin = (data: any) => {
    console.log(data);
  };
  const handleGuestLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("guest login");
    router.push("/home");
  };

  const loginValidation = {
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
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div
          className="mx-6 rounded-md bg-gray-100 py-8 px-10 shadow-md dark:bg-gray-800 md:w-2/5 md:px-14
        "
        >
          <h1 className="pb-4 text-center text-2xl font-bold">Login</h1>
          <form>
            <label htmlFor="email" className="flex flex-col">
              <span className="pb-1">Email address</span>
              <input
                type="text"
                placeholder="john@gmail.com"
                {...register("email", loginValidation.email)}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="text-red-500">
                {errors.email && errors.email.message}
              </span>
            </label>
            <label htmlFor="email" className="flex flex-col pt-4">
              <span className="pb-1">Password</span>
              <input
                type="password"
                placeholder="********"
                {...register("password", loginValidation.password)}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="mb-4 text-red-500">
                {errors.password && errors.password.message}
              </span>
            </label>
            <Button.Filled
              onClick={handleSubmit(handleLogin)}
              size="full"
              rounded
            >
              Login
            </Button.Filled>
            <Button.Outline
              onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleGuestLogin(e)
              }
              size="full"
              rounded
            >
              Guest Login
            </Button.Outline>
            <p className="mt-2">
              Don&apos;t have an account ?
              <span className="pl-1 font-bold hover:text-blue-500 hover:underline">
                <Link href="/signup">Create an Account</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
