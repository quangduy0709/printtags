import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const page = req.query.page;
  const dateRange = req.query;
  if (req.method !== "GET") {
    return;
  }
  const dateRun: {
    createdAt: {
      gte?: string;
      lte?: string;
    };
  } = {
    createdAt: {},
  };

  if (dateRange.startDate) {
    dateRun.createdAt.gte = String(dateRange.startDate);
  }
  if (dateRange.endDate) {
    dateRun.createdAt.lte = String(dateRange.endDate);
  }
  getDataRange(res, Number(page), dateRun);
}

async function getDataRange(
  res: NextApiResponse,
  page: number,
  dateRun: {
    createdAt: {
      gte?: string;
      lte?: string;
    };
  }
) {
  try {
    const result = await prisma.lineItem.findMany({
      where: dateRun,
      skip: (Number(page) - 1) * 6,
      take: 6,
      include: {
        order: {
          select: { shopName: true, name: true, customer: true },
        },
        Qr: {
          select: {
            code: true,
            sku: true,
          },
        },
      },
    });

    const total = await prisma.lineItem.count({
      where: dateRun,
    });

    res.status(200).json({ items: result, total });
  } catch (err) {
    res.status(400).json(err);
  }
}
