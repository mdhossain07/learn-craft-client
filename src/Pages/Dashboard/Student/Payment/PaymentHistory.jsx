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

  console.log(payments);
  return (
    <div>
      <h2>Payment History: {payments?.length}</h2>
    </div>
  );
};

export default PaymentHistory;
