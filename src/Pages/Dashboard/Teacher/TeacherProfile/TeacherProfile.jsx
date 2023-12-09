import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
const TeacherProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: teacherInfo } = useQuery({
    queryKey: ["teacher-profile", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/teacher/${user?.email}`);
      return res.data;
    },
  });

  console.log(teacherInfo);
  return (
    <div>
      <h2>Teacher Profile</h2>
      <img src={teacherInfo?.image} alt="" />
      <p>{teacherInfo?.description}</p>
      <p>{teacherInfo?.name}</p>
      <p>{teacherInfo?.subejct}</p>
      <p>{teacherInfo?.experience}</p>
    </div>
  );
};

export default TeacherProfile;
