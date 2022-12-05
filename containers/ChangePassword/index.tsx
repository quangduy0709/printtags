import React, { useState } from "react";

import { useRouter } from "next/router";

import Input from "../../components/Printgrows/Input/Input";
import { Button } from "../../components/Printgrows/Button/Button";
import { merror, msuccess } from "../../lib/message";
import { changePassword } from "../../services/user";
import { useSelector } from "react-redux";
import Image from "next/image";

const ChangePassword = () => {
  const user = useSelector((state: ReduxUser) => state.auth.token.user);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      merror("Password and confirm password does not match");
      return;
    }
    const res = await changePassword(user.email, password);
    if (res.status === 200) {
      msuccess("Your password has been changed successfully");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <div className="h-screen mx-auto flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" relative w-12 h-12 mx-auto">
          <Image src="/logo.svg" alt="Workflow" layout="fill" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Change your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className="mt-1">
                <Input
                  label="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="mt-1">
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Button
                submit
                type="primary"
                loading={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
