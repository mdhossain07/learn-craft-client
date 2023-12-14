import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import useProfile from "../../../../hooks/useProfile";

const StudentProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { userInfo } = useProfile();
  const { user, loading } = useAuth();

  const { data: enrolledCourses } = useQuery({
    queryKey: ["enrolled-courses"],
    initialData: {},
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/enrollments?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { data: allPayments, isPending } = useQuery({
    queryKey: ["all-Payments"],
    initialData: [],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/payments?email=${user?.email}`
      );
      return res.data;
    },
  });

  // const { data: submittedAssignments } = useQuery({
  //   queryKey: ["submitted-assignments"],
  //   initialData: {},
  //   enabled: !loading && !!user?.email,
  //   queryFn: async () => {
  //     const res = await axiosPublic.get(
  //       `/api/v1/submitted-assignments?email=${user?.email}`
  //     );
  //     return res.data;
  //   },
  // });

  const totalCost = allPayments?.reduce(
    (total, item) => total + item?.price,
    0
  );

  return (
    <>
      {isPending ? (
        <h2>Loading....</h2>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold my-5">
            Welcome Back, {user?.displayName}
          </h1>
          <div className="flex flex-col lg:flex-row">
            <div>
              <img
                className="rounded-full"
                src={userInfo?.photo_url}
                alt={user?.displayName}
              />
              <p className="text-xl font-medium">Name: {user?.displayName}</p>
              <p>Email:{user?.email}</p>
              <p>Role: {userInfo?.role}</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 ">
              <div className="bg-purple-500 rounded-lg h-[100px] flex justify-center p-3 items-center text-white font-medium text-2xl">
                <h2 className="">
                  Enrolled Courses{" "}
                  <p className="text-center">{enrolledCourses?.totalEnroll}</p>
                </h2>
              </div>

              <div className="bg-purple-500 rounded-lg h-[100px] flex justify-center p-3 items-center text-white font-medium text-2xl">
                <h2 className="">
                  Total Payments <p className="text-center">${totalCost}</p>
                </h2>
              </div>

              <div className="bg-purple-500 rounded-lg h-[100px] flex justify-center p-3 items-center text-white font-medium text-2xl">
                <h2 className="">
                  Assignments Submitted{" "}
                  <p className="text-center">${totalCost}</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProfile;
