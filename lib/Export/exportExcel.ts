import * as ExcelJS from "exceljs";
import FileSaver from "file-saver";
import QRCode from "qrcode";
import { getImage } from "../imgBase64";

export const exportExcel = async (listItems: ListItem[]) => {
  const fileName = "export.xlsx";
  const wb = new ExcelJS.Workbook();

  const ws = wb.addWorksheet("Sheet", {
    pageSetup: {
      horizontalCentered: true,
      verticalCentered: true,
    },
  });
  await createValueCell(ws);
  await addImage(listItems, ws, wb);
  wb.xlsx
    .writeBuffer()
    .then((buffer) => FileSaver.saveAs(new Blob([buffer]), fileName))
    .catch((err) => console.log("Error writing excel export", err));
};
/**
 * @name createValueCell
 * @description dùng để tạo ra value cho các ô trong excel
 * @param ws
 */
export const createValueCell = (ws: ExcelJS.Worksheet) => {
  ws.pageSetup.horizontalCentered = true;
  ws.pageSetup.verticalCentered = true;
  ws.getCell("A1").value = "Product Image";
  ws.getCell("B1").value = "Product Name";
  ws.getCell("C1").value = "Product Code";
  ws.getCell("D1").value = "Price";
  ws.getCell("E1").value = "Shop Name";
  ws.getCell("F1").value = "Address";
  ws.getCell("G1").value = "Quantity";
  ws.getCell("H1").value = "Message";
  ws.getCell("I1").value = "QR";
  ws.getCell("J1").value = "SKU";
  ws.getCell("K1").value = "Create At";
  ws.autoFilter = {
    from: "A1",
    to: "J1",
  };
};

/**
 * @name convertData
 * @description Convert Data( chuyển từ dữ liệu ban đầu cho Qr thành base64 và tách sku trong object Qr ra)
 * @param listItems
 * @returns
 */

export const getBase64Qr = async (item: ListItem) => {
  return await Promise.all(
    item.Qr.map(
      async (qr: { code: string }) =>
        await QRCode.toDataURL(
          `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/qr/contact/${qr.code}`
        )
    )
  );
};

export const convertData = async (listItems: ListItem[]) => {
  const listExcel = await Promise.all(
    listItems.map(async (item) => {
      const convertQr =
        item.Qr.length > 0
          ? await getBase64Qr(item)
          : [await getImage("/images/no_image.jpg")];
      const convertImage = {
        data: item.image
          ? await getImage(item.image)
          : await getImage("/images/no_image.jpg"),
        url: item.image,
      };
      return {
        ...item,
        Qr: convertQr,
        sku: item.Qr.map((qr: { sku: string }) => qr.sku),
        image: convertImage,
        createdAt: new Date(item.createdAt).toLocaleString(),
      };
    })
  );

  // Lấy ra từng phần tử trong mảng Qr và sku rải vào mảng ban đầu
  return await listExcel.reduce((prev: ListExport[], next) => {
    if (next.Qr.length) {
      const raw = next.Qr.map((item: string, index: number) => {
        return { ...next, Qr: item, sku: next.sku[index] };
      });
      return [...prev, ...raw];
    }
    return [...prev, { ...next, Qr: null, sku: null }];
  }, []);
};

/**
 * @name addImage
 * @description Add Image(dùng để tạo ra các Image ở trong file excel export )
 * @param listItems
 * @param ws
 * @param wb
 */
// Add Image
export const addImage = async (
  listItems: ListItem[],
  ws: ExcelJS.Worksheet,
  wb: ExcelJS.Workbook
) => {
  const listExportExcel = await convertData(listItems);
  listExportExcel.forEach(async (item, index) => {
    const imageImg = wb.addImage({
      base64: `data:image/png;base64,${item.image.data}`,
      extension: "png",
    });
    ws.addImage(imageImg, {
      // @ts-expect-error Issue with ExcelJs types.
      tl: { col: 0, row: index + 1 },
      // @ts-expect-error Issue with ExcelJs types.
      br: { col: 1, row: index + 2 },
      hyperlinks: {
        hyperlink: `${item.image.url}`,
        tooltip: `${item.image.url}`,
      },
    });

    const imageQr = wb.addImage({
      base64: `${item.Qr}`,
      extension: "png",
    });
    ws.addImage(imageQr, {
      // @ts-expect-error Issue with ExcelJs types.
      tl: { col: 8, row: index + 1 },
      // @ts-expect-error Issue with ExcelJs types.
      br: { col: 9, row: index + 2 },
    });

    ws.getRow(1).font = { bold: true };
    ws.getRow(index + 2).height = 80;

    ws.getRow(index + 2).values = [
      item.image ? null : "Not Image",
      item.itemName,
      item.externalId,
      item.price,
      item.order.shopName,
      item.address,
      item.quantity,
      item.content ? item.content : "",
      null,
      item.sku,
      item.createdAt,
    ];

    ws.columns.forEach((column) => {
      column.style = {};
    });

    const dto = ws.getRow(2).values as ExcelJS.CellValue[];
    const lengthValue = ws.getRow(1).values.length;

    for (let i = 1; i < Number(lengthValue); i++) {
      ws.getColumn(i).width =
        String(dto[i]).length < 10 ? 15 : String(dto[i]).length + 2;
    }
  });
};
