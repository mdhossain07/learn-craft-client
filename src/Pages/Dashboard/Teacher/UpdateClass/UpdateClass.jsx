import toast from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";

const image_api_key = import.meta.env.VITE_Image_API_key;
const image_hosting_key = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const UpdateClass = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: classInfo } = useQuery({
    queryKey: ["classInfo"],
    initialData: {},
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/class/${id}`);
      return res.data;
    },
  });

  const [myImage, setMyImage] = useState("");

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

      const updatedClassInfo = {
        title: values.title,
        price: values.price,
        description: values.description,
        image: res.data.data.display_url,
      };

      axiosPublic.patch(`/api/v1/class/${id}`, updatedClassInfo).then((res) => {
        console.log(res.data);
        toast.success("Class information are updated.");
        navigate("/teacher/my-class");
      });
    },
  });
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-10">
        Update your Class Information
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
          placeholder={classInfo.title}
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
              placeholder={classInfo.price}
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
          placeholder={classInfo.description}
          value={formik.values.description}
        ></textarea>
        <br />

        <input
          type="file"
          className="w-full max-w-xs"
          name="image"
          required
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
          value="Update Class"
        />
      </form>
    </div>
  );
};

export default UpdateClass;
