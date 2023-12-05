import { FaPen } from "react-icons/fa6";

const Update = () => {
  return (
    <button className="btn bg-green-500 hover:bg-green-700 p-3 text-white rounded-md">
      <div className="flex items-center gap-1">
        <FaPen />
        Edit
      </div>
    </button>
  );
};

export default Update;
