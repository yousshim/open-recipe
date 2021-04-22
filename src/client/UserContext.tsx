import React, { createContext } from "react";

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.globEager('./pages/*.jsx')
export type User = {
  email: string;
  name: string;
  handle: string;
};
type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
export const userContext = createContext<UserContext>({
  user: null,
  setUser: () => { },
});
