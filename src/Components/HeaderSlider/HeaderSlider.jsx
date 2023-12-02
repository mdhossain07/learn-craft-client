import Slider1 from "../../assets/images/Header Slider 1.jpg";
import Container from "../Shared/Container";

const HeaderSlider = () => {
  return (
    <div className="min-h-[calc(100vh-97px)] bg-[#0766AD]">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-16 py-5 md:py-16">
          <div className="text-white text-center md:text-left md:w-1/2 my-5 space-y-5">
            <h2 className="text-5xl font-medium">
              Your Online Training Journey Begins Here
            </h2>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              est officiis tempora similique maiores incidunt voluptatem eum
              facilis veritatis? Necessitatibus?
            </p>
            <div className="flex justify-center md:justify-start gap-10">
              <button className="bg-green-500 px-5 py-3 rounded-md cursor-pointer">
                Sign Up For Free
              </button>

              <button className="bg-green-500 px-5 py-3 rounded-md cursor-pointer">
                Enroll Now
              </button>
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
