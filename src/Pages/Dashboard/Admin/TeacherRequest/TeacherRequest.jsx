import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import TeacherApprove from "../../../../Components/Approved/TeacherApprove/TeacherApprove";
import TeacherReject from "../../../../Components/TeacherReject/TeacherReject";
import { useState } from "react";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: teachers } = useQuery({
    queryKey: ["teacher-request"],
    initialData: [],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/teachers");
      return res.data;
    },
  });

  const [status, setStatus] = useState("pending");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-10">
        Teachers Request
      </h2>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div></div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                  Status
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
                    <h2>{item?.status}</h2>
                  </td>

                  <td className={`px-6 py-4}`}>
                    <div
                      className={`${!item?.status === "pending" && "hidden"}`}
                    >
                      <TeacherApprove setStatus={setStatus} item={item} />
                    </div>
                  </td>

                  <td className={`px-6 py-4 ${item?.status && "disabled"}`}>
                    <div
                      className={`${!item?.status === "pending" && "hidden"}`}
                    >
                      <TeacherReject setStatus={setStatus} item={item} />
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
