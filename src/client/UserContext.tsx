import React, { createContext, useState } from "react";

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.globEager('./pages/*.jsx')
export type User = {
  email: string;
  name: string;
  handle: string;
};

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps {
  email: string;
  password: string;
  handle: string;
  name: string;
}

type UserContext = {
  user: User | null;
  login: (a: LoginProps) => void;
  signup: (a: SignupProps) => void;
  logout: () => void;
};

const loginQuery = `
mutation($email: String!, $password: String!) {
  login(loginInput:{
    email: $email,
    password: $password,
  }) {
    ... on User {
      email
			handle
    	name
    }
    ... on Error {
      message
      path
    }
  }
}
  `;

const signupQuery = `
mutation($email: String!, $password: String!, $name: String!, $handle: String!) {
  createAccount(userInput:{
    email: $email,
    password: $password,
    handle: $handle,
    name: $name,
  }) {
    ... on User {
      email
			handle
    	name
    }
    ... on Error {
      message
      path
    }
  }
}
  `;

const logoutQuery = `
  mutation {
    logout({
      ... on User {
        email
        handle
        name
      }
      ... on Error {
        message
        path
      }
    }
  }
    `;

function gqlQuery({ query, variables }) {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
}

export const userContext = createContext<UserContext>({
  user: null,
  login: (_) => ({ email: "", handle: "", name: "" }),
  signup: (_) => ({ email: "", handle: "", name: "" }),
  logout: () => {},
});

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  function login({ email, password }: LoginProps) {
    return gqlQuery({ query: loginQuery, variables: { email, password } })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const { email, handle, name } = data.data.login;
        setUser({ email, handle, name });
      });
  }

  function signup({ email, password, handle, name }: SignupProps) {
    return gqlQuery({
      query: signupQuery,
      variables: {
        email,
        password,
        handle,
        name,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const { email, name, handle } = data.data.createAccount;
        setUser({ email, handle, name });
      });
  }

  function logout() {
    gqlQuery({ query: logoutQuery, variables: {} });
    setUser(null);
  }

  return (
    <userContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </userContext.Provider>
  );
}
