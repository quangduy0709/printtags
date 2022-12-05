import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

import { jwtVerify } from "../../../../lib/jwt";

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const token = query.id;
  if (!token) {
    return res.status(404).json("token is not valid");
  }
  if (req.method === "GET") {
    verifyEmail(String(token), res);
  }
}

async function verifyEmail(token: string, res: NextApiResponse) {
  const secret = process.env.JWT_ACCESS_KEY!;

  try {
    const users = jwtVerify(token, secret) as VerifyEmail;

    if (users) {
      const updateUser = await prisma.user.update({
        where: {
          id: users.id,
        },
        data: {
          emailVerify: true,
        },
      });
    } else {
      res.status(404).json("token is not valid");
    }

    res.redirect("/login");
  } catch (err) {
    res.status(400).json(err);
  }
}
