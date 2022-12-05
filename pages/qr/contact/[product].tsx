/* eslint-disable react-hooks/exhaustive-deps */

import CreateInfo from "../../../components/Contact/CreateInfo";
import InfoUser from "../../../components/Contact/InfoUser";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getInfo, getUser, verifyUser } from "../../../services/user";
import Cookies from "js-cookie";
import MainLayout from "../../../components/Layout/MainLayout";
import LoadingPage from "../../../components/LoadingPage";

interface Info {
  name: string;
  email: string;
  address: string;
  phone: string;
  fbUrl: string;
}
interface Token {
  id: string;
}

const Product = () => {
  const router = useRouter();
  const [info, setInfo] = useState<Info>();
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token");

  const getUsers = async () => {
    try {
      if (token) {
        const userInfo = await verifyUser();
        if (userInfo?.data) {
          const { data: userDetail } = await getUser(String(userInfo.data.id));
          if (userDetail) {
            setInfo(userDetail);
          } else {
            const { data } = await getInfo(String(router.query.product));
            setInfo(data);
          }
        }
      } else {
        if (router.query.product) {
          const { data: infoCheck } = await getInfo(
            String(router.query.product)
          );

          setInfo(infoCheck);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [token, router.query.product]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>{info ? <InfoUser user={info} /> : <CreateInfo />}</>
      )}
    </>
  );
};

Product.layout = MainLayout;

export default Product;
