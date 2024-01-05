import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Users = () => {
  // const axiosPublic = useAxiosPublic();

  useEffect(() => {
    document.title = "Learn Craft - All Users";
  }, []);

  const axiosSecure = useAxiosSecure();
  const { data: users, refetch } = useQuery({
    queryKey: ["all-users"],
    initialData: [],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/users");
      return res.data;
    },
  });

  const handleAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want ${user?.name} to make Admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/api/v1/admin/${user?._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Done!",
              text: `${user?.name} is Admin Now`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-10">
        Registered Users
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full my-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Admin
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.photo_url}
                    alt="Jese image"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user?.name}</div>
                    <div className="font-normal text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                </th>

                <td className="px-6 py-4">{user?.role}</td>

                <td className="px-6 py-4">
                  <h2 className="font-semibold text-lg text-blue-500">
                    {user?.admin}
                  </h2>
                </td>

                <td className="px-6 py-4">
                  {user?.admin === "admin" ? null : (
                    <button
                      onClick={() => handleAdmin(user)}
                      className="btn p-3 font-medium bg-blue-600 rounded-lg text-white "
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
