import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

const Assignments = () => {
  //   console.log(id);
  const { id } = useParams();
  console.log(id);

  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/assignment/${id}`);
      return res.data;
    },
  });

  //   console.log(assignments);

  //   axiosPublic
  //     .get(`/api/v1/submitted-assignments?email=${user?.email}&id=${id}`)
  //     .then(() => setIsSubmitted(true));

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("myFile", assignmentFile);

    // const assignmentInfo = {
    //   email: user?.email,
    //   assignment_name: assignmentFile?.name,
    //   assignmentId: id,
    // };

    // axiosPublic.post("/api/v1/post-assignment", assignmentInfo)
    // .then((res) => {
    //   if (res.data.insertedId) {
    //     toast.success("Assignment Submssion Done!");
    //   }
    // });
  };
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className="text-2xl my-10 font-semibold text-center">
          Assignments Lists
        </h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Assignemnt Title
              </th>

              <th scope="col" className="px-6 py-3">
                Description
              </th>

              <th scope="col" className="px-6 py-3">
                Deadline
              </th>

              <th scope="col" className="px-6 py-3">
                Your File
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <h2>{item?.title}</h2>
                </th>

                <td className="text-gray-400">{item?.description}</td>

                <td className="px-6 py-4">
                  <h2>{item?.deadline}</h2>
                </td>

                <td>
                  {isSubmitted ? (
                    <h2 className="text-green-500 font-medium">
                      File Submitted
                    </h2>
                  ) : (
                    <input
                      onChange={(e) => setAssignmentFile(e.target.files[0])}
                      type="file"
                      required
                      className="rounded-lg"
                    />
                  )}
                </td>

                <td className="px-6 py-4">
                  {moment().isBefore(item?.deadline) ? (
                    <div>
                      {isSubmitted ? (
                        <h2 className="text-blue-500 font-medium">
                          Submisson Done
                        </h2>
                      ) : (
                        <button
                          onClick={() => handleSubmit(item._id)}
                          className="p-3 font-medium bg-blue-600 rounded-lg text-white"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  ) : (
                    <h2 className="text-red-500 font-medium">
                      Deadline Expired
                    </h2>
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

export default Assignments;
