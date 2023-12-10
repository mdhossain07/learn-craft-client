import { useFormik } from "formik";
import Container from "../../Components/Shared/Container";
import login from "../../assets/images/Register.jpg";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn } = useAuth();
  const naviagte = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      signIn(values.email, values.password)
        .then(() => {
          toast.success("User Logged In");
          naviagte("/");
        })
        .catch((err) => {
          toast.error(err);
        });
    },
  });
  return (
    <div>
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-16">
          <div className="">
            <img className="w-full " src={login} alt="" />
          </div>

          <div className="w-full mt-10 max-w-lg p-4 bg-white border border-gray-200  rounded-lg shadow sm:p-6 md:p-8">
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
              action="#"
            >
              <h5 className="text-2xl text-center font-medium text-gray-900 dark:text-white">
                Login to LEARN CRAFT
              </h5>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="enter your email"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="text-center mt-3">
                <p className=" text-sm font-medium text-black">
                  New to this website?
                  <Link to="/register">
                    <span className="text-blue-500 text-sm font-semibold">
                      {" "}
                      Register Now
                    </span>
                  </Link>
                </p>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
