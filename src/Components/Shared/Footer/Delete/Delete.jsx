import { FaTrash } from "react-icons/fa6";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useClass from "../../../../hooks/useClass";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const Delete = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const [, , refetch] = useClass();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/api/v1/delete-class/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <button
      onClick={handleDelete}
      className="btn bg-red-500 hover:bg-red-700 p-3 text-white rounded-md"
    >
      <div className="flex items-center gap-1">
        <FaTrash />
        Delete
      </div>
    </button>
  );
};

Delete.propTypes = {
  id: PropTypes.string,
};

export default Delete;
