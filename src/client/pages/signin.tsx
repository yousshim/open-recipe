import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../components/TextInput";
import { userContext } from "../UserContext";

export default function SignupPage() {
  const { signup } = useContext(userContext);
  return (
    <div className="bg-indigo-400 h-96 flex items-center justify-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
          handle: "",
          name: "",
        }}
        onSubmit={({ email, password, handle, name }, { setSubmitting }) => {
          signup({ email, password, handle, name });
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(6, "Must be atleast 6 characters")
            .required("Required"),
          handle: Yup.string()
            .min(4, "Must be atleast 4 characters")
            .max(15, "Must be less than 6 characters"),
          name: Yup.string()
            .min(6, "Must be atleast 4 characters")
            .max(15, "Must be less than 6 characters"),
        })}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="example@email.com"
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              placeholder="password"
            />
            <TextInput
              label="Handle"
              type="text"
              name="handle"
              placeholder="handle"
            />
            <TextInput
              label="Name"
              type="text"
              name="name"
              placeholder="John Doe"
            />
            <div className="flex justify-end space-x-3">
              <Link
                className="capitalize text-gray-200 px-3 py-2 border-2 border-gray-200 rounded-lg"
                to="/login"
              >
                login
              </Link>
              <button
                disabled={isSubmitting}
                className="capitalize text-indigo-800 font-bold px-3 py-2 bg-indigo-200 rounded-lg"
              >
                singin
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
