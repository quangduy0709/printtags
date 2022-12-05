/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Layout from "../../components/Layout/MainLayout";
import Pagination from "../../components/Printgrows/Pagination/Pagination";
import Table from "../../components/Printgrows/Table/Table";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { verifyUser } from "../../services/user";
import { getMyQr } from "../../services/qr";
import QrCode from "../../components/Qrcode";
import StatusQr from "../../components/StatusQr";
import dateFormat from "dateformat";
import LoadingPage from "../../components/LoadingPage";
import Card from "../../components/Printgrows/Card/Card";
import MainLayout from "../../components/Layout/MainLayout";

interface Token {
  id: string;
}

const index = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [listQr, setListQr] = useState([]);
  const [total, setTotal] = useState(0);
  const [tokenUser, setTokenUser] = useState<Token>();
  const [loading, setLoading] = useState(true);

  const takeCount = 6;
  const getUsers = async () => {
    if (token) {
      const res = await verifyUser();
      setTokenUser(res?.data);
    } else {
      return;
    }
  };
  useEffect(() => {
    getUsers();
  }, [token]);

  const fetchData = async () => {
    try {
      const { page } = router.query;

      if (tokenUser) {
        const { data } = await getMyQr(Number(page || 1), tokenUser.id);
        setListQr(data.qrs);
        setTotal(data.total);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query.page, tokenUser]);

  const dataSource = useMemo(() => {
    return listQr.map((item: MyQr) => {
      return [
        item.id,
        item.code,
        <>{dateFormat(item.createdAt, "HH:MM dd/mm/yyyy")}</>,
        <QrCode key={item.id} code={item.code} />,
        <StatusQr
          key={item.id}
          ownerId={item.ownerId}
          buyerId={item.buyerId}
        />,
      ];
    });
  }, [listQr]);

  const onChangePage = (page: number) => {
    router.push({
      query: {
        page: page,
      },
    });
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Card className="mb-4">
            <Table
              columns={["id", "code", "Create At", "QR", "Status"]}
              dataSource={dataSource}
            />
          </Card>
          <Pagination
            current={Number(router.query.page || 1)}
            pageSize={takeCount}
            total={total}
            onChange={onChangePage}
          />
        </>
      )}
    </>
  );
};
index.layout = MainLayout;

export default index;
