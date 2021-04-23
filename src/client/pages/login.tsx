import React, { useContext } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { userContext } from "../UserContext";
import { loginValidationSchema } from "../../shared/utils/validation";

export default function LoginPage() {
  const { login } = useContext(userContext);
  return (
    <div className="bg-indigo-400 h-96 flex items-center justify-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={({ email, password }, { setSubmitting }) => {
          login({ email, password });
          setSubmitting(false);
        }}
        validationSchema={loginValidationSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
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
            <div className="flex justify-end space-x-3">
              <Link
                className="capitalize text-gray-200 px-3 py-2 border-2 border-gray-200 rounded-lg"
                to="/signup"
              >
                signup
              </Link>
              <button
                className="capitalize text-indigo-800 font-bold px-3 py-2 bg-indigo-200 rounded-lg"
                disabled={isSubmitting}
                type="submit"
              >
                login
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
