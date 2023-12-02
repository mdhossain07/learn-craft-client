import Container from "../Shared/Container";
import SectionTitle from "../Shared/SectionTitle";
import teacher from "../../assets/images/teacher.jpg";

const Instructor = () => {
  return (
    <div className="min-h-screen mt-20">
      <Container>
        <SectionTitle
          heading={"Become an Instructor"}
          subHeading={"This is subehading"}
        />
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-3/4">
            <img className="w-full rounded-md" src={teacher} alt="" />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">Join as an Instructor</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
              quisquam, pariatur consequuntur facilis quia ea labore consequatur
              deleniti dolore rerum.
            </p>
            <button className="bg-[#29ADB2] px-5 py-3 rounded-full text-white">
              Start Teaching Today
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Instructor;
