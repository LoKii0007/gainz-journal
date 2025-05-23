import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setProfiles, updateProfile } from "@/redux/slices/profileSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LogoutDialog from "@/components/profile/LogoutDailog";
import AddProfileDialog from "@/components/profile/AddProfileDialog";
import ProfileSwitcher from "@/components/profile/ProfileSwitcher";
import { WeightType, WeightUnit } from "@/types/workout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, email, currentProfileId } = useAppSelector((state) => state.auth);
  const profiles = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentProfile = profiles.find(p => p.id === currentProfileId);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfiles = async () => {
      if (profiles.length > 0) return;
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setProfiles(res.data));
      } catch (error: any) {
        toast.error(
          error.response?.data?.error || "Failed to fetch profiles"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [token, dispatch, navigate]);

  const handleWeightUnitChange = async (value: WeightUnit) => {
    if (!currentProfile) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${currentProfile.id}`,
        {
          weightUnit: value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updateProfile(response.data));
      toast.success("Weight unit preference updated");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update weight unit");
    }
  };

  const handleWeightTypeChange = async (value: WeightType) => {
    if (!currentProfile) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${currentProfile.id}`,
        {
          weightType: value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updateProfile(response.data));
      toast.success("Weight type preference updated");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update weight type");
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto p-4 max-w-md space-y-4">
      <Card>
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

      <Card className="p-2">
        <CardHeader className="p-2">
          <CardTitle className="text-lg">Profiles</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          {isLoading ? (
            <div className="py-4 text-center">Loading profiles...</div>
          ) : (
            <>
              {profiles && profiles.length > 0 ? (
                <div className="space-y-4">
                  <ProfileSwitcher />
                  <Separator className="my-3" />
                  {currentProfile && (
                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label>Weight Unit</Label>
                        <Select
                          value={currentProfile.weightUnit}
                          onValueChange={handleWeightUnitChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select weight unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={WeightUnit.KG}>kg</SelectItem>
                            <SelectItem value={WeightUnit.LBS}>lbs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label>Weight Type</Label>
                        <Select
                          value={currentProfile.weightType}
                          onValueChange={handleWeightTypeChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select weight type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={WeightType.TOTAL}>Total Weight</SelectItem>
                            <SelectItem value={WeightType.PER_SIDE}>Weight Per Side</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
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
