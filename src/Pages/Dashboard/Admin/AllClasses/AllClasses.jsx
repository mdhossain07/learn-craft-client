import useClass from "../../../../hooks/useClass";
import Approved from "../../../../Components/Approved/Approved";
import Reject from "../../../../Components/Reject/Reject";

const AllClasses = () => {
  const [classes] = useClass();

  return (
    <div>
      <h2 className="text-2xl my-10 font-semibold text-center">
        All Requested Classes
      </h2>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>

                <th scope="col" className="px-6 py-3">
                  Description
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-[100px] rounded-md lg:h-[50px]"
                      src={item?.image}
                      alt={item?.title}
                    />
                  </th>

                  <td className="text-base font-semibold">{item?.title}</td>

                  <td className="px-6 py-4">
                    <h2>{item?.instructor_email}</h2>
                  </td>

                  <td className="px-6 py-4">
                    <h2>{item?.description.slice(0, 10)}...</h2>
                  </td>

                  <td className="px-6 py-4">
                    <div
                      className={`${
                        item?.status === "rejected" ? "hidden" : "block"
                      }`}
                    >
                      <Approved item={item} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`${
                        item?.status === "approved" ? "hidden" : "block"
                      }`}
                    >
                      <Reject item={item} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`btn p-3 font-medium bg-blue-600 rounded-lg text-white ${
                        item?.status === "approved" ? "block" : "hidden"
                      }`}
                    >
                      Progress
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
