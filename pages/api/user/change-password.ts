import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

import bcrypt from "bcrypt";

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  if (req.method === "POST") {
    changePassword(body, res);
  }
}

async function changePassword(body: user, res: NextApiResponse) {
  if (!(body.email && body.password)) {
    return res.status(400).json("email and password must not empty");
  }

  const salt = await bcrypt.genSalt(10);
  const email = body.email;
  const password = body.password;
  const hashed = await bcrypt.hash(password, salt);

  try {
    const users = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashed,
      },
    });

    if (!users) {
      return res.status(400).json("Email does not exists");
    }

    res.status(200).json("update password successfully!");
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
}
