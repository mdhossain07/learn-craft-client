import { useEffect } from "react";
import HeaderSlider from "../../Components/HeaderSlider/HeaderSlider";

const Home = () => {
  useEffect(() => {
    document.title = "Learn Craft - Home";
  }, []);

  return (
    <div>
      <HeaderSlider />
    </div>
  );
};

export default Home;
