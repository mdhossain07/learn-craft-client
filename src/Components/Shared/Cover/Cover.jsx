import teacher from "../../../assets/images/Teacher-pana.png";

const Cover = ({ heading }) => {
  return (
    <div className="bg-[#0766AD] h-[40vh] flex justify-center gap-20 items-center">
      <h2 className="text-center py-28 text-white font-semibold text-4xl">
        All Classes
      </h2>
      <div>
        <img className="w-[300px]" src={teacher} alt="" />
      </div>
    </div>
  );
};

export default Cover;
