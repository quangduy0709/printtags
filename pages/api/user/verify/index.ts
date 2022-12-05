// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { jwtVerify } from "../../../../lib/jwt";
type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const token = query.token;

  if (req.method === "GET") {
    verifyEmail(token, res);
  }
}

async function verifyEmail(token: any, res: NextApiResponse) {
  const secret = process.env.JWT_ACCESS_KEY!;

  try {
    const user = jwtVerify(token, secret) as VerifyEmail;

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}
