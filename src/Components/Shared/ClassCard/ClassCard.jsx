import PropTypes from "prop-types";
import Delete from "../Footer/Delete/Delete";
import Update from "../Update/Update";
import { Link } from "react-router-dom";
import Details from "../Details/Details";

const classCard = ({ item }) => {
  return (
    <div>
      <div className="lg:w-9/12 mx-auto shadow-xl p-5 rounded-lg space-y-2">
        <img
          className="w-[800px] h-[200px]"
          src={item.image}
          alt={item.title}
        />
        <h2 className="text-3xl font-semibold">{item.title}</h2>
        <div className="flex gap-10">
          <p className="text-gray-800 text-sm font-medium">
            Course Price: ${item.price}
          </p>
          <p className="text-gray-800 text-sm font-medium">
            Status: {item?.status}
          </p>
        </div>

        <p className="text-gray-800 text-sm font-medium">
          Instructor Name: {item.instructor_name}
        </p>
      </div>
      <div className="flex flex-row justify-center my-4  gap-5">
        <Link to={`/teacher/update-class/${item._id}`}>
          <Update />
        </Link>

        <Delete id={item._id} />

        {item?.status === "approved" ? (
          <Link to={`/teacher/class/${item._id}`}>
            <Details />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

classCard.propTypes = {
  item: PropTypes.object,
};

export default classCard;
