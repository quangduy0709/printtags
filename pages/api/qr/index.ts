import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function GetQr(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page;

  await main(res, Number(page || 1));
}

async function main(res: NextApiResponse, page: number) {
  try {
    const getListQr = await prisma.qr.findMany({
      skip: (Number(page || 1) - 1) * 6,
      take: 6,
    });

    const total = await prisma.qr.count();

    res.status(200).json({ qrs: getListQr, total });
  } catch (error) {
    res.status(500).json(error);
  }
}
