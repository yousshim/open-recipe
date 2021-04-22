import React, { useContext, useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { userContext } from "../UserContext";

function logout() {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: `{"query":"mutation {login(loginInput:{ email: "${email}", password: "${password}",}) {email handle name}}"}'`,
    body: JSON.stringify({
      query: `
      mutation {
        logout({}
      }
        `,
    }),
  })
}

export function Nav() {
  const [showOverlay, setShowOverlay] = useState(false);
  const { user, setUser } = useContext(userContext);
  return (
    <nav className="bg-indigo-400 h-16 text-gray-200 flex justify-between px-5">
      <h1 className="text-2xl font-bold my-auto uppercase tracking-widest">
        <Link to="/">Open Food</Link>
      </h1>
      <button
        onClick={() => setShowOverlay(true)}
        className="px-2 py-1 border-2 border-gray-200 rounded-lg my-auto focus:outline-none focus:border-white"
      >
        <MenuIcon className="w-6 h-6" />
      </button>
      <div
        className={`${
          showOverlay ? "" : "hidden"
        } absolute inset-0 bg-indigo-400 flex flex-col items-center`}
      >
        <button
          onClick={() => setShowOverlay(false)}
          className="px-2 py-1 ml-auto mr-5 mt-5 focus:outline-none focus:border-white"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h1 className="uppercase tracking-widest font-bold text-5xl my-16">
          <Link to="/" onClick={() => setShowOverlay(false)}>
            open food
          </Link>
        </h1>
        {!user ? (
          <ul className="flex flex-col justify-center items-center text-gray-200 text-3xl">
            <li className="mx-auto mt-5 pb-5 border-b-2">
              <Link
                onClick={() => setShowOverlay(false)}
                to="/login"
                className="uppercase"
              >
                login
              </Link>
            </li>
            <li className="mx-auto mt-5 pb-5 border-b-2">
              <Link
                onClick={() => setShowOverlay(false)}
                to="/signup"
                className="uppercase"
              >
                signup
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col justify-center items-center text-gray-200 text-3xl">
            <li className="mx-auto mt-5 pb-5 border-b-2">
              <h1 className="uppercase">{user.name}</h1>
            </li>
            <li className="mx-auto mt-5 pb-5 border-b-2">
              <button
                onClick={() => {
                  logout();
                  setUser(null);
                  setShowOverlay(false);
                }}
                className="uppercase"
              >
                logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
