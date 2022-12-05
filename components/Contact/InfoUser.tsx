/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { updateQr } from "../../services/qr";
import LoadingPage from "../LoadingPage";

interface Info {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  fbUrl?: string;
  id?: string;
  user?: User;
}

interface User {
  name: string;
  email: string;
  address: string;
  phone: string;
  fbUrl: string;
}

interface Props {
  user: User;
}

const InfoUser = (props: Props) => {
  const user = props.user;
  const [info, setInfo] = useState<Info>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setInfo(user);
    }
  }, [user]);

  const handleUpdateQr = useCallback(async () => {
    try {
      if (info) {
        const desUpdate = {
          codeQr: String(router.query.product),
          ownId: info.id,
        };
        await updateQr(desUpdate);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [info]);

  useEffect(() => {
    handleUpdateQr();
  }, [router.query.product, handleUpdateQr]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {info && (
            <div className=" space-y-8 divide-y divide-gray-200 pb-2 ">
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="pt-2 space-y-6 sm:pt-2 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Personal Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Use a permanent address where you can receive mail.
                    </p>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Full name
                      </label>
                      <div className="mt-1 sm:mt-1 sm:col-span-2">
                        {info.name}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Email address
                      </label>
                      <div className="mt-1 sm:mt-1 sm:col-span-2 break-normal">
                        {info.email}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Address
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="mt-1 sm:mt-1 sm:col-span-2 break-normal">
                          {info.address}
                        </div>
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="phone-number"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Phone number
                      </label>
                      <div className="mt-1 sm:mt-1 sm:col-span-2">
                        {info.phone}
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="phone-number"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Facebook
                      </label>
                      <div className="mt-1 sm:mt-1 sm:col-span-2 break-all ">
                        {info.fbUrl}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InfoUser;
