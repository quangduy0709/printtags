import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IProps {
  token: string | string[];
}
const Verification: React.FC<IProps> = (props) => {
  const { token } = props;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
        <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          <h3 className="text-2xl">Thanks for signing up for Print Tags!</h3>
          <div className="text-center">
            <Image src="/icon/verify.svg" alt="" width={80} height={80} />
          </div>

          <p>We're happy you're here. Let's get your email address verified:</p>
          <div className="mt-4">
            <Link href={`/api/user/verify/${token}`}>
              <a className="px-2 py-2 text-blue-200 bg-blue-600 rounded">
                Click to Verify Email
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
