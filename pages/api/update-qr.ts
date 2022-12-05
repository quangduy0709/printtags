import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

interface UpdateQr {
  codeQr: string;
  ownId: string;
}

export default async function contact(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body.qr;

  await postProcess(body, res);
}

async function postProcess(body: UpdateQr, res: NextApiResponse) {
  if (!body.ownId && !body.codeQr) {
    throw new Error("Not found ownId and codeQr");
  } else {
    try {
      const updataQr = await prisma.qr.update({
        where: {
          code: body.codeQr,
        },
        data: {
          ownerId: body.ownId,
        },
      });
      res.status(200).json(updataQr);
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  }
}
