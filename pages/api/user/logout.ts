import type { NextApiRequest, NextApiResponse } from "next";

import { serialize } from "cookie";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    logOut(res);
  }
}

async function logOut(res: NextApiResponse) {
  try {
    res.setHeader("Set-Cookie", [
      serialize("token", "", {
        expires: new Date(0),
        path: "/",
      }),
    ]);

    res.status(200).json("logout user");
  } catch (error) {
    res.status(400).json(error);
  }
}
