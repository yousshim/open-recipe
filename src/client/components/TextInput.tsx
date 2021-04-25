import React from "react"
import { useField } from "formik"

export function TextInput({ label, ...props }: any) {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-indigo-200 uppercase font-bold" htmlFor={props.id || props.name}>{label}</label>
        <input className="px-4 py-2 text-lg text-indigo-800 bg-indigo-300 rounded-lg focus:outline-none focus:ring-indigo-200 focus:ring-4 focus:ring-offset-2 focus:bg-indigo-200" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-600 text-md">{meta.error}</div>
        ) : null}
      </div>
    );
  }