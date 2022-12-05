import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    logIn(req, res);
  }
}

async function logIn(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    const secret = process.env.JWT_ACCESS_KEY!;

    const email = data.email;
    const password = data.password;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json("Incorrect email");
    }

    const validPassword = await bcrypt.compare(
      password,
      String(user?.password)
    );

    if (!validPassword) {
      return res.status(400).json("Incorrect password");
    }
    if (!user.emailVerify) {
      return res.status(400).json("Email not verify");
    }

    if (user && validPassword && user.emailVerify) {
      const token = jwt.sign(
        { id: user.id, email: user.email, admin: user.admin },
        secret
      );
      res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));

      res.status(200).json({ id: user.id, email: user.email });
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
