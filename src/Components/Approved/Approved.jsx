import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import useAdmin from "../../hooks/useAdmin";

const Approved = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useAdmin();

  const handleApprove = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to approve this class?`,
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
              text: `${item?.title} class is approved`,
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
      <button
        onClick={() => handleApprove(item)}
        className="btn p-3 font-medium bg-blue-600 rounded-lg text-white "
      >
        Approve
      </button>
    </div>
  );
};

Approved.propTypes = {
  item: PropTypes.object,
};

export default Approved;
