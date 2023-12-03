import Container from "../../Components/Shared/Container";
import { useFormik } from "formik";
import register from "../../assets/images/Register.jpg";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      values.password
    )
  ) {
    errors.password = "Invalid password";
  }

  return errors;
};

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      photo: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      createUser(values.email, values.password)
        .then(() => {
          updateUserProfile(values.name, values.photo).then(() => {
            const userInfo = {
              name: values.name,
              email: values.email,
              photo_url: values.photo,
              role: values.role,
            };

            axiosPublic.post("/api/v1/create-user", userInfo).then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                toast.success("New user created");
                navigate("/");
              }
            });
          });
        })
        .catch((err) => {
          toast.error(err);
        });

      // console.log(userInfo);
    },
  });

  return (
    <div>
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-16">
          <div>
            <img className="w-full" src={register} alt="" />
          </div>

          <div className="w-full mt-10 max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
              action="#"
            >
              <h5 className="text-2xl text-center font-medium text-gray-900 dark:text-white">
                Sign up to LEARN CRAFT
              </h5>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="enter your name"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select Your Role
                </label>
                <select
                  name="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  defaultValue="default"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                >
                  <option value={"teacher"}>Teacher</option>
                  <option value={"student"}>Student</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="enter photo URL"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.photo}
                />
              </div>

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
                <p className=" text-sm font-medium text-white">
                  Already have an account?
                  <Link to="/login">
                    <span className="text-blue-500 text-sm font-semibold">
                      {" "}
                      Login Now
                    </span>
                  </Link>
                </p>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
