import { Router, static as Static } from "express";
import { createServer as createViteServer } from "vite";
import { ssr } from "./ssr";
import { DEV, STATIC_ASSETS_PATH } from "../../constants";

export async function buildStaticMiddleware() {
  const router = Router();
  if (DEV) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
    });
    router.use(vite.middlewares);
    router.use(ssr(vite));
  } else {
    router.use(
      Static(STATIC_ASSETS_PATH, {
        index: false,
      })
    );
    router.use(ssr());
  }
  return router;
}
