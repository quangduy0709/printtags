import jwt from "jsonwebtoken";

export const jwtVerify = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
