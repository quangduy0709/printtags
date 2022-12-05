import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

import bcrypt from "bcrypt";
import { verifyEmail } from "../../../services/email";
import { htmlStringForgetPass } from "../../../templates/emailVerify";

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  if (req.method === "POST") {
    resetPass(body, res);
  }
}

async function resetPass(body: user, res: NextApiResponse) {
  const salt = await bcrypt.genSalt(10);
  const email = body.email;
  const password = process.env.PASSWORD_RESET!;
  const hashed = await bcrypt.hash(password, salt);
  const content = "";

  try {
    if (!body) {
      return res.status(400).json("not eixts");
    }
    const users = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        password: hashed,
      },
    });

    if (!users) {
      return res.status(400).json("Email exists");
    }

    await verifyEmail(email, content, htmlStringForgetPass);

    res.status(200).json("update password successfully!");
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
}
