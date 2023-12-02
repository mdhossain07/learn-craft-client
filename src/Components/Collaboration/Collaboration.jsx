import Container from "../Shared/Container";
import scb from "../../assets/images/Partnership Logos/standard-chartered-bank-new-20211713-removebg-preview.png";
import samsung from "../../assets/images/Partnership Logos/png-transparent-samsung-galaxy-gurugram-faridabad-logo-samsung-blue-text-logo-removebg-preview.png";
import bat from "../../assets/images/Partnership Logos/BAT_Bangladesh_Logo.png";
import uber from "../../assets/images/Partnership Logos/png-transparent-uber-logo-decal-lyft-business-text-people-logo-removebg-preview.png";
import amex from "../../assets/images/Partnership Logos/American-Express-Color.png";
import khan from "../../assets/images/Partnership Logos/Khan Academy.png";
import una from "../../assets/images/Partnership Logos/Unacademy_Logo-removebg-preview.png";

const Collaboration = () => {
  return (
    <div className="py-10">
      <Container>
        <h2 className="text-center">
          Trusted by 50+ companies & thousands of learners around the world
        </h2>
        <div className="flex gap-10 items-center px-5 justify-center w-9/12 mx-auto overflow-x-auto md:overflow-x-auto lg:overflow-visible">
          <img className="w-[120px] h-[100px]" src={scb} alt="" />
          <img className="w-[150px] h-[50px]" src={una} alt="" />
          <img className="w-[150px] h-[100px]" src={samsung} alt="" />
          <img className="w-[120px] h-[80px]" src={bat} alt="" />
          <img className="w-[80px] h-[60px]" src={uber} alt="" />
          <img className="w-[140px] h-[60px]" src={amex} alt="" />
          <img className="w-[180px] h-[30px]" src={khan} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default Collaboration;
