import { PuffLoader } from "react-spinners";
import ClassCard from "../../../../Components/Shared/ClassCard/ClassCard";
import useClass from "../../../../hooks/useClass";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import { useEffect } from "react";

const TeacherClass = () => {
  const [, isLoading] = useClass();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Learn Craft - Teacher Class";
  }, []);

  const { data: classes } = useQuery({
    queryKey: ["teacher-class", user?.email],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/teacher-class?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <>
      {isLoading ? (
        <PuffLoader color="#36d7b7" />
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center mt-10">
            Your Added Classes
          </h2>
          {classes.length === 0 ? (
            <h2>No classes yet</h2>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center mt-10">
              {classes?.map((item) => (
                <ClassCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TeacherClass;
