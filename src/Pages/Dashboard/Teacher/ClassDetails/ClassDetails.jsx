import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../../Components/Shared/Container";
import useClass from "../../../../hooks/useClass";

const ClassDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [modal, setModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    document.title = "Learn Craft - Class Details";
  }, []);

  const { data } = useQuery({
    queryKey: ["single-class"],
    initialData: {},
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/class/${id}`);
      return res.data;
    },
  });

  const { data: assigntmentInfo } = useQuery({
    queryKey: ["assignmentInfo"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/assignment/${id}`);
      return res.data;
    },
  });

  const handleClose = () => {
    setModal(false);
  };

  const handleAssignment = () => {
    setModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const deadline = form.deadline.value;
    const description = form.description.value;

    const assignmentInfo = {
      classId: id,
      course_name: assigntmentInfo?.title,
      title: title,
      deadline: deadline,
      description: description,
    };

    axiosPublic.post("/api/v1/add-assignment", assignmentInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success("New Assignment Added");
        form.reset();
        setAssignment(assignment + 1);
      }
    });
  };

  const [assignment, setAssignment] = useState(data?.assignment);
  console.log(assignment);

  return (
    <Container>
      <h1 className="text-2xl font-semibold my-5 text-center">Class Details</h1>
      <h2 className="">Class Info : {data?.description}</h2>
      <div className="flex flex-col lg:flex-row gap-5 my-10">
        <div className="bg-purple-500 rounded-lg h-[100px] flex justify-center p-3 items-center text-white font-medium text-2xl">
          <h2 className="">
            Total Enrollment{" "}
            <p className="text-center">
              {data?.enrollment ? data?.enrollment : 0}
            </p>
          </h2>
        </div>

        <div className="bg-purple-500 rounded-lg h-[100px] flex justify-center p-3 items-center text-white font-medium text-2xl">
          <h2 className="">
            Total Assignments{" "}
            <p className="text-center">{data?.assignment ? assignment : 0}</p>
          </h2>
        </div>

        <div className="bg-purple-500 rounded-lg h-[100px] flex justify-center p-3 items-center text-white font-medium text-2xl">
          <h2 className="">
            Daily Assignments{" "}
            <p className="text-center">
              {assigntmentInfo?.PDA ? assigntmentInfo?.PDA : 0}
            </p>
          </h2>
        </div>
      </div>

      {/* <!-- Modal toggle --> */}
      <div className="flex justify-center my-10">
        <button
          onClick={handleAssignment}
          data-modal-toggle="crud-modal"
          data-modal-target="crud-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Create Assignment
        </button>
      </div>

      {/* <!-- Main modal --> */}
      {modal ? (
        <div
          // data-modal-show="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          //   className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-xl mx-auto max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Product
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
                      // stroke-linecap="round"
                      // stroke-linejoin="round"
                      // stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Assignment Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Assignment Deadline
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Assignment Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      required
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write assignment description here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-[#29ADB2] focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  Add Assignment
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </Container>
  );
};

export default ClassDetails;
