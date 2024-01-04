import { Link, useRouteError } from "react-router-dom";
import errorImage from "../../assets/images/errorImage.svg";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      {error.status === 404 && (
        <div className="flex justify-center py-5 ">
          {" "}
          <img className="w-[800px]" src={errorImage} alt="" />{" "}
        </div>
      )}

      <div className="flex justify-center my-10">
        <Link to="/">
          <button className="btn text-xl bg-blue-500 rounded-md px-5 py-2 text-white">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
