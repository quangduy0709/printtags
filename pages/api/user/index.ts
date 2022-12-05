// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  const page = req.query.page;
  if (req.method === "GET") {
    getData(res, Number(page || 1));
  }
  if (req.method === "PUT") {
    updateAdmin(req, res);
  }
}

async function getData(res: NextApiResponse, page: number) {
  try {
    const result = await prisma.user.findMany({
      skip: (Number(page || 1) - 1) * 6,
      take: 6,
    });
    const total = await prisma.user.count();

    res.status(200).json({ items: result, total });
  } catch (err) {
    res.status(400).json(err);
  }
}
async function updateAdmin(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const data = req.body.user;

    const result = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        admin: !data.role,
      },
    });
    res.status(200).json("update role");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
