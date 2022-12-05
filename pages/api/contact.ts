import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function contact(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const codeQr = req.query._idQr;
    if (codeQr) {
      await getProcess(res, codeQr);
    }
  } else if (req.method === "POST") {
    const body = req.body.user;

    await postProcess(body, res);
  } else {
    res.status(404).send("Not found");
  }

  async function postProcess(body: User, res: NextApiResponse) {
    try {
      const create = await prisma.userDetail.create({
        data: {
          name: body.fullName,
          email: body.email,
          phone: body.phoneNumber,
          address: body.address,
          fbUrl: body.facebook,
          user: {
            connect: {
              id: body.id,
            },
          },
        },
      });
      await prisma.qr.update({
        where: {
          code: body.query,
        },
        data: {
          ownerId: create.id,
        },
      });

      res.status(200).json(create);
    } catch (error) {
      console.log(error);

      res.status(403).json(error);
    }
  }

  async function getProcess(res: NextApiResponse, codeQr: any) {
    try {
      const getQr = await prisma.qr.findFirst({
        where: {
          code: codeQr,
          NOT: [
            {
              ownerId: null,
            },
          ],
        },
      });

      const getInfo = await prisma.userDetail.findFirst({
        where: {
          id: String(getQr?.ownerId),
        },
      });

      res.status(200).json(getInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
