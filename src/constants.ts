import { join } from "path";
import dotenv from "dotenv";
dotenv.config();

export const INDEX_HTML_PATH = join(__dirname, "index.html");
export const SERVER_ENTRY_PATH = join(__dirname, "renderer");
export const STATIC_ASSETS_PATH = join(__dirname);
export const SSR_CONTENT_PLACEHOLDER = "<!--SSR-CONTENT -->";
export const SSR_HEAD_PLACEHOLDER = "<!--SSR-HEAD -->";
export const PORT = 4000;
export const DEV = process.env["NODE_ENV"] !== "production";

console.log(process.env["NODE_ENV"]);
