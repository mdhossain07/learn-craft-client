import { FaFile } from "react-icons/fa6";

const Details = () => {
  return (
    <button className="btn bg-orange-500 hover:bg-orange-700 p-3 text-white rounded-md">
      <div className="flex items-center gap-1">
        <FaFile />
        Details
      </div>
    </button>
  );
};

export default Details;
