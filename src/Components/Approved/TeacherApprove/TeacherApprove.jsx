import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClass from "../../../hooks/useClass";

import PropTypes from "prop-types";
import { useState } from "react";

const TeacherApprove = ({ item }) => {
  const [approve, setApprove] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [, , refetch] = useClass();

  const handleApprove = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to approve this?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/api/v1/teacher-approve/${item?._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Done!",
                text: `You approved the teacher request`,
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  axiosSecure.get(`/api/v1/teacher/${item?.email}`).then((res) => {
    if (res.data?.status === "approved") {
      setApprove(true);
    }
  });

  return (
    <div>
      {approve ? (
        <h2 className="text-blue-500 font-semibold">Approved</h2>
      ) : (
        <button
          onClick={() => handleApprove(item)}
          className="p-3 font-medium bg-blue-600 rounded-lg text-white"
        >
          Approve
        </button>
      )}
    </div>
  );
};

TeacherApprove.propTypes = {
  item: PropTypes.object,
};

export default TeacherApprove;
