import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import toast from "react-hot-toast";
import { updateProfile, setProfiles } from "@/redux/slices/profileSlice";
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
import { Profile } from "@/types/user";

const ProfileSwitcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const profilesMap = useAppSelector((state) => state.profile.profiles);
  const profiles = Object.values(profilesMap);
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(
    user?.currentProfileId
  );

  // Find current active profile
  const currentProfile = currentProfileId 
    ? profilesMap[currentProfileId]
    : profiles.find((p) => p.active) || profiles[0] || null;

  // Fetch profiles if not in cache
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user?.token) return;
      if (Object.keys(profilesMap).length > 0) return; // Skip if profiles are already in cache

      setIsLoading(true);
      const loadingToast = toast.loading("Loading profiles...");

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
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
  }, [user?.token, dispatch, profilesMap]);

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
      const newProfile = profilesMap[profileId];
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
            {profiles.map((profile: Profile) => (
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
