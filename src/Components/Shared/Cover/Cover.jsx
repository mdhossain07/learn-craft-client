import PropTypes from "prop-types";

const Cover = ({ image, heading }) => {
  return (
    <div className="bg-[#0766AD] h-[40vh] flex justify-center gap-20 items-center">
      <h2 className="text-center py-28 text-white font-semibold text-4xl">
        {heading}
      </h2>
      <div>
        <img className="w-[300px]" src={image} alt="" />
      </div>
    </div>
  );
};

Cover.propTypes = {
  heading: PropTypes.string,
  image: PropTypes.node,
};

export default Cover;
