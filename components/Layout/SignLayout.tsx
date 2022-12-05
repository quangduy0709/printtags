import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";
import { verifyUser } from "../../services/user";
import type { LayoutProps } from "./pageWithLayouts";

const SignLayout: LayoutProps = ({ children }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const token = Cookies.get("token");

  const getUsers = async () => {
    const user = await verifyUser();
    if (token && user) {
      dispatch(setToken(user.data));
    } else {
      dispatch(setToken(null));
    }
  };

  useEffect(() => {
    getUsers();
  }, [router, token]);

  return <div>{children}</div>;
};
export default SignLayout;
