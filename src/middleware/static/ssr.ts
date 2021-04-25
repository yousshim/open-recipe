import Express from "express";
import { ViteDevServer } from "vite";
import { asyncRead } from "../../utils/asyncRead";
import {
  INDEX_HTML_PATH,
  SERVER_ENTRY_PATH,
  SSR_CONTENT_PLACEHOLDER,
  SSR_HEAD_PLACEHOLDER,
} from "../../constants";

export function ssr(vite?: ViteDevServer) {
  const router = Express.Router();

  const transformIndexHtml = vite
    ? vite.transformIndexHtml
    : (a: string, b: string) => b;

  const loader = vite ? vite.ssrLoadModule : require;

  router.get("*", async (req, res) => {
    const url = req.originalUrl;
    const indexHtml = await asyncRead(INDEX_HTML_PATH);
    const transformedHtml = await transformIndexHtml(url, indexHtml);
    const { render } = await loader(SERVER_ENTRY_PATH);
    const { html, head } = render(url);
    const page = transformedHtml
      .replace(SSR_CONTENT_PLACEHOLDER, html)
      .replace(SSR_HEAD_PLACEHOLDER, head);
    res.status(200).set({ "Content-Type": "text/html" }).end(page);
  });
  return router;
}
