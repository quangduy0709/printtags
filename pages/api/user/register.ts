import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyEmail } from "../../../services/email";
import { htmlString } from "../../../templates/emailVerify";

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  if (req.method === "POST") {
    createUser(body, res);
  }
}

async function createUser(body: user, res: NextApiResponse) {
  const secret = process.env.JWT_ACCESS_KEY!;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  const salt = await bcrypt.genSalt(10);
  const email = body.email;
  try {
    if (!body) {
      return res.status(400).json("not eixts");
    }

    const users = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (users) {
      return res.status(400).json("Email already exists");
    }

    const hashed = await bcrypt.hash(body.password, salt);

    const result = await prisma.user.create({
      data: {
        email: body.email,
        password: hashed,
        emailVerify: true,
      },
    });

    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
      },
      secret,
      { expiresIn: expiresIn }
    );

    // const content = `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/verification/${token}`;
    // await verifyEmail(email, content, htmlString);

    res.status(200).json("register successfully!");
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
}
