import React, { useEffect, useState } from "react";

import { Fragment } from "react";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { logoutUser } from "../../services/user";
import Image from "next/image";

import Link from "next/link";
import { classNames } from "../../utils";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/authSlice";

const HeaderSign = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const user = useSelector((state: any) => state.auth.token.user);

  const [users, setUsers] = useState({
    id: "",
    email: "",
    admin: false,
  });

  const [isAdmin, setisAdmin] = useState<boolean>(false);

  const navigationAdmin = [
    { name: "Manage Qr", href: "/qr", current: false, admin: isAdmin },
    { name: "Orders", href: "/items", current: false, admin: isAdmin },
    { name: "Account", href: "/users", current: false, admin: isAdmin },
  ];

  const navigationUser = [
    { name: "My Qr", href: "/myqr", current: false, admin: !isAdmin },
  ];

  const logOut = async () => {
    await logoutUser();
    dispatch(setToken(null));

    router.push("/");
  };

  useEffect(() => {
    if (user) {
      setUsers(user);
    }
    if (user.admin) {
      setisAdmin(true);
    } else {
      setisAdmin(false);
    }
  }, []);

  return (
    <>
      <Disclosure as="nav" className="bg-white ">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/">
                      <div className="flex items-center">
                        <div className="relative h-8 w-8 cursor-pointer">
                          <Image
                            className="block lg:hidden"
                            src="/images/logo.svg"
                            alt="Workflow"
                            layout="fill"
                          />
                        </div>
                        <div className="ml-3 font-medium text-lg sm:font-bold sm:text-2xl uppercase text-gray-600  cursor-pointer ">
                          Print Tags
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {isAdmin ? (
                      <>
                        {navigationAdmin.map((item, index) => (
                          <Link href={`${item.href}`} key={index}>
                            <a
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? "border-indigo-500 text-gray-900"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.admin === true ? item.name : ""}
                            </a>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <>
                        {navigationUser.map((item, index) => (
                          <Link href={`${item.href}`} key={index}>
                            <a
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? "border-indigo-500 text-gray-900"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.admin === true ? item.name : ""}
                            </a>
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <div className="relative w-8 h-8">
                          <Image
                            className="rounded-full "
                            src="/images/avt.jpg"
                            alt=""
                            layout="fill"
                          />
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }: { active: Boolean }) => (
                            <>
                              <Link href={`/account/${users.id}`}>
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {" "}
                                  Profile
                                </a>
                              </Link>
                              <Link href={`/change-password`}>
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Change password
                                </a>
                              </Link>
                              <Link href="/">
                                <a
                                  onClick={logOut}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  LogOut
                                </a>
                              </Link>
                            </>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {isAdmin ? (
                  <>
                    {navigationAdmin.map((item, index) => (
                      <Link href={`${item.href}`} key={index}>
                        <a
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 flex flex-col",
                            "flex  px-4 pt-4 border-b-2 text-sm font-medium  flex-col"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.admin === true ? item.name : ""}
                        </a>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    {navigationUser.map((item, index) => (
                      <Link href={`${item.href}`} key={index}>
                        <a
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 flex flex-col",
                            "flex  px-4 pt-4 border-b-2 text-sm font-medium  flex-col"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.admin === true ? item.name : ""}
                        </a>
                      </Link>
                    ))}
                  </>
                )}
                <div className="flex flex-col">
                  <Link href={`/account/${users.id}`}>
                    <a
                      className={classNames(
                        "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-4 pt-4 border-b-2 text-sm font-medium"
                      )}
                    >
                      Profile
                    </a>
                  </Link>
                  <Link href={`/change-password`}>
                    <a
                      className={classNames(
                        "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-4 pt-4 border-b-2 text-sm font-medium"
                      )}
                    >
                      Change password
                    </a>
                  </Link>
                  <Link href="/">
                    <a
                      onClick={logOut}
                      className={classNames(
                        "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-4 pt-4 border-b-2 text-sm font-medium"
                      )}
                    >
                      LogOut
                    </a>
                  </Link>
                </div>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4"></div>
                <div className="mt-3 space-y-1"></div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default HeaderSign;
