import { Request, Response } from "express";

declare module "express-session" {
  interface Session {
    user?: number;
  }
}

export type Context = {
  req: Request;
  res: Response;
};
