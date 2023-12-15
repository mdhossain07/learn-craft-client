import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Shared/Container";
import ReactStars from "react-rating-stars-component";
import useAuth from "../../hooks/useAuth";

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
      navigate("/payment");
    });
  };

  return (
    <Container>
      <h2 className="text-3xl font-semibold mt-10">{data.title}</h2>
      <div className="flex flex-col lg:flex-row gap-10 mt-5 lg:items-center">
        <img className="lg:w-[500px] h-[250px]" src={data.image} alt="" />
        <div className="space-y-4 font-medium">
          <p>1. Take all our online classes. Pay a flat fee</p>
          <p>2. Self-paced: never miss a class or deadline</p>
          <p>3. Get industry recognized Course Certificates</p>
          <p>4. Specialized in curriculam - thats why the industry trusts us</p>

          <button
            onClick={handleCart}
            className="btn p-3 bg-blue-500 text-white rounded-lg"
          >
            Start Learning Now
          </button>
        </div>
      </div>

      <div className="flex mt-10 flex-col lg:flex-row gap-5 bg-gray-700 rounded-md p-10 text-white">
        <div className="w-1/2 text-sm text-gray-400 space-y-2">
          <h2 className="text-xl font-sembold text-white">Course Info</h2>
          <div className="flex gap-10">
            <p>Rating: </p>
            <ReactStars value={5} size={20} edit={false} />
          </div>

          <p>
            Level: <span className="text-white ml-12"> Beginner</span>
          </p>
          <p>
            Duration: <span className="text-white ml-5"> 1hr 20 mints</span>
          </p>
          <p>
            Price: <span className="text-white ml-12"> ${data?.price}</span>
          </p>
        </div>

        <div className="w-1/2 space-y-5">
          <p className="text-xl font-sembold text-white">Description</p>
          <p className="text-sm text-gray-300">{data.description}</p>
        </div>
      </div>
    </Container>
  );
};

export default ClassInfo;
