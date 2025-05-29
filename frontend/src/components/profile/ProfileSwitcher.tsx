import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import toast from "react-hot-toast";
import { updateProfile } from "@/redux/slices/profileSlice";
import { updateProfileId } from "@/redux/slices/authSlice";
import { UserIcon } from "lucide-react";
import { setWorkouts } from "@/redux/slices/workoutSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ProfileSwitcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const profiles = useAppSelector((state) => state.profile);
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(
    user?.currentProfileId
  );

  // Find current active profile
  const currentProfile =
    profiles.find((p) => p.id === currentProfileId) ||
    profiles.find((p) => p.active) ||
    (profiles.length > 0 ? profiles[0] : null);

  // Update currentProfileId when currentProfile changes
  useEffect(() => {
    if (currentProfile && currentProfile.id !== currentProfileId) {
      setCurrentProfileId(currentProfile.id);
    }
  }, [currentProfile, currentProfileId]);

  const handleSwitchProfile = async (profileId: string) => {
    if (profileId === currentProfileId) return;

    setIsLoading(true);
    const loadingToast = toast.loading("Switching profile...");

    try {
      // Deactivate current profile
      if (currentProfileId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile/${currentProfileId}`,
          { active: false },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }

      // Activate new profile
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${profileId}`,
        { active: true },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Update local state and storage
      dispatch(updateProfile(res.data.profile));
      dispatch(updateProfileId(profileId));
      dispatch(setWorkouts(res.data.profile.workouts));
      setCurrentProfileId(profileId);

      // Display success message
      const newProfile = profiles.find((p) => p.id === profileId);
      if (newProfile) {
        toast.success(`Switched to ${newProfile.name}`, {
          id: loadingToast
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to switch profile", {
        id: loadingToast
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (profiles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-2">
        <Label>Active Profile</Label>
        <Select
          value={currentProfileId || undefined}
          onValueChange={handleSwitchProfile}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select profile">
              {currentProfile ? (
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {currentProfile.name}
                </div>
              ) : (
                "Select profile"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {profiles.map((profile) => (
              <SelectItem
                key={profile.id}
                value={profile.id}
                className="flex items-center"
              >
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {profile.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProfileSwitcher;
