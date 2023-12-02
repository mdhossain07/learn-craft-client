import { useEffect } from "react";
import HeaderSlider from "../../Components/HeaderSlider/HeaderSlider";
import Collaboration from "../../Components/Collaboration/Collaboration";

const Home = () => {
  useEffect(() => {
    document.title = "Learn Craft - Home";
  }, []);

  return (
    <div>
      <HeaderSlider />
      <Collaboration />
    </div>
  );
};

export default Home;
