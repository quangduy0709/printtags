import Layout from "../../components/Layout/MainLayout";
import Table from "../../components/Printgrows/Table/Table";
import { getQr } from "../../services/qr";
import { useMemo, useEffect, useState } from "react";
import dateFormat from "dateformat";
import QrCode from "../../components/Qrcode";
import StatusQr from "../../components/StatusQr";
import { useRouter } from "next/router";
import Pagination from "../../components/Printgrows/Pagination/Pagination";
import LoadingPage from "../../components/LoadingPage";
import MainLayout from "../../components/Layout/MainLayout";
import Card from "../../components/Printgrows/Card/Card";

interface Qr {
  id: number;
  code: string;
  createdAt: Date;
  url: string;
  ownerId: string;
  buyerId: string;
  sku: string;
}

enum ChangePageType {
  NextPage = "nextPage",
  LastPage = "lastPage",
}

const CreateQRPage = () => {
  const router = useRouter();

  const [listQr, setListQr] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const takeCount = 6;

  let no = takeCount * (Number(router.query.page) - 1) + 1;

  const fetchData = async () => {
    try {
      const { page } = router.query;

      if (!page) {
        router.push("/qr?page=1");
      }
      const { data } = await getQr(Number(page));

      setLoading(false);
      setListQr(data.qrs);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query.page]);

  const dataSource = useMemo(() => {
    return listQr.map((item: Qr, index: number) => {
      return [
        <> {no === 0 ? index + 1 : no++}</>,
        item.code,
        item.sku,
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
              columns={["No.", "code", "sku", "create at", "qr", "status"]}
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
CreateQRPage.layout = MainLayout;

export default CreateQRPage;
