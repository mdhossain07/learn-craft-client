import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Container from "../../Components/Shared/Container";

const Classes = () => {
  const axiosPublic = useAxiosPublic();

  const { data: approvedClass } = useQuery({
    queryKey: ["approved-class"],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/approved-classes?status=approved`
      );
      return res.data;
    },
  });

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-items-center">
        {approvedClass.map((item) => (
          <div key={item?._id}>
            <div className="shadow-xl p-5 rounded-lg space-y-2">
              <img
                className="w-[800px] h-[200px]"
                src={item.image}
                alt={item.title}
              />
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p>{item?.description.slice(0, 50)}....</p>
              <div className="flex gap-10">
                <p className="text-gray-800 text-sm font-medium">
                  Course Price: ${item.price}
                </p>
                <p className="text-gray-800 text-sm font-medium">
                  Total Enrollment: 0
                </p>
              </div>

              <p className="text-gray-800 text-sm font-medium">
                Instructor Name: {item.instructor_name}
              </p>

              <Link to={`/class-info/${item._id}`}>
                <button className="btn bg-green-500 p-3 rounded-lg">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Classes;
