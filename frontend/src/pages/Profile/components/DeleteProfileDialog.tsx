"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeProfile, updateProfile } from "@/redux/slices/profileSlice";
import { deleteWorkoutWithExercises } from "@/redux/slices/workoutSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Profile } from "@/types/user";
import { updateProfileId } from "@/redux/slices/authSlice";

interface DeleteProfileDialogProps {
  profile: Profile;
}

const DeleteProfileDialog = ({ profile }: DeleteProfileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const loadingToast = toast.loading("Deleting profile...");

      // Delete profile from backend
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${profile.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Delete all workouts associated with this profile
      if (profile.workoutIds) {
        for (const workoutId of profile.workoutIds) {
          dispatch(deleteWorkoutWithExercises(workoutId));
        }
      }

      // Update active profile
      const newActiveProfile = res.data.activeProfile as Profile;
      dispatch(
        updateProfile({
          ...newActiveProfile,
          active: true,
        })
      );
      dispatch(updateProfileId(newActiveProfile.id));
      
      // Remove the deleted profile
      dispatch(removeProfile(profile.id));

      toast.success("Profile deleted successfully", { id: loadingToast });
    } catch (error: any) {
      console.error("Error deleting profile:", error);
      toast.error(error.response?.data?.message || "Failed to delete profile");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Delete Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Profile</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this profile? All associated workouts and
          exercises will be permanently deleted.
        </DialogDescription>
        <DialogFooter className="grid grid-cols-2 gap-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfileDialog;
