import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Authentication token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, `${process.env.SESSION_SECRET}`);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error("Invalid token");
  }
}
