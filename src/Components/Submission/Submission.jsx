import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useClass from "../../hooks/useClass";
import PropTypes from "prop-types";

const Submission = ({ handleSubmit, item, isSubmitted, setIsSubmitted }) => {
  const { _id } = item;
  const [, , refetch] = useClass();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  //   console.log(assignmentId);

  axiosPublic
    .get(`/api/v1/submitted-assignments?id=${_id}&email=${user?.email}`)
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        setIsSubmitted(true);
        refetch();
      }
    });

  return (
    <>
      {isSubmitted ? (
        "Submission done"
      ) : (
        <button
          onClick={() => handleSubmit(_id)}
          className="p-3 font-medium bg-blue-600 rounded-lg text-white"
        >
          Submit
        </button>
      )}
    </>
  );
};

Submission.propTypes = {
  item: PropTypes.object,
  handleSubmit: PropTypes.func,
  isSubmitted: PropTypes.bool,
  setIsSubmitted: PropTypes.func,
};

export default Submission;
