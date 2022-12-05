import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createInfo, verifyUser } from "../../services/user";
import Input from "../Printgrows/Input/Input";
import { Button } from "../Printgrows/Button/Button";

import Cookies from "js-cookie";
import SignInForm from "../SignInForm";
import LoadingPage from "../LoadingPage";

const CreateInfo = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const query = router.query.product;
  const [users, setUsers] = useState({
    id: "",
    email: "",
  });
  const token = Cookies.get("token");
  const getDataToken = async () => {
    const res = await verifyUser();
    setUsers(res?.data);
    setLoading(false);
  };

  const handleCreateInfo = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const user = {
        fullName: fullName,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        facebook: facebook,
        query: query,
        id: users.id,
      };
      await createInfo(user);
      router.reload();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataToken();
  }, []);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
    setLoading(false);
  }, [token]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {isLogin ? (
            <div>
              <form
                onSubmit={(e) => handleCreateInfo(e)}
                className="space-y-8 divide-y divide-gray-200 sm:pb-2 "
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-  5">
                  <div className=" space-y-6 sm:pt-2 sm:space-y-5">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Personal Information
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Use a permanent address where you can receive mail.
                      </p>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeHolder="Johnny Depp"
                        label="Full name"
                        className="grid grid-cols-2 sm:grid-cols-3 "
                        name="full-name"
                        type="text"
                      />

                      <div className=" sm:border-t sm:border-gray-200 sm:pt-5">
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeHolder="johnny@gmail.com"
                          label="Email"
                          className="grid grid-cols-2 sm:grid-cols-3 "
                          name="email"
                          type="email"
                        />
                      </div>

                      <div className=" sm:border-t sm:border-gray-200 sm:pt-5 space-y-4">
                        <Input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeHolder="Hà Nội"
                          label="Address"
                          className="grid grid-cols-2 sm:grid-cols-3 "
                          type="text"
                          name="address"
                        />

                        <Input
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeHolder="0123456789"
                          label="Phone number"
                          className="grid grid-cols-2 sm:grid-cols-3 "
                          type="number"
                          name="phone"
                        />
                        <Input
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                          placeHolder="https://www.facebook.com/...."
                          label="Facebook"
                          className="grid grid-cols-2 sm:grid-cols-3 "
                          type="text"
                          name="facebook"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-none  sm:pt-5">
                  <div className="flex justify-end">
                    <Button
                      type="primary"
                      submit
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <SignInForm />
          )}
        </>
      )}
    </>
  );
};

export default CreateInfo;
