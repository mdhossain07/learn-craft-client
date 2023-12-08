import { PuffLoader } from "react-spinners";
import ClassCard from "../../../../Components/Shared/ClassCard/ClassCard";
import useClass from "../../../../hooks/useClass";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";

const TeacherClass = () => {
  const [, isLoading] = useClass();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

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
          {classes.length === 0 ? (
            <h2>No classes yet</h2>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center">
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
