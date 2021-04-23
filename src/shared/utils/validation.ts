import * as Yup from "yup";

const email = Yup.string().email("Invalid email address").required("Required");

const password = Yup.string()
  .min(6, "Must be atleast 6 characters")
  .required("Required");

const handle = Yup.string()
  .min(4, "Must be atleast 4 characters")
  .max(15, "Must be less than 6 characters");

const name = Yup.string()
  .min(4, "Must be atleast 4 characters")
  .max(15, "Must be less than 6 characters");

export const loginValidationSchema = Yup.object({
  email,
  password,
});

export const SignupValidationSchema = Yup.object({
  email,
  password,
  handle,
  name,
});
