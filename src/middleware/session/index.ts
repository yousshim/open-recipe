import Session from "express-session";
import { DEV } from "../../constants";

export async function buildSessionMiddleware() {
  return Session({
    name: "qid",
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: !DEV },
  });
}
