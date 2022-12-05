import React, { useState } from "react";

import { loginQr } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "./Printgrows/Input/Input";
import { Button } from "./Printgrows/Button/Button";
interface IPros {
  auth: {
    login: {
      error: boolean;
    };
  };
}
const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state: IPros) => state.auth.login.error);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();

    try {
      const newUser = {
        email: email,
        password: password,
      };
      loginQr(newUser, dispatch, router);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center sm:py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 sm:h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-lg sm:text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white sm:py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            action="#"
            onSubmit={(e) => handleSubmit(e)}
            method="POST"
          >
            <div className="mt-1">
              <Input
                label="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500  sm:text-sm"
              />
            </div>

            <div className="mt-1">
              <Input
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500  sm:text-sm"
              />
            </div>

            {error ? (
              <p className="mt-2 text-center text-sm text-red-500">
                {" "}
                Incorrect information. Please check your email or password!
              </p>
            ) : (
              ""
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/register">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Dont have an account? Sign up.
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="primary"
                submit
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleSubmit()}
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
