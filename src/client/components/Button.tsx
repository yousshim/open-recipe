import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      tabIndex={0}
      className="px-4 py-2 bg-indigo-500 text-indigo-100 rounded-lg m-4 focus:ring-indigo-200 focus:ring-4 focus:ring-offset-2"
      {...rest}
    >
      {children}
    </button>
  );
}
