import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setProfiles, updateProfile } from "@/redux/slices/profileSlice";
import { updateUser } from "@/redux/slices/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LogoutDialog from "@/components/profile/LogoutDailog";
import AddProfileDialog from "@/components/profile/AddProfileDialog";
import ProfileSwitcher from "@/components/profile/ProfileSwitcher";
import { WeightType, WeightUnit } from "@/types/workout";
import { Gender } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X } from "lucide-react";
import DeleteProfileDialog from "./components/DeleteProfileDialog";

interface EditableFields {
  name: string;
  gender: Gender | undefined;
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState<EditableFields>({
    name: "",
    gender: undefined,
  });
  const { token, email, currentProfileId } = useAppSelector(
    (state) => state.auth
  );
  const profiles = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth);
  const [currentProfile, setCurrentProfile] = useState<any>(null);

  useEffect(() => {
    if (currentProfile) {
      setEditableFields({
        name: user?.name || "",
        gender: (user?.gender as Gender) || undefined,
      });
    }
  }, [currentProfile]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfiles = async () => {
      // if (profiles.length > 0) return;
      setIsLoading(true);
      const loadingToast = toast.loading("Loading profiles...");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setProfiles(res.data));
        toast.success("Profiles loaded", { id: loadingToast });
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Failed to fetch profiles", {
          id: loadingToast,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [token, dispatch, navigate]);

  const handleSave = async () => {
    if (!currentProfile) return;

    const loadingToast = toast.loading("Saving changes...");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
        {
          name: editableFields.name,
          gender: editableFields.gender,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updateUser(response.data.user));

      setIsEditing(false);
      toast.success("Changes saved successfully", { id: loadingToast });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save changes", {
        id: loadingToast,
      });
    }
  };

  const handleCancel = () => {
    if (currentProfile) {
      setEditableFields({
        name: currentProfile.name,
        gender: currentProfile.gender,
      });
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

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
      toast.error(
        error.response?.data?.error || "Failed to update weight unit"
      );
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
      toast.error(
        error.response?.data?.error || "Failed to update weight type"
      );
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    console.log(currentProfileId);
    if (currentProfileId) {
      setCurrentProfile(profiles.find((p) => p.id === currentProfileId));
    }
  }, [currentProfileId, profiles]);

  return (
    <>
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
          <CardHeader className="p-2 font-semibold">Profiles</CardHeader>
          <CardContent className="p-2">
            {isLoading ? (
              <div className="py-4 text-center text-muted-foreground">
                <div className="animate-pulse">Loading profiles...</div>
              </div>
            ) : (
              <>
                {profiles && profiles.length > 0 ? (
                  <div className="space-y-4">
                    <ProfileSwitcher />
                    {currentProfile && (
                      <>
                        <Separator className="my-3" />
                        <div>
                          <h3 className="text-sm font-semibold mb-3">
                            Preferences
                          </h3>
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
                                  <SelectItem value={WeightUnit.KG}>
                                    kg
                                  </SelectItem>
                                  <SelectItem value={WeightUnit.LBS}>
                                    lbs
                                  </SelectItem>
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
                                  <SelectItem value={WeightType.TOTAL}>
                                    Total Weight
                                  </SelectItem>
                                  <SelectItem value={WeightType.PER_SIDE}>
                                    Weight Per Side
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="py-2 text-center text-muted-foreground">
                    No profiles found
                  </div>
                )}
                <div className="pt-4 grid md:grid-cols-2 gap-4 items-center">
                  <DeleteProfileDialog profile={currentProfile} />
                  <AddProfileDialog />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 font-semibold">
            Personal Information
          </CardHeader>
          <CardContent>
            <Separator className="mb-3" />
            <div className="space-y-6">
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label>Name</Label>
                  <Input
                    value={editableFields.name}
                    onChange={(e) =>
                      setEditableFields((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter name"
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label>Gender</Label>
                  <Select
                    value={editableFields.gender || ""}
                    onValueChange={(value: Gender) =>
                      setEditableFields((prev) => ({
                        ...prev,
                        gender: value,
                      }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Male</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center mt-3 gap-6">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button variant="default" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    className="col-start-2"
                    onClick={handleEdit}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center">
          <LogoutDialog />
        </div>
      </div>
    </>
  );
};

export default Profile;
