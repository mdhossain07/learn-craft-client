import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: userInfo } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/user/${user?.email}`);
      return res.data;
    },
  });

  return { userInfo };
};

export default useProfile;
