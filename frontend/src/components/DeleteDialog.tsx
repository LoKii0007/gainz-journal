import { Loader2, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import React, { useState } from "react";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import toast from "react-hot-toast";
import { removeWorkout } from "@/redux/slices/workoutSlice";
import { removeExercise } from "@/redux/slices/exerciseSlice";
import { removeSet } from "@/redux/slices/setSlice";
import { useAppDispatch } from "@/lib/hooks";

const DeleteDialog = React.memo(({ workoutId }: { workoutId: string }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const workout = useAppSelector((state) => state.workout.workouts[workoutId]);
  const exercises = useAppSelector((state) => state.exercise.exercises);
  const sets = useAppSelector((state) => state.set.sets);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/workout/${workoutId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Delete all associated exercises and sets
      workout.exerciseIds?.forEach(exerciseId => {
        const exercise = exercises[exerciseId];
        if (exercise) {
          // Delete all sets for this exercise
          Object.values(sets).forEach(set => {
            if (set.exerciseId === exerciseId) {
              dispatch(removeSet(set.id));
            }
          });
          dispatch(removeExercise(exerciseId));
        }
      });

      // Delete the workout
      dispatch(removeWorkout(workoutId));

      toast.success("Workout deleted successfully");
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete workout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="hover:bg-red-100 hover:text-white rounded-full p-2">
          <Trash size={16} color="red" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this workout?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default DeleteDialog;
