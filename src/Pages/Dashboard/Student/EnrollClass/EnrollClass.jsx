import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";
import { useEffect } from "react";

const EnrollClass = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [courseInfo, setCourseInfo] = useState(null);

  const { data: payments } = useQuery({
    queryKey: ["payments", user?.email],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/payments?email=${user.email}`);
      return res.data;
    },
  });

  //   console.log(payments);

  const courseId = payments.map((item) => item.classId);
  const id = courseId[0];

  useEffect(() => {
    axiosPublic.get(`/api/v1/class/${id}`).then((res) => {
      setCourseInfo(res.data);
    });
  }, [axiosPublic, id]);

  //   console.log(courseInfo);

  return (
    <div>
      <h2>My Enrolled Class</h2>

      <div>
        <img src={courseInfo?.image} alt="" />
        <h2>{courseInfo?.title}</h2>
      </div>
    </div>
  );
};

export default EnrollClass;
