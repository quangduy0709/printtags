import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { setToken } from "../../redux/authSlice";

import { verifyUser } from "../../services/user";
import HeaderSign from "../Header/HeaderSign";
import NavBar from "../Header/NavBar";
import type { LayoutProps } from "./pageWithLayouts";

import LoadingPage from "../LoadingPage";
import Cookies from "js-cookie";

const MainLayout: LayoutProps = ({ children }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const token = Cookies.get("token");

  const getUsers = async () => {
    const user = await verifyUser();
    if (token && user) {
      dispatch(setToken(user.data));

      setLoading(false);
      setIsSignUp(true);
    } else {
      dispatch(setToken(null));

      setLoading(false);
      setIsSignUp(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [router, token]);

  return loading ? (
    <LoadingPage />
  ) : (
    <div>
      <div className="border-b">{isSignUp ? <HeaderSign /> : <NavBar />}</div>
      <div className="min-h-full">
        <div className="py-10">
          <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default MainLayout;
