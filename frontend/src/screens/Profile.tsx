import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setProfiles } from "@/redux/slices/profileSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LogoutDialog from "@/components/profile/LogoutDailog";
import AddProfileDialog from "@/components/profile/AddProfileDialog";
import ProfileSwitcher from "@/components/profile/ProfileSwitcher";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, email } = useAppSelector((state) => state.auth);
  const profiles = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setProfiles(res.data.profiles));
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to fetch profiles"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [token, dispatch, navigate]);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto p-4 max-w-md space-y-4">
      <Card className="">
        <CardHeader className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="text-sm">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm truncate">{email}</CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profiles</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          {isLoading ? (
            <div className="py-4 text-center">Loading profiles...</div>
          ) : (
            <>
              {profiles && profiles.length > 0 ? (
                <div className="space-y-4">
                  <ProfileSwitcher />
                  <Separator className="my-3" />
                </div>
              ) : (
                <div className="py-2 text-center text-muted-foreground">
                  No profiles found
                </div>
              )}
              <div className="pt-4">
                <AddProfileDialog />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center">
        <LogoutDialog />
      </div>
    </div>
  );
};

export default Profile;
