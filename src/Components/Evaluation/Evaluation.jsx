import { useState } from "react";
import useProfile from "../../hooks/useProfile";
import ReactStars from "react-rating-stars-component";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {
  const [modal, setModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const { userInfo } = useProfile();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const ratingChanged = (newRating) => {
    setNewRating(newRating);
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleEvaluation = () => {
    setModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = e.target.description.value;

    const feedbackInfo = {
      name: userInfo?.name,
      image: userInfo?.photo_url,
      rating: newRating,
      feedback: description,
    };

    axiosPublic.post("/api/v1/add-feedback", feedbackInfo).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Feedback Submitted!");
        e.target.reset();
      }
      navigate("/student/enroll-class");
    });
  };
  return (
    <div>
      <div className="flex justify-center my-10 ">
        <button
          onClick={handleEvaluation}
          data-modal-toggle="crud-modal"
          data-modal-target="crud-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Teaching Evaluation Report
        </button>
      </div>

      {modal ? (
        <div
          // data-modal-show="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          //   className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-xl mx-auto  max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Submit Your Feedback
                </h3>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                  data-modal-hide="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form onSubmit={handleSubmit} className="w-full p-4 md:p-5 ">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Student Name
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      defaultValue={userInfo?.name}
                      disabled
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Rating
                    </label>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={30}
                      activeColor="#0766AD"
                    />
                    ,
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Feedback Details
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      placeholder="Write your feedback here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-[#29ADB2]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Evaluation;
