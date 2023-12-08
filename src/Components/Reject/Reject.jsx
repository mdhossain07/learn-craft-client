import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from "prop-types";

const Reject = ({ item, setStatus }) => {
  const axiosSecure = useAxiosSecure();

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
            // axiosSecure.get(`/api/v1/teacher/${item?._id}`).then((res) => {
            //   console.log(res.data);
            //   if (res.data.status === "rejected") {
            //     setStatus(res.data.status);
            //   }
            // });
          }
        });
      }
    });
  };
  return (
    <div>
      <button
        onClick={() => handleReject(item)}
        className="btn p-3 font-medium bg-red-600 rounded-lg text-white "
      >
        Reject
      </button>
    </div>
  );
};

Reject.propTypes = {
  item: PropTypes.object,
  setStatus: PropTypes.func,
};

export default Reject;
