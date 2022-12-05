/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUser, updateInfo } from "../../services/user";
import Input from "../../components/Printgrows/Input/Input";
import { Button } from "../../components/Printgrows/Button/Button";
import Link from "next/link";
import LoadingPage from "../../components/LoadingPage";
import MainLayout from "../../components/Layout/MainLayout";
interface Qr {
  idQr: string;
}
interface Info {
  name: string;
  email: string;
  address: string;
  phone: number;
  fbUrl: string;
}

const Account = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [dataUser, setDataUser] = useState<{}>();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const idUser = router.query.user;

  const fetchData = async () => {
    try {
      const { data } = await getUser(String(idUser));
      setDataUser(data);
      setFullName(data.name);
      setEmail(data.email);
      setAddress(data.address);
      setPhoneNumber(data.phone);
      setFacebook(data.fbUrl);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [idUser]);

  const handleUpdate = async () => {
    try {
      const userUpdate = {
        fullName: fullName,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        facebook: facebook,
        idUser: idUser,
      };
      setEdit(!edit);
      await updateInfo(userUpdate);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {dataUser ? (
            <div className="bg-white  py-5 border-b border-gray-200  rounded-xl">
              <div className={`space-y-8 divide-y divide-gray-200 pb-2  `}>
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div className="pt-2 space-y-6 sm:pt-2 sm:space-y-5">
                    <div className="flex justify-between gap-10">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Personal Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 break-normal">
                          Use a permanent address where you can receive mail.
                        </p>
                      </div>
                      <Button
                        onClick={handleUpdate}
                        type="primary"
                        className=" bg-blue-500 h-1/2 py-2 px-5 text-white rounded-lg shadow-md font-medium"
                      >
                        {edit ? "Save" : "Edit"}
                      </Button>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                      <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Email
                        </label>
                        <div className=" flex justify-between items-center gap-64 col-span-2">
                          {edit ? (
                            <Input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="flex-1"
                              name="full-name"
                              type="text"
                              disabled
                            />
                          ) : (
                            <div className="mt-1 sm:mt-1 col-span-4 break-normal">
                              {email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Full name
                        </label>
                        <div className=" flex justify-between items-center gap-64 col-span-2">
                          {edit ? (
                            <Input
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="flex-1"
                              name="full-name"
                              type="text"
                            />
                          ) : (
                            <div className="mt-1 sm:mt-1 col-span-4">
                              {fullName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Address
                        </label>
                        <div className=" flex justify-between items-center  col-span-2">
                          {edit ? (
                            <Input
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="flex-1"
                              name="full-name"
                              type="text"
                            />
                          ) : (
                            <div className="mt-1 sm:mt-1 col-span-4 break-normal">
                              {address}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Phone number
                        </label>
                        <div className=" flex justify-between items-center gap-64 col-span-2">
                          {edit ? (
                            <Input
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="flex-1"
                              name="full-name"
                              type="number"
                            />
                          ) : (
                            <div className="mt-1 sm:mt-1 col-span-4">
                              {phoneNumber}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Facebook
                        </label>
                        <div className=" flex justify-between items-center gap-64 col-span-2">
                          {edit ? (
                            <Input
                              value={facebook}
                              onChange={(e) => setFacebook(e.target.value)}
                              className="flex-1"
                              name="full-name"
                              type="text"
                            />
                          ) : (
                            <div className="mt-1 sm:mt-1 col-span-4 break-all">
                              {facebook}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
              <div className="max-w-max mx-auto">
                <main className="sm:flex">
                  <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
                    Oop !!
                  </p>
                  <div className="sm:ml-6">
                    <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        No information found
                      </h1>
                      <p className="mt-1 text-base text-gray-500">
                        Please use a Qr code to update information
                      </p>
                    </div>
                    <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                      <Link href="/">
                        <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Go back home
                        </a>
                      </Link>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
Account.layout = MainLayout;

export default Account;
