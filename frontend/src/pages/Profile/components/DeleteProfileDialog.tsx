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
import { deleteProfile, updateProfile } from "@/redux/slices/profileSlice";
import { deleteWorkout } from "@/redux/slices/workoutSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Profile } from "@/types/user";
import { updateProfileId } from "@/redux/slices/authSlice";

const DeleteProfileDialog = ({ profile }: { profile: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.profile);
  const token = useAppSelector((state) => state.auth.token);

  const handleDelete = async () => {
    try {
      setLoading(true);
      console.log(profile);
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${profile.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const activeProfile = profiles.find((p) => p.id === profile.id);
      if (activeProfile) {
        activeProfile.workouts.forEach((w: any) => {
          dispatch(deleteWorkout(w.id));
        });
      }
      const payload = res.data.activeProfile as Profile;
      dispatch(
        updateProfile({
          ...payload,
          active: true,
        })
      );
      dispatch(updateProfileId(payload.id));
      dispatch(deleteProfile(profile.id));
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
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
          Are you sure you want to delete this profile? Related workouts and
          exercises will be deleted.
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
