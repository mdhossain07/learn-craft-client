import Container from "../Shared/Container";
import SectionTitle from "../Shared/SectionTitle";
import teacher from "../../assets/images/teacher.jpg";
import { Link } from "react-router-dom";

const Instructor = () => {
  return (
    <div className="my-20">
      <Container>
        <SectionTitle
          heading={"Become an Instructor"}
          subHeading={"Join our teaching community"}
        />
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-3/4">
            <img className="w-full rounded-md" src={teacher} alt="" />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">Join as an Instructor</h2>
            <p>
              Instructors from around the world teach millions of learners on
              Learn Craft. We provide the tools and skills to teach what you
              love.
            </p>
            <Link to="/join-instructor">
              <button className="bg-[#29ADB2] px-5 py-3 rounded-full text-white my-5">
                Start Teaching Today
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Instructor;
