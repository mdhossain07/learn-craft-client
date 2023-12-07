import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from "prop-types";

const Reject = () => {
  const axiosSecure = useAxiosSecure();

  const handleReject = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to reject this class?`,
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
              text: `${item?.title} class is rejected`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <button
        onClick={() => handleReject()}
        className="btn p-3 font-medium bg-blue-600 rounded-lg text-white "
      >
        Reject
      </button>
    </div>
  );
};

Reject.propTypes = {
  item: PropTypes.object,
};

export default Reject;
