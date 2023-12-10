import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";

const StudentProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: studentInfo, isPending } = useQuery({
    queryKey: ["student-info"],
    initialData: {},
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/user/${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      {isPending ? (
        <h2>Loading....</h2>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold my-5">
            Welcome Back, {studentInfo?.name}
          </h1>
          <img src={studentInfo?.photo_url} alt={studentInfo?.name} />
          <p>{studentInfo?.email}</p>
          <p>Role: {studentInfo?.role}</p>
        </div>
      )}
    </>
  );
};

export default StudentProfile;
