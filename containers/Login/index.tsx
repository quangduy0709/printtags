import React, { useEffect, useState } from "react";

import { login } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import Input from "../../components/Printgrows/Input/Input";
import { Button } from "../../components/Printgrows/Button/Button";
import { loginFailed } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const error = useSelector(
    (state: InterfaceErrorLogin) => state.auth.login.error
  );

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newUser = {
        email: email,
        password: password,
      };
      setLoading(true);
      await login(newUser, dispatch, router);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(loginFailed(null));
  }, []);

  return (
    <>
      <div className="h-screen mx-auto flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="mt-1">
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="mt-1">
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="">
                {error ? (
                  <p className="mt-2 text-base font-semibold text-red-500">
                    Email or password is incorrect
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="flex justify-between items-end">
                <Link href="/login/forgot-password">
                  <a className="font-medium text-indigo-600 text-sm hover:text-red-400">
                    Forget password?
                  </a>
                </Link>
                <Link href="/register">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500 text-sm">
                    Don't have an account? Sign up
                  </a>
                </Link>
              </div>

              <div>
                <Button
                  submit
                  type="primary"
                  loading={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
