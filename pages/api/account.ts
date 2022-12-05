import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function contact(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const idUser = req.query.idUser;
    if (idUser) {
      await getUser(res, String(idUser));
    }
  } else if (req.method === "PUT") {
    const body = req.body.user;

    await updateUser(body, res);
  } else {
    res.status(404).send("Not found");
  }

  async function getUser(res: NextApiResponse, idUser: string) {
    try {
      const getUser = await prisma.user.findFirst({
        where: {
          id: idUser,
          NOT: [
            {
              UserDetailId: null,
            },
          ],
        },
      });
      const getInfo = await prisma.userDetail.findFirst({
        where: {
          id: String(getUser?.UserDetailId),
        },
      });

      res.status(200).json(getInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async function updateUser(user: User, res: NextApiResponse) {
    try {
      const getUser = await prisma.user.findFirst({
        where: {
          id: user.idUser,
          NOT: [
            {
              UserDetailId: null,
            },
          ],
        },
      });

      const getInfo = await prisma.userDetail.update({
        where: {
          id: String(getUser?.UserDetailId),
        },
        data: {
          name: user.fullName,
          email: user.email,
          phone: user.phoneNumber,
          address: user.address,
          fbUrl: user.facebook,
        },
      });
      res.status(200).json(getInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
