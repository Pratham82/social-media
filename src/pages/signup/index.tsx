import Button from "components/button";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { register as registerThunk } from "redux/features/user/slice/user.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import toast from "react-hot-toast";
import { validateResponse } from "utils/resHandler";
import { handleErrors } from "utils/authUtils";

const SignUp: React.FC = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignUp = async (data: any) => {
    const userRes = await dispatch(registerThunk(data));
    // check if error
    if (!validateResponse(userRes)) {
      router.push("/login");
      toast.success("Sign up successful");
    } else {
      const { errorMessage } = handleErrors(userRes);
      toast.error(errorMessage);
    }
  };

  const signUpValidation = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Too Short!")
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(20, "Too Long!"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Too Short!")
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(20, "Too Long!"),
    username: Yup.string()
      .required("User name is required")
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .matches(/^[a-zA-Z0-9_.]+$/, "Please enter valid user name"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at 6 char long"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .min(6, "Password must be at 6 char long")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions",
    ),
  });

  const signUpOptions = { resolver: yupResolver(signUpValidation) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(signUpOptions);

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
            <div className="flex">
              <label htmlFor="firstName" className="flex w-1/2 flex-col">
                <span className="pb-1">First Name</span>
                <input
                  type="text"
                  placeholder="John"
                  {...register("firstName")}
                  className="rounded-md border border-gray-400 px-4 py-2"
                />
                <span className="text-red-500">
                  {errors.firstName && errors.firstName.message}
                </span>
              </label>
              <label htmlFor="lastName" className="flex w-1/2 flex-col pl-2">
                <span className="pb-1">Last name</span>
                <input
                  type="text"
                  placeholder="Doe"
                  {...register("lastName")}
                  className="rounded-md border border-gray-400 px-4 py-2"
                />
                <span className="text-red-500">
                  {errors.lastName && errors.lastName.message}
                </span>
              </label>
            </div>
            <label htmlFor="username" className="flex flex-col pt-3">
              <span className="pb-1">User Name</span>
              <input
                type="text"
                placeholder="john_332"
                {...register("username")}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="text-red-500">
                {errors.username && errors.username.message}
              </span>
            </label>
            <label htmlFor="email" className="flex flex-col pt-3">
              <span className="pb-1">Email address</span>
              <input
                type="email"
                placeholder="john@gmail.com"
                {...register("email")}
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
                {...register("password")}
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
                {...register("confirmPassword")}
                className="rounded-md border border-gray-400 px-4 py-2"
              />
              <span className="text-red-500">
                {errors.confirmPassword && errors.confirmPassword.message}
              </span>
            </label>
            <div className="flex flex-col pt-3">
              <label htmlFor="terms">
                <input type="checkbox" id="terms" {...register("terms")} />
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
