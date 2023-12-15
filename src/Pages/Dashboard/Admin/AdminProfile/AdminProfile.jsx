import useAdmin from "../../../../hooks/useAdmin";

const AdminProfile = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin.user);
  return (
    <div>
      <h2 className="text-3xl font-semibold mt-5">
        {" "}
        Welcome Back, {isAdmin?.user?.name}{" "}
      </h2>
      <div className="my-10">
        <img
          className="w-28 h-28 rounded-full"
          src={isAdmin?.user?.photo_url}
          alt={isAdmin?.user?.name}
        />
        <p>{isAdmin?.user?.name}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
