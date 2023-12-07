import { Link } from "react-router-dom";
import Slider1 from "../../assets/images/Header Slider 1.jpg";
import Container from "../Shared/Container";

const HeaderSlider = () => {
  return (
    <div className="min-h-[calc(100vh-97px)] bg-[#0766AD]">
      <Container>
        <div className="flex flex-col md:flex-col lg:flex-row justify-between items-center gap-5 md:gap-16 py-5 md:py-16">
          <div className="text-white text-center lg:text-left lg:w-1/2 my-5 space-y-5">
            <h2 className="text-5xl font-medium">
              Your Online Training Journey Begins Here
            </h2>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              est officiis tempora similique maiores incidunt voluptatem eum
              facilis veritatis? Necessitatibus?
            </p>
            <div className="flex justify-center lg:justify-start gap-10">
              <Link to="/register">
                <button className="bg-[#29ADB2] px-5 py-3 rounded-full cursor-pointer">
                  Sign Up For Free
                </button>
              </Link>

              <Link to="/all-classes">
                <button className="border-2 border-white text-white px-5 py-3 rounded-full cursor-pointer">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-9/12">
            <img
              className="w-[450px] md:w-[700px] rounded-lg border-4 border-white"
              src={Slider1}
              alt=""
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeaderSlider;
