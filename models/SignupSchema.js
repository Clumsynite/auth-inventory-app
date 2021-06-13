import { object, string } from "yup";

const SignupSchema = object().shape({
  firstname: string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("Firstname is Required"),
  lastname: string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("Lastname is Required"),
  username: string()
    .min(6, "Too Short!")
    .max(18, "Too Long!")
    .required("Username is Required"),
  email: string().email("Invalid email").required("Email is Required"),
  password: string()
    .min(6, "Too Short!")
    .max(18, "Too Long!")
    .required("Password is Required"),
});

export default SignupSchema;

/*
// User model in api
  {
    username: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    photo: { type: String, required: false },
  }
*/
