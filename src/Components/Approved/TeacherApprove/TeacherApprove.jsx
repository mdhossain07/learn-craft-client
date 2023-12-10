import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClass from "../../../hooks/useClass";

import PropTypes from "prop-types";

const TeacherApprove = ({ item, setStatus }) => {
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
              setStatus(item?.status);
            }
          });
      }
    });
  };

  return (
    <div>
      <button
        onClick={() => handleApprove(item)}
        className="p-3 font-medium bg-blue-600 rounded-lg text-white"
      >
        Approve
      </button>
    </div>
  );
};

TeacherApprove.propTypes = {
  item: PropTypes.object,
  setStatus: PropTypes.func,
};

export default TeacherApprove;
