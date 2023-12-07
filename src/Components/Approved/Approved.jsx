import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const Approved = ({ item, status, setStatus }) => {
  const axiosSecure = useAxiosSecure();

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
                text: `You approved the request the request`,
                icon: "success",
              });
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

Approved.propTypes = {
  item: PropTypes.object,
  setStatus: PropTypes.func,
};

export default Approved;
