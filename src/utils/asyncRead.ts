import { readFile } from "fs";

export function asyncRead(path: string): Promise<string> {
  return new Promise((res, rej) => {
    readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}
