import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../components/Printgrows/Button/Button";
import Image from "next/image";
import Input from "../../components/Printgrows/Input/Input";

import { resetPass } from "../../services/user";
import { useRouter } from "next/router";
import { msuccess } from "../../lib/message";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const res = await resetPass(email);
    if (res.status === 200) {
      msuccess("Please check your email !!");
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-200 min-w-screen">
      <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
        <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <Image src="/icon/email.svg" layout="fill" />
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-700">
          We get it, stuff happens. Just enter your email address below and
          we'll send you a link to reset your password!
        </p>
        <form
          className="mb-4 bg-white rounded"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-4">
            <Input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700  rounded  appearance-none focus:outline-none focus:shadow-outline"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 text-center">
            <Button
              submit
              className="  font-bold text-white  rounded-full  focus:outline-none focus:shadow-outline"
              type="primary"
            >
              Reset Password
            </Button>
          </div>
          <hr className="mb-6 border-t" />
          <div className="mt-5">
            <Link href="/">
              <Button type="primary" className="px-4 py-2">
                Turn Back Home
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
