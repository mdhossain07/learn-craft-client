import { useFormik } from "formik";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Container from "../../Components/Shared/Container";

const Teach = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      experience: "",
      category: "",
      description: "",
      image: "",
      title: "",
    },
    onSubmit: (values, { resetForm }) => {
      const teacherInfo = {
        name: values.name,
        experience: values.experience,
        description: values.description,
        subejct: values.category,
        email: user?.email,
        image: user?.photoURL,
        title: values.title,
      };

      axiosPublic.post("/api/v1/add-teacher", teacherInfo).then((res) => {
        if (res.data.insertedId) {
          toast.success("Teacher Request submitted for review");
          resetForm();
          navigate("/");
        }
      });
    },
  });
  return (
    <Container>
      <form
        className="bg-[#F3F3F3] font-medium text-[#444444] mt-10 p-10 lg:w-1/2 mx-auto  space-y-3"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="">Name *</label>
        <br />
        <input
          type="text"
          required
          className="indent-2 w-full py-2 my-2"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="">Title *</label>
        <br />
        <input
          type="text"
          required
          className="indent-2 w-full py-2 my-2"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />

        <div className="flex justify-between gap-10">
          <div className="flex-1">
            <label htmlFor="">Experience*</label>
            <br />
            <select
              name="experience"
              onChange={formik.handleChange}
              value={formik.values.experience}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="">Category*</label>
            <br />
            <select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Web Development">Web Development</option>
              <option value="Photography">Photography</option>
            </select>
          </div>
        </div>
        <br />
        <label htmlFor="">Short Description of your teaching experience</label>
        <br />
        <textarea
          className="my-2 w-full indent-2 p-3"
          name="description"
          cols="50"
          rows="5"
          onChange={formik.handleChange}
          value={formik.values.description}
        ></textarea>
        <br />

        <br />
        <hr />
        <h2 className="text-blue-500 font-semibold"> Instructor Image</h2>

        <div className="flex justify-between gap-10">
          <img src={user?.photoURL} className="w-20 h-20 rounded-full" alt="" />
        </div>

        <input
          className="cursor-pointer bg-blue-500 text-white p-3 rounded-lg"
          type="submit"
          value="Submit for Review"
        />
      </form>
    </Container>
  );
};

export default Teach;
