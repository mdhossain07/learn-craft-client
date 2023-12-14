import { useEffect } from "react";
import HeaderSlider from "../../Components/HeaderSlider/HeaderSlider";
import Collaboration from "../../Components/Collaboration/Collaboration";
import Instructor from "../../Components/Instructor/Instructor";
import Insights from "../../Components/Insights/Insights";
import Recommend from "../../Components/Recommend/Recommend";
import Feedbacks from "../../Components/Feedbacks/Feedbacks";

const Home = () => {
  useEffect(() => {
    document.title = "Learn Craft - Home";
  }, []);

  return (
    <div>
      <HeaderSlider />
      <Collaboration />
      <Insights />
      <Instructor />
      <Recommend />
      <Feedbacks />
    </div>
  );
};

export default Home;
