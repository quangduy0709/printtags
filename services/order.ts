import prisma from "../lib/prisma";

export const createLineItem = async (data: LineItem) => {
  const res = await prisma.lineItem.create({
    data: {
      externalId: String(data.externalId),
      quantity: data.quantity,
      price: data.price,
      itemName: data.name,
      address: data.address,
      order: { connect: { id: data.orderId } },
      image: data.image,
      content: data.content,
    },
  });
  return res;
};

export const createQr = async (id: string, buyerId: string, index: number) => {
  const getId = await prisma.qr.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  let sku = `tag${index + 1}`;
  if (getId) {
    sku = `tag${Number(getId.id) + index + 1}`;
  }

  const res = await prisma.qr.create({
    data: {
      lineItems: { connect: { id: id } },
      buyerId: buyerId,
      sku: sku,
    },
  });
  return res;
};

export const createOrder = async (data: Order) => {
  const res = await prisma.order.create({
    data: {
      shopName: data.shopName,
      customer: data.customer,
      name: data.orderName,
    },
  });
  return res;
};
