import React from "react";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as yup from "yup"
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput"

export function LoginPage() {
  return (
    <>
      <Helmet>
        <title>HELMET</title>
      </Helmet>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
        validationSchema={yup.object({
          email: yup.string().email().required(),
          password: yup.string().min(6),
        })}
      >
        {({ handleSubmit }) => (
          <form className="bg-indigo-400 p-10 flex flex-col space-y-5" onSubmit={handleSubmit}>
            <TextInput
              label="email"
              name="email"
              type="text"
              placeholder="example@email.com"
            />
            <TextInput
              label="password"
              name="password"
              type="password"
              placeholder="password"
            />
            <div className="flex justify-end">
              <Button>login</Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
