import Express from "express";
import { PORT } from "./constants";
import { createDbConnecton } from "./database/createConnecton";
import { buildGraphQlMiddleware } from "./middleware/graphql";
import { buildSessionMiddleware } from "./middleware/session";
import { buildStaticMiddleware } from "./middleware/static";

async function main() {
  await createDbConnecton();
  const app = Express();
  app.use(await buildSessionMiddleware());
  app.use(await buildGraphQlMiddleware());
  app.use(await buildStaticMiddleware());
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

main();
