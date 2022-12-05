import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../../components/Printgrows/Button/Button";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-200 min-w-screen">
      <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
        <h3 className="text-2xl">Thanks for signing up for Print Tags!</h3>
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <Image src="/icon/email.svg" layout="fill" />
          </div>
        </div>
        <p>
          We're happy you're here. Please check your email to complete the last
          step
        </p>
        <div className="mt-5">
          <Link href="/">
            <Button type="primary">Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
