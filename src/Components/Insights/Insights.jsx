import kids from "../../assets/images/Kids Education.jpg";
import Container from "../Shared/Container";
import SectionTitle from "../Shared/SectionTitle";

const Insights = () => {
  return (
    <div>
      <Container>
        <SectionTitle
          heading={"Courses Insights"}
          subHeading={"This is subheading"}
        />
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          <div className="lg:w-1/2">
            <div className="bg-[#E5E0FD] my-5 text-2xl font-semibold px-5 py-3 rounded-lg">
              <h2>Total Users: 120</h2>
            </div>
            <div className="bg-[#DAF7F1] my-5 text-2xl font-semibold px-5 py-3 rounded-lg">
              <h2>Total Classes: 50</h2>
            </div>
            <div className="bg-[#FCDADA] my-5 text-2xl font-semibold px-5 py-3 rounded-lg">
              <h2>Total Enrollment: 250</h2>
            </div>
            <div className="bg-[#E5E0FD] my-5 text-2xl font-semibold px-5 py-3 rounded-lg">
              <h2>One Time Payment</h2>
            </div>
            <div className="bg-[#DAF7F1] my-5 text-2xl font-semibold px-5 py-3 rounded-lg">
              <h2>Subscription</h2>
            </div>
            <div className="bg-[#FCDADA] my-5 text-2xl font-semibold px-5 py-3 rounded-lg">
              <h2>Payment Plan</h2>
            </div>
          </div>
          <div className="lg:w-9/12 mb-10">
            <img className="w-[600px] rounded-md" src={kids} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Insights;
