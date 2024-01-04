import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";

const EnrollClass = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: enrolledClass } = useQuery({
    queryKey: ["enrolled-class", user?.email],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/enrollments?email=${user?.email}`
      );
      return res.data.result;
    },
  });

  return (
    <div>
      <h2 className="text-2xl my-10 font-semibold text-center">
        My Enrolled Courses
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-items-center">
        {enrolledClass?.map((item) => (
          <div key={item?._id}>
            <div className="h-[420px] shadow-xl p-5 rounded-lg space-y-2">
              <img
                className="w-[800px] h-[200px]"
                src={item.image}
                alt={item.title}
              />
              <h2 className="text-2xl font-semibold">{item.title}</h2>

              <p className="text-gray-800 text-sm font-medium">
                Instructor Name: {item.instructor_name}
              </p>

              <Link to={`/student/assignments/${item.classId}`}>
                <button className="btn bg-[#0766AD] w-full mt-4 text-white p-3 rounded-lg">
                  Continue Course
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollClass;
