import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../UserContext";

function bind(setter: Function): React.ChangeEventHandler<HTMLInputElement> {
  return (e) => setter(e.target.value);
}

function login(email: string, password: string) {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: `{"query":"mutation {login(loginInput:{ email: "${email}", password: "${password}",}) {email handle name}}"}'`,
    body: JSON.stringify({
      query: `
      mutation($email: String!, $password: String!) {
        login(loginInput:{
          email: $email,
          password: $password,
        }) {
          email
          handle
          name
        }
      }
        `,
      variables: {
        email,
        password,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const { email, handle, name } = data.data.login;
      return {
        email,
        handle,
        name,
      }
    });
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext)
  return (
    <div className="bg-indigo-400 h-96 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password)
          .then(data => {
            setUser({
              email: data.email,
              name: data.name,
              handle: data.handle,
            })
          })
        }}
        className="flex flex-col space-y-5"
      >
        <div className="flex flex-col justify-between space-y-2">
          <label className="text-gray-200 capitalize text-lg" htmlFor="email">
            email
          </label>
          <input
            value={email}
            onChange={bind(setEmail)}
            className="bg-indigo-200 text-indigo-800 px-3 py-2 rounded-lg focus:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-transparent focus:ring-offset-2"
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div className="flex flex-col justify-between space-y-2">
          <label
            className="text-gray-200 capitalize text-lg"
            htmlFor="password"
          >
            password
          </label>
          <input
            value={password}
            onChange={bind(setPassword)}
            className="bg-indigo-200 text-indigo-800 px-3 py-2 rounded-lg focus:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-transparent focus:ring-offset-2"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Link
            className="capitalize text-gray-200 px-3 py-2 border-2 border-gray-200 rounded-lg"
            to="/signin"
          >
            signin
          </Link>
          <button className="capitalize text-indigo-800 font-bold px-3 py-2 bg-indigo-200 rounded-lg">
            login
          </button>
        </div>
      </form>
    </div>
  );
}
