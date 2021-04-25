import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

export function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="p-4 bg-indigo-400 flex justify-between">
      <h1 className="text-2xl text-indigo-100 font-bold uppercase">
        <Link to="/">open food</Link>
      </h1>
      <button
        onClick={() => setShowMenu(true)}
        className="w-8 h-8 text-indigo-200 focus:outline-none border-2 rounded-lg p-1"
      >
        <MenuIcon />
      </button>
      {showMenu && (
        <div className="absolute inset-0 bg-indigo-400 flex flex-col">
          <div className="text-indigo-200 flex justify-end p-4">
            <button onClick={() => setShowMenu(false)} className="w-8 h-8">
              <XIcon />
            </button>
          </div>
          <h1 className="text-6xl text-indigo-100 font-bold uppercase mx-auto mt-10">
            <Link onClick={() => setShowMenu(false)} to="/">open food</Link>
          </h1>
          <div className="flex justify-center items-center my-auto">
            <ul className="flex flex-col space-y-8">
              <li className="text-indigo-200 uppercase text-5xl border-b-2 text-center">
                <Link onClick={() => setShowMenu(false)} to="/login">
                  login
                </Link>
              </li>
              <li className="text-indigo-200 uppercase text-5xl border-b-2 text-center">
                <Link onClick={() => setShowMenu(false)} to="/signup">
                  signup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
