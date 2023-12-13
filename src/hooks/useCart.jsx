import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "../hooks/useAuth";

const useCart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: carts } = useQuery({
    queryKey: ["carts", user?.email],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/carts?email=${user?.email}`);
      return res.data;
    },
  });

  return [carts];
};

export default useCart;
