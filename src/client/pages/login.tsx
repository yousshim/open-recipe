import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { userContext } from "../UserContext";

function login(email: string, password: string) {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
      console.log(data)
      const { email, handle, name } = data.data.login;
      return {
        email,
        handle,
        name,
      };
    });
}

interface LoginProps {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const { setUser } = useContext(userContext);
  return (
    <div className="bg-indigo-400 h-96 flex items-center justify-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={({ email, password }, { setSubmitting }) => {
          login(email, password).then(({ email, name, handle }) => {
            setUser({
              email,
              name,
              handle,
            });
          });
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(6, "Must be atleast 6 characters")
            .required("Required"),
        })}
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
