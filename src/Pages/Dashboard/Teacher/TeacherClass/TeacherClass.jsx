import { PuffLoader } from "react-spinners";
import ClassCard from "../../../../Components/Shared/ClassCard/ClassCard";
import useClass from "../../../../hooks/useClass";

const TeacherClass = () => {
  const [classes, isLoading] = useClass();
  console.log(classes);

  return (
    <>
      {isLoading ? (
        <PuffLoader color="#36d7b7" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center">
          {classes?.map((item) => (
            <ClassCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default TeacherClass;
