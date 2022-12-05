import Layout from "../../components/Layout/MainLayout";
import Table from "../../components/Printgrows/Table/Table";

import { useMemo, useEffect, useState } from "react";
import dateFormat from "dateformat";

import { Button } from "../../components/Printgrows/Button/Button";

import { useRouter } from "next/router";
import { getUsers } from "../../services/items";
import Pagination from "../../components/Printgrows/Pagination/Pagination";
import Role from "./Role";
import LoadingPage from "../../components/LoadingPage";
import Card from "../../components/Printgrows/Card/Card";

const Items = () => {
  const [total, setTotal] = useState(0);
  const [listItems, setlistItems] = useState<ListUser[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const takeCount = 6;

  let stt = takeCount * (Number(router.query.page) - 1) + 1;

  const fetchData = async () => {
    try {
      const { page } = router.query;
      if (!router.query.page) {
        router.push("/users?page=1");
      }
      setLoading(true);
      const { data } = await getUsers(Number(page));
      setlistItems(data.items);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const dataSource = useMemo(() => {
    return listItems.map((item: ListUser, index: number) => {
      return [
        <> {stt === 0 ? index + 1 : stt++}</>,
        item.email,
        <> {item.emailVerify ? "activated" : "not activated"}</>,
        <>
          <Role role={item.admin} id={item.id} />
        </>,

        <>{dateFormat(item.createdAt, "HH:MM dd/mm/yyyy")}</>,
      ];
    });
  }, [listItems]);

  const onChangePage = (page: number) => {
    router.push({
      query: {
        page: page,
      },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="mb-4">
            <Card>
              <Table
                columns={[
                  "stt",
                  "email",
                  "active account",
                  "role",
                  "create at",
                ]}
                dataSource={dataSource}
              />
            </Card>
          </div>
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

export default Items;
