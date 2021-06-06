import { object, string } from "yup";

const LoginSchema = object().shape({
  username: string()
    .min(6, "Too Short!")
    .max(18, "Too Long!")
    .required("Username is Required"),
  password: string()
    .min(6, "Too Short!")
    .max(18, "Too Long!")
    .required("Password is Required"),
});

export default LoginSchema;
