import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import useClass from "../../../../hooks/useClass";
import Evaluation from "../../../../Components/Evaluation/Evaluation";

const EnrolledClassDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [, , refetch] = useClass();
  const [assignmentFile, setAssignmentFile] = useState(null);

  const { id } = useParams();
  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/assignment/${id}`);
      return res.data;
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("myFile", assignmentFile);

    console.log(formData);
    console.log(assignmentFile);

    axiosPublic.patch(`/api/v1/update-assignment/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Assignment Submitted");
      }
      refetch();
    });
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
                  <input
                    onChange={(e) => setAssignmentFile(e.target.files[0])}
                    type="file"
                    className="rounded-lg"
                  />
                </td>

                <td className="px-6 py-4">
                  {moment().isBefore(item?.deadline) && (
                    <div>
                      {item?.PDA ? (
                        <h2 className="text-green-500 font-medium">
                          Submitted
                        </h2>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          className="p-3 font-medium bg-blue-600 rounded-lg text-white"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Evaluation />
    </div>
  );
};

export default EnrolledClassDetails;
