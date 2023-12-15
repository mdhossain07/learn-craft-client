import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useClass from "../../hooks/useClass";
import PropTypes from "prop-types";
import { useState } from "react";

const TeacherReject = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const [, , refecth] = useClass();
  const [reject, setReject] = useState(false);

  const handleReject = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to reject ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/api/v1/reject/${item?._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Done!",
              text: `You rejected the request`,
              icon: "success",
            });
            refecth();
          }
        });
      }
    });
  };

  axiosSecure.get(`/api/v1/teacher/${item?.email}`).then((res) => {
    if (res.data?.status === "rejected") {
      setReject(true);
    }
  });

  return (
    <div>
      {reject ? (
        <h2 className="text-red-500 font-semibold">Rejected</h2>
      ) : (
        <button
          onClick={() => handleReject(item)}
          className="btn p-3 font-medium bg-red-600 rounded-lg text-white "
        >
          Reject
        </button>
      )}
    </div>
  );
};

TeacherReject.propTypes = {
  item: PropTypes.object,
};

export default TeacherReject;
