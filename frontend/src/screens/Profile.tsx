import LogoutDialog from "@/components/profile/LogoutDailog";

const Profile = () => {
  return (
    <>
      <div className="profile p-2 flex flex-col bg-gray-100 items-center min-h-screen w-full">
        <div className="flex-1">
          <h1>Profile</h1>
        </div>
        <div className="flex-1">
          <LogoutDialog />
        </div>
      </div>
    </>
  );
};

export default Profile;
