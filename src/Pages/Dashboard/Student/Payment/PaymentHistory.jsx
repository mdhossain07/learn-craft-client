import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: payments } = useQuery({
    queryKey: ["payments", user?.email],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/payments?email=${user.email}`);
      return res.data;
    },
  });

  const [first] = payments;
  console.log(first?.classIds);

  const { data: courseInfo } = useQuery({
    queryKey: ["courseInfo", first?.classIds],
    initialData: {},
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/class/${first?.classIds}`);
      return res.data;
    },
  });

  console.log(courseInfo);

  return (
    <div>
      <h2>Payment History: {payments?.length}</h2>
      <img src={courseInfo.image} alt="" />
    </div>
  );
};

export default PaymentHistory;
