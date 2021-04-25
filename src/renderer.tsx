import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { StaticRouter } from "react-router-dom"
import { App } from "./App";

export function render(url: string, _context: any) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  const head = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    `;
  return { html, head };
}
