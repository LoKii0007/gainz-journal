import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Loader2, Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import { Exercise, Workout } from "@/types/workout";
import { SearchDropdown } from "./SearchDropdown";
import { addExercise } from "@/redux/slices/exerciseSlice";
import { updateWorkout } from "@/redux/slices/workoutSlice";

interface AddExerciseDialogProps {
  workout: Workout;
  onExerciseAdded?: (exercise: Exercise) => void;
  trigger?: React.ReactNode;
}

const AddExerciseDialog: React.FC<AddExerciseDialogProps> = ({
  workout,
  onExerciseAdded,
}) => {
  const [exerciseName, setExerciseName] = useState({label: "", value: ""});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!exerciseName.value.trim()) {
        toast.error("Please enter an exercise name");
        return;
      }

      try {
        setLoading(true);

        // Create a new exercise
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/exercise`,
          {
            name: exerciseName.value,
            workoutId: workout.id,
            profileId: user.currentProfileId,
            sets: [],
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        const newExercise = response.data.exercise;

        // Add exercise to Redux store
        dispatch(addExercise(newExercise));

        // Update workout's exerciseIds
        dispatch(updateWorkout({
          id: workout.id,
          exerciseIds: [...(workout.exerciseIds || []), newExercise.id]
        }));

        toast.success("Exercise added successfully!");

        // Reset form
        setExerciseName({label: "", value: ""});
        setIsOpen(false);

        // Callback to parent component if provided
        if (onExerciseAdded && newExercise) {
          onExerciseAdded(newExercise);
        }
      } catch (error: any) {
        console.error("Error adding exercise:", error);
        toast.error(error.response?.data?.message || "Failed to add exercise");
      } finally {
        setLoading(false);
      }
    },
    [exerciseName, workout, user.token, user.currentProfileId, dispatch, onExerciseAdded]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-full mt-4 p-3 rounded-md border border-dashed border-muted-foreground hover:border-primary text-muted-foreground hover:text-primary flex items-center justify-center gap-2">
          <Plus size={16} />
          <span>Add Exercise</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Add Exercise to {workout.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2 md:gap-6 w-full">
            <Label htmlFor="exerciseName" className=" flex-shrink-0 text-left w-full">
              Exercise name
            </Label>
            <div className="w-full">
              <SearchDropdown
                exerciseName={exerciseName}
                setExerciseName={setExerciseName}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 items-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full col-start-2"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !exerciseName.value.trim()}
              className="gap-1"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <Plus size={16} />
                  Add Exercise
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseDialog;
