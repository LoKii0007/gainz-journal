import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { updateProfile } from "@/redux/slices/profileSlice";
import { updateProfileId } from "@/redux/slices/authSlice";
import { UserIcon } from "lucide-react";
import { setWorkouts } from "@/redux/slices/workoutSlice";


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
        toast.success(`Switched to ${newProfile.name}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to switch profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (profiles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-sm font-medium leading-none">Current Profile</h3>
        <p className="text-sm text-muted-foreground">
          {currentProfile ? currentProfile.name : "No active profile"}
        </p>
      </div>

      <div className="grid gap-2">
        <h3 className="text-sm font-medium leading-none mb-2">
          Switch Profile
        </h3>
        <div className="grid gap-2">
          {profiles.map((profile) => (
            <Button
              key={profile.id}
              variant={profile.id === currentProfileId ? "default" : "outline"}
              className="justify-start"
              disabled={isLoading || profile.id === currentProfileId}
              onClick={() => handleSwitchProfile(profile.id)}
            >
              <UserIcon className="mr-2 h-4 w-4" />
              {profile.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSwitcher;
