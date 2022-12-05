import type { NextApiRequest, NextApiResponse } from "next";
import { createLineItem, createOrder, createQr } from "../../../services/order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;

    const customer = data.customer;

    const item = data.line_items;

    const address = data.shipping_address;
    const orderName = data.name;

    const order = {
      shopName: data.order_status_url.slice(
        data.order_status_url.indexOf("//") + 2,
        data.order_status_url.indexOf(".myshopify.")
      ),
      customer: customer,
      orderName: orderName,
    };

    const resultOrder = await createOrder(order);

    Promise.all(
      item.map(async (item: ItemsShopify) => {
        const imageOption = item.properties[0].value;
        if (item.properties[1].value.search("Yes") >= 0) {
          const lineItem = {
            externalId: item.id,
            quantity: item.quantity,
            price: item.price,
            orderId: resultOrder.id,
            name: item.name,
            address: address.address1,
            image:
              String(imageOption).indexOf("https://cdn.") >= 0
                ? imageOption
                : null,
            content:
              String(imageOption).indexOf("https://cdn.") >= 0
                ? null
                : imageOption,
          };

          const promises = [];

          promises.push(
            createLineItem(lineItem).then((value: QrCreate) => {
              for (let i = 0; i < item.quantity; i++) {
                promises.push(createQr(value.id, String(customer.id), i));
              }
            })
          );

          Promise.all(promises)
            .then()
            .catch((err) => {
              console.log(err);
            });
        } else {
          const lineItem = {
            externalId: item.id,
            quantity: item.quantity,
            price: item.price,
            orderId: resultOrder.id,
            name: item.name,
            address: address.address1,
            image:
              String(imageOption).indexOf("https://cdn.") >= 0
                ? imageOption
                : null,
            content:
              String(imageOption).indexOf("https://cdn.") >= 0
                ? null
                : imageOption,
          };

          const resultLineItem = await createLineItem(lineItem);
        }
      })
    );

    res.status(200).send("Updated order successfully");
  } catch (error) {
    console.log(error);
    res.status(200).send("Updated order successfully");
  }
}
