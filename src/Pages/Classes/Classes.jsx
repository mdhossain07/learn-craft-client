import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Container from "../../Components/Shared/Container";
import Cover from "../../Components/Shared/Cover/Cover";
import teacher from "../../assets/images/Teacher-pana.png";
import { PuffLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";

const Classes = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    document.title = "Learn Craft - All Class";
  }, []);

  const { data: approvedClass, isLoading } = useQuery({
    queryKey: ["approved-class"],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/approved-classes?status=approved`
      );
      setAllResults(res.data);
      return res.data;
    },
  });

  const handleSearch = () => {
    axiosPublic
      .get(`/api/v1/courses/search?search=${searchTerm}`)
      .then((res) => setAllResults(res.data));
  };

  const handleSort = (sortOptions) => {
    if (sortOptions === "All Courses") {
      setAllResults(approvedClass);
    } else if (sortOptions === "Low To High") {
      asecSort();
    } else if (sortOptions === "High To Low") {
      descSort();
    }
  };

  const asecSort = useCallback(() => {
    const updatedData = [...allResults];
    const result = updatedData.sort((a, b) => a.price - b.price);
    setAllResults(result);
  }, [allResults]);

  const descSort = useCallback(() => {
    const updatedData = [...allResults];
    const result = updatedData.sort((a, b) => b.price - a.price);
    setAllResults(result);
  }, [allResults]);

  return (
    <>
      <Cover image={teacher} heading={"All Classes"}></Cover>

      <Container>
        <h2 className="text-3xl text-center font-semibold my-10">
          Our Featured Courses{" "}
        </h2>
        <div className="flex gap-2 py-3 w-9/12 mx-auto my-10">
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value="All Courses">All Courses</option>
            <option value="Low To High">Low To High</option>
            <option value="High To Low">High To Low</option>
          </select>

          <input
            type="text"
            className="block border w-1/2 mx-auto outline-none border-gray-400"
            placeholder="search courses..."
            onBlur={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-3 py-2 block"
          >
            Search
          </button>
        </div>
        {isLoading ? (
          <PuffLoader color="#36d7b7" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-items-center">
            {allResults?.map((item) => (
              <div key={item?._id}>
                <div className="h-[480px] shadow-xl p-5 rounded-lg space-y-2">
                  <img
                    className="w-[800px] h-[200px]"
                    src={item.image}
                    alt={item.title}
                  />
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p>{item?.description.slice(0, 30)}....</p>
                  <div className="flex gap-10">
                    <p className="text-gray-800 text-sm font-medium">
                      Course Price: ${item.price}
                    </p>
                    <p className="text-gray-800 text-sm font-medium">
                      Total Enrollment:{" "}
                      {item?.enrollment ? item?.enrollment : "0"}
                    </p>
                  </div>

                  <p className="text-gray-800 text-sm font-medium">
                    Instructor Name: {item.instructor_name}
                  </p>

                  <Link to={`/class-info/${item._id}`}>
                    <button className="btn bg-[#0766AD] w-full mt-4 text-white p-3 rounded-lg">
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Classes;
