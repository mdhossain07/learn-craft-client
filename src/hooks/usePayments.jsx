import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const usePayments = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: payments } = useQuery({
    queryKey: ["payments", user?.email],
    initialData: {},

    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/payments?email=${user.email}`);
      return res.data;
    },
  });

  return [payments];
};

export default usePayments;
