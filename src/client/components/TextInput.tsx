import React from "react";
import { useField } from "formik"

export function TextInput({ label, ...props }: any) {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col justify-between space-y-2">
        <label
          className="text-gray-200 capitalize text-lg"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <input
          className="bg-indigo-200 text-indigo-800 px-3 py-2 rounded-lg focus:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-transparent focus:ring-offset-2"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? <div className="text-red-600">{meta.error}</div> : null}
      </div>
    );
  }