import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import usePayments from "../../../../hooks/usePayments";
import { useQuery } from "@tanstack/react-query";

const EnrollClass = () => {
  const [payment] = usePayments();
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  const { data: enrolledClass = {} } = useQuery({
    queryKey: ["enrolled-class"],
    enabled: !loading && !!payment?.classId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/class/${payment?.classId}`);
      return res.data;
    },
  });

  console.log(enrolledClass);

  return (
    <div>
      <h2>My Enrolled Class</h2>

      <div>
        {/* <img src={courseInfo?.image} alt="" />
        <h2>{courseInfo?.title}</h2> */}
      </div>
    </div>
  );
};

export default EnrollClass;
