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
      <img
        className="w-[200px]"
        src={isAdmin?.user?.photo_url}
        alt={isAdmin?.user?.name}
      />
      <p>{isAdmin?.user?.name}</p>
    </div>
  );
};

export default AdminProfile;
