import { readFileSync } from "fs";
import { join } from "path";
import "reflect-metadata";
import Express, { Request, Response } from "express";
import Session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { createServer as createViteServer, ViteDevServer } from "vite";
import { User } from "./entity/user";
import { UserResolver } from "./resolver/userResolver";

declare module "express-session" {
  interface Session {
    user?: string;
  }
}

declare global {
  interface Context {
    req: Request;
    res: Response;
  }
}

dotenv.config();

const PORT = process.env["PORT"] ?? 4000;
const __DEV__ = process.env["env"] === "dev";

async function main() {
  await createConnection({
    type: "postgres",
    host: process.env["BD_HOST"] ?? "localhost",
    port: parseInt(process.env["DB_PORT"] ?? "5432"),
    username: process.env["DB_USERNAME"] ?? "postgres",
    password: process.env["DB_PASSWORD"] ?? "passwd",
    database: process.env["DB_NAME"] ?? "open-recipe",
    entities: [User],
    synchronize: __DEV__,
    logging: __DEV__,
    dropSchema: __DEV__,
  });

  const app = Express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    context: (req: Request, res: Response) => ({ req, res }),
  });

  app.use(
    Session({
      name: "qid",
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
  app.use(server.getMiddleware());

  let vite: ViteDevServer;
  if (__DEV__) {
    vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
    });

    app.use(vite.middlewares);
  } else {
    app.use(Express.static(join(__dirname, "..", "client")));
  }

  app.get("*", async (req, res) => {
    const url = req.originalUrl;

    let template: string;
    let render: any;
    if (__DEV__) {
      template = await vite.transformIndexHtml(
        url,
        readFileSync(join(__dirname, "..", "client", "index.html"), "utf-8")
      );

      ({ render } = await vite.ssrLoadModule(
        join(__dirname, "..", "client", "entry-server.tsx")
      ));
    } else {
      template = readFileSync(
        join(__dirname, "..", "client", "index.html"),
        "utf-8"
      );
      ({ render } = require("../client/entry-server"));
    }

    const html = template.replace("<!--SSR-CONTENT-->", render(url));

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
}

main();
