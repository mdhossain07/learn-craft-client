import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useState } from "react";
import useClass from "../../hooks/useClass";

const Approved = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const [approve, setApprove] = useState(false);
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
        axiosSecure.patch(`/api/v1/approve/${item?._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Done!",
              text: `You approved the course request`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  axiosSecure.get(`/api/v1/class/${item?._id}`).then((res) => {
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

Approved.propTypes = {
  item: PropTypes.object,
};

export default Approved;
