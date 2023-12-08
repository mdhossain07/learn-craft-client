import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Shared/Container";

import { StarRating } from "react-star-rating-input";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ClassInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["class-info"],
    initialData: {},
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/class/${id}`);
      return res.data;
    },
  });

  console.log(data);

  const handleCart = () => {
    const cartInfo = {
      title: data?.title,
      image: data?.image,
      price: data?.price,
      email: user?.email,
      classId: data?._id,
      instructor_name: data?.instructor_name,
    };
    axiosPublic.post("/api/v1/add-cart", cartInfo).then(() => {
      toast.success("course added to the cart");
      navigate("/all-classes");
    });
  };

  return (
    <Container>
      <h2 className="text-3xl font-semibold mt-10">{data.title}</h2>
      <div className="flex flex-col lg:flex-row gap-10 mt-5 lg:items-center">
        <img className="lg:w-[500px] h-[250px]" src={data.image} alt="" />
        <div className="space-y-2 text-lg">
          <p>Take all our online classes. Pay a flat fee</p>
          <p>Self-paced: never miss a class or deadline</p>
          <p>Get industry recognized Course Certificates</p>
          <p>Specialized in curriculam - thats why the industry trusts us</p>

          <button className="btn p-3 bg-blue-500 text-white rounded-lg">
            Start Learning Now
          </button>

          <button
            onClick={handleCart}
            className="btn p-3 bg-orange-500 text-white rounded-lg"
          >
            Add to mylist
          </button>
        </div>
      </div>

      <div className="flex mt-10 flex-col lg:flex-row gap-5 bg-black p-10 text-white">
        <div className="w-1/2 text-sm text-gray-400 space-y-2">
          <h2 className="text-xl font-sembold text-white">Course Info</h2>
          <div className="flex justify-between">
            <p>Rating: </p>
            <StarRating value={5} size={24} />
          </div>

          <p>Level: Beginner</p>
          <p>Duration: 1hr 30 mints</p>
          <p>Price: {data.price}</p>
        </div>

        <div className="w-1/2">
          <p className="text-xl font-sembold text-white">Description</p>
          <p className="text-sm text-gray-400">{data.description}</p>
        </div>
      </div>
    </Container>
  );
};

export default ClassInfo;
