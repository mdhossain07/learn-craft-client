import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import { useEffect } from "react";

const TeacherProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Learn Craft - Teacher Profile";
  }, []);

  const { data: teacherInfo } = useQuery({
    queryKey: ["teacher-profile", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/teacher/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold my-5">
        Welcome Back, {user?.displayName}
      </h1>
      <div className="space-y-3">
        <img
          className="w-24 h-24 rounded-full"
          src={teacherInfo?.image}
          alt=""
        />
        <p className="font-medium">Name: {teacherInfo?.name}</p>
        <p className="font-medium">Subject: {teacherInfo?.subejct}</p>
        <p className="font-medium">Experience: {teacherInfo?.experience}</p>
        <p className="lg:w-[500px] font-medium">
          Bio: {teacherInfo?.description}
        </p>
      </div>
    </div>
  );
};

export default TeacherProfile;
