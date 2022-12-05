import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Printgrows/Input/Input";
import { register } from "../../redux/apiRequest";
import { Button } from "../../components/Printgrows/Button/Button";
import Errors from "../../components/Errors";
import Image from "next/image";
import { merror } from "../../lib/message";
import { registerFailed } from "../../redux/authSlice";
import { registerUser } from "../../services/user";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector(
    (state: InterfaceErrorRegister) => state.auth.register.error
  );

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let errors;
    errors = [];
    errors = validate();
    if (errors.length > 0) {
      setErrors(errors);

      return;
    }
    try {
      setLoading(true);
      const newUser = {
        name: userName,
        email: email,
        password: password,
      };

      await register(newUser, dispatch, router);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  function validate() {
    const errors = [];
    const vaiidate = email.split("").filter((x) => x === "@").length;
    dispatch(registerFailed(null));

    if (email.length < 5) {
      errors.push("Email should be at least 5 charcters long");
    }
    if (email.search(" ") > 0) {
      errors.push("Emails must not contain spaces");
    }
    if (vaiidate !== 1) {
      errors.push("Email should contain a @");
    }
    if (email.indexOf(".") === -1) {
      errors.push("Email should contain at least one dot");
    }
    if (password.length < 6) {
      errors.push("Password should be at least 6 characters long");
    }
    return errors;
  }

  const messageError = (error: string) => {
    merror(error);
    dispatch(registerFailed(null));
  };

  useEffect(() => {
    if (error) {
      messageError(error);
    }
    setErrors([]);
  }, [error]);

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute h-12 top-6 lg:w-1/4 lg:right-6 z-50">
        {errors.length ? <Errors error={errors} /> : ""}
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <div className=" w-full text-center ">
          <Image
            className=" h-12 w-auto"
            src="/logo.svg"
            alt="Workflow"
            width={48}
            height={48}
          />
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className="mt-1">
                <Input
                  label="User Name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <Input
                  label="Address"
                  type="text"
                  className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <Button
                loading={loading}
                type="primary"
                submit
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
