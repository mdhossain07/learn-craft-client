import useProfile from "../../../../hooks/useProfile";

const TeacherProfile = () => {
  const { userInfo } = useProfile();

  return (
    <div>
      <h2>Teacher Profile</h2>
      <img src={userInfo?.photo_url} alt="" />
      <p>{userInfo?.name}</p>
      <p>{userInfo?.role}</p>
    </div>
  );
};

export default TeacherProfile;
