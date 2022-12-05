import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function GetQr(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page;
  const idUser = req.query.idUser;

  await getMyQr(res, Number(page || 1), String(idUser));
}

async function getMyQr(res: NextApiResponse, page: number, idUser: string) {
  try {
    if (!idUser) {
      throw new Error("Not found idUser");
    }
    const getUser = await prisma.user.findFirst({
      where: {
        id: idUser,
      },
    });
    if (!getUser) {
      throw new Error("Not found User");
    }
    if (!getUser.UserDetailId) {
      throw new Error("Not found UserDetail");
    }
    const rqByUser = await prisma.qr.findMany({
      where: {
        ownerId: getUser?.UserDetailId,
      },
      skip: (Number(page || 1) - 1) * 6,
      take: 6,
    });

    const total = await prisma.qr.count({
      where: {
        ownerId: getUser?.UserDetailId,
      },
    });

    res.status(200).json({ qrs: rqByUser, total });
  } catch (error) {
    res.status(500).json(error);
  }
}
