import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import TeacherApprove from "../../../../Components/Approved/TeacherApprove/TeacherApprove";
import TeacherReject from "../../../../Components/TeacherReject/TeacherReject";
import { useEffect, useState } from "react";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Learn Craft - Teacher Request";
  }, []);

  const { data: teachers } = useQuery({
    queryKey: ["teacher-request"],
    initialData: [],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/teachers");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-10">
        Teachers Request
      </h2>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full my-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>

                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Email
                </th>

                <th scope="col" className="px-6 py-3">
                  Title
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-16 h-16 rounded-full"
                      src={item?.image}
                      alt={item?.name}
                    />
                  </th>

                  <td className="text-black font-semibold">{item?.name}</td>

                  <td className="px-6 py-4">
                    <h2>{item?.email}</h2>
                  </td>

                  <td className="text-base ">{item?.title}</td>

                  <td className="px-6 py-4">
                    <div
                      className={`${
                        item?.status === "rejected" ? "hidden" : "block"
                      }`}
                    >
                      <TeacherApprove item={item} />
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div
                      className={`${
                        item?.status === "approved" ? "hidden" : "block"
                      }`}
                    >
                      <TeacherReject item={item} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherRequest;
