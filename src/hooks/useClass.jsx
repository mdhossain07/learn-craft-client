import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useClass = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: classes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-class"],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/classes");
      return res.data;
    },
  });

  return [classes, isLoading, refetch];
};

export default useClass;
