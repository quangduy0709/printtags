import Table from "../../components/Printgrows/Table/Table";
import { useMemo, useEffect, useState, useCallback } from "react";
import dateFormat from "dateformat";
import { Button } from "../../components/Printgrows/Button/Button";
import { useRouter } from "next/router";
import { getItemsDate } from "../../services/items";
import Pagination from "../Printgrows/Pagination/Pagination";
import LoadingPage from "../LoadingPage";
import Card from "../Printgrows/Card/Card";
import { merror } from "../../lib/message";
import DatePicker from "../Printgrows/DatePicker/DatePicker";
import { formatEndDate, formatStartDate } from "../../lib/format";
import { exportExcel } from "../../lib/Export/exportExcel";

const Items = () => {
  const [total, setTotal] = useState(0);
  const [listExport, setListExport] = useState<string[]>([]);
  const [desExport, setDesExport] = useState<ListItem[]>([]);
  const [listItems, setlistItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [textSelect, setTextSelect] = useState(true);
  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();
  const [loadingPage, setLoadingPage] = useState(true);
  const [pagination, setPagination] = useState(1);

  const router = useRouter();

  const takeCount = 6;

  let stt = takeCount * (Number(router.query.page) - 1) + 1;

  const fetchData = async () => {
    router.push(
      {
        query: {
          start: dateStart?.toLocaleDateString(),
          end: dateEnd?.toLocaleDateString(),
          page: pagination,
        },
      },
      "",
      { shallow: true }
    );
    try {
      const startDate = dateStart && formatStartDate(dateStart);
      const endDate = dateEnd && formatEndDate(dateEnd);

      const dateRange = {
        dateStart: startDate?.toISOString(),
        dateEnd: endDate?.toISOString(),
      };
      setLoading(true);
      const { data } = await getItemsDate(Number(pagination), dateRange);
      setlistItems(data.items);
      setTotal(data.total);
      setLoading(false);
      setLoadingPage(false);
    } catch (err) {
      merror("Not found data");
    }
  };

  const handleSelectAll = () => {
    setTextSelect(!textSelect);
    setListExport(listItems.map((item) => item.externalId));
    setDesExport(listItems.map((item) => item));
  };

  const handleUnSelectAll = () => {
    setTextSelect(!textSelect);
    setListExport([]);
    setDesExport([]);
  };

  const handleCheck = useCallback(
    (items: ListItem) => {
      if (listExport.includes(items.externalId)) {
        const res = listExport.filter((item) => {
          return item !== items.externalId;
        });
        setListExport(res);
        const result = desExport.filter((item) => {
          return item !== items;
        });
        setDesExport(result);
      } else {
        setListExport([...listExport, items.externalId]);
        setDesExport([...desExport, items]);
      }
    },
    [listExport, desExport]
  );

  const onChangeStartDate = (date: Date) => {
    setDateStart(date);
    if (date) {
      router.push(
        {
          query: {
            start: date.toLocaleDateString(),
          },
        },
        "",
        { shallow: true }
      );
    }
  };

  const onChangeEndDate = (date: Date) => {
    setDateEnd(date);
    if (date) {
      router.push(
        {
          query: {
            end: date.toLocaleDateString(),
          },
        },
        "",
        { shallow: true }
      );
    }
  };

  const dataSource = useMemo(() => {
    return listItems.map((item: ListItem, index: number) => {
      return [
        <input
          className="cursor-pointer"
          checked={listExport.includes(item.externalId)}
          type="checkbox"
          key={index}
          onChange={() => handleCheck(item)}
        />,
        <> {stt === 0 ? index + 1 : stt++}</>,
        item.externalId,
        item.itemName,
        <> {item.Qr.length ? "YES" : "NO"}</>,
        Number(item.price) * item.quantity,
        item.quantity,
        item.order?.shopName,
        item.address,
        <>
          {String(item.image).indexOf("https://cdn.") >= 0 ? (
            <img src={item.image} alt="image" />
          ) : null}
        </>,
        <>
          {String(item.content).indexOf("https://cdn.") >= 0
            ? null
            : item.content}
        </>,
        <>{dateFormat(item.createdAt, "HH:MM dd/mm/yyyy")}</>,
      ];
    });
  }, [listItems, handleCheck, listExport]);

  const onChangePage = (page: number) => {
    setPagination(page);
    router.push(
      {
        query: {
          page: page,
        },
      },
      "",
      { shallow: true }
    );
  };

  useEffect(() => {
    if (router.isReady) {
      fetchData();
      setTextSelect(true);
      setListExport([]);
      setDesExport([]);
    }
  }, [router.isReady, router.query.page, router.query.start, router.query.end]);

  const handleExportExcel = async () => {
    exportExcel(listItems);
  };

  return (
    <>
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div>
                  {textSelect ? (
                    <Button
                      onClick={handleSelectAll}
                      type="primary"
                      className="bg-indigo-600 px-3 py-1 rounded-md text-white mb-5"
                    >
                      Select All
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUnSelectAll}
                      type="primary"
                      className="bg-indigo-600 px-3 py-1 rounded-md text-white mb-5"
                    >
                      UnSelect All
                    </Button>
                  )}
                </div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-40">
                    <DatePicker
                      onChange={(date) => date && onChangeStartDate(date)}
                      selected={dateStart || null}
                    />
                  </div>
                  <span>to</span>
                  <div className="w-40">
                    <DatePicker
                      onChange={(date) => date && onChangeEndDate(date)}
                      selected={dateEnd || null}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  loading={loadingButton}
                  onClick={handleExportExcel}
                  type="primary"
                  className="bg-indigo-600 px-3 py-1 rounded-md text-white mb-5"
                >
                  Export Excel
                </Button>
              </div>
            </div>
            <Card className="w-full">
              <Table
                columns={[
                  "Export",
                  "id",
                  "product code",
                  "product name",
                  "add qr",
                  "price",
                  "quantity",
                  "shop name",
                  "address",
                  "image",
                  "message",
                  "create At",
                ]}
                dataSource={dataSource}
                loading={loading}
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
