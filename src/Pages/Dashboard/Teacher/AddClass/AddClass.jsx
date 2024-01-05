import { useFormik } from "formik";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const image_api_key = import.meta.env.VITE_Image_API_key;
const image_hosting_key = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const AddClass = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Learn Craft - Add Class";
  }, []);

  const [myImage, setMyImage] = useState("");
  const [status, setStatus] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
    },
    onSubmit: async (values) => {
      const imageFile = { image: myImage[0] };
      const res = await axiosPublic.post(image_hosting_key, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const classInfo = {
        title: values.title,
        price: values.price,
        description: values.description,
        image: res.data.data.display_url,
        instructor_name: user?.displayName,
        instructor_email: user?.email,
        status: "pending",
      };

      axiosPublic.post("/api/v1/add-class", classInfo).then((res) => {
        if (res.data.insertedId) {
          toast.success("Class Added Successfully!");
          navigate("/teacher/my-class");
        }
      });
    },
  });

  useEffect(() => {
    axiosPublic.get(`/api/v1/approved-user/${user?.email}`).then((res) => {
      setStatus(res.data.status);
    });
  }, [axiosPublic, user?.email]);

  return (
    <div>
      {status === "approved" ? (
        <div>
          <h2 className="text-2xl font-semibold text-center mt-14">
            Please add your Class Information
          </h2>
          <form
            className="bg-[#F3F3F3] font-medium text-[#444444] mt-10 p-10 lg:w-1/2 mx-auto space-y-3"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="">Course Title *</label>
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
                <label htmlFor="">Course Price *</label>
                <br />
                <input
                  type="text"
                  required
                  className="indent-2 w-full py-2 my-2"
                  name="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
              </div>
            </div>
            <label htmlFor="">Course Description *</label>
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

            <input
              type="file"
              className="w-full max-w-xs"
              name="image"
              // required
              onBlur={(e) => {
                setMyImage(e.currentTarget.files);
              }}
            />
            <br />
            <hr />
            <h2 className="text-blue-500 font-semibold"> Instructor Info</h2>

            <div className="flex justify-between gap-10">
              <div className="flex-1">
                <label htmlFor="">Instructor Name</label>
                <input
                  className="w-full py-2 my-2"
                  defaultValue={user?.displayName}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label htmlFor="">Instructor Email</label>
                <br />
                <input
                  className="py-2 my-2 w-full"
                  defaultValue={user?.email}
                  disabled
                />
              </div>
            </div>

            <input
              className="cursor-pointer bg-blue-500 text-white p-3 rounded-lg"
              type="submit"
              value="Add Class"
            />
          </form>
        </div>
      ) : (
        <div>
          {status === "pending" ? (
            <h2 className="text-2xl font-semibold text-center mt-10">
              Your Request is under review
            </h2>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-center mt-10">
                Please Apply For Teacher Role to Add Classes{" "}
              </h2>
              <Link className="flex justify-center mt-10" to="/teach">
                <button className="p-3 font-medium bg-blue-600 rounded-lg text-white">
                  Apply Now
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddClass;
