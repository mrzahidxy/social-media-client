import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import mainBanner from "../../assets/images/main-banner.jpg";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-center items-center">
        <img src={mainBanner} alt="" />
      </div>
      <div className="h-screen flex flex-col justify-center">
        <div>Logo</div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-gray-800">Login</span>
          <span className="text-sm text-gray-600">
            Welcome Back, Your friends are waiting for you!
          </span>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-1 w-80">
                <div className="space-x-2 grid grid-cols-4">
                  <label htmlFor="email" className="text-gray-800">
                    Email:
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="col-span-3 py-1 border rounded-sm outline-none pl-2 focus:border-blue-600"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="col-start-2 col-span-3 text-red-500"
                  />
                </div>
                <div className="space-x-2 grid grid-cols-4">
                  <label htmlFor="password" className="text-gray-800">
                    Password:
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="col-span-3 py-1 border rounded-sm outline-none pl-2 focus:border-blue-600"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="col-start-2 col-span-3 text-red-500"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-400 text-white px-8 py-1 rounded-sm"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
