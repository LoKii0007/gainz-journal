import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Loader2, Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import toast from "react-hot-toast";
import { Days } from "@/types/workout";
import { addWorkout } from "@/redux/slices/workoutSlice";

interface ExerciseItem {
  name: string;
  id?: string;
}

const AddWorkoutDialog = React.memo(() => {
  // const [exerciseName, setExerciseName] = useState("");
  const [loading, setLoading] = useState(false);
  const initialState = {
    workoutDay: "",
    workoutTitle: "",
    exerciseList: [] as ExerciseItem[],
  };
  const [formState, setFormState] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Update form state
  const updateFormState = (key: keyof typeof initialState, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Add exercise to temp list
  // const addExerciseToList = useCallback(() => {
  //   if (!exerciseName.trim()) {
  //     toast.error("Please enter an exercise name");
  //     return;
  //   }

  //   updateFormState("exerciseList", [
  //     ...formState.exerciseList,
  //     { name: exerciseName },
  //   ]);
  //   setExerciseName("");
  // }, [exerciseName, formState.exerciseList]);

  // Remove exercise from temp list
  // const removeExercise = useCallback(
  //   (index: number) => {
  //     const updatedList = formState.exerciseList.filter((_, i) => i !== index);
  //     updateFormState("exerciseList", updatedList);
  //   },
  //   [formState.exerciseList]
  // );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const { workoutDay, workoutTitle, exerciseList } = formState;

      if (!workoutDay || !workoutTitle) {
        toast.error("Please fill in all required fields");
        return;
      }

      // if (exerciseList.length === 0) {
      //   toast.error("Please add at least one exercise");
      //   return;
      // }

      try {
        setLoading(true);

        const workoutData = {
          title: workoutTitle,
          day: workoutDay,
          profileId: user.currentProfileId,
          exercises: exerciseList.map((ex) => ({
            name: ex.name,
            sets: [],
          })),
        };

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/workout`,
          workoutData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        toast.success("Workout created successfully!");
        dispatch(addWorkout(response.data.workout));

        // Reset form
        setFormState(initialState);
        // setExerciseName("");
        setIsOpen(false);
      } catch (error: any) {
        console.error("Error creating workout:", error);
        toast.error(
          error.response?.data?.message || "Failed to create workout"
        );
      } finally {
        setLoading(false);
      }
    },
    [formState, user, initialState, dispatch]
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            <Plus size={20} />
            <span>Add Workout</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Add Workout</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="workoutTitle">Title</Label>
              <div className="col-span-2">
                <Input
                  id="workoutTitle"
                  type="text"
                  placeholder="Workout Title"
                  value={formState.workoutTitle}
                  onChange={(e) =>
                    updateFormState("workoutTitle", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="workoutDay">Day</Label>
              <div className="col-span-2">
                <Select
                  value={formState.workoutDay}
                  onValueChange={(value) =>
                    updateFormState("workoutDay", value)
                  }
                >
                  <SelectTrigger id="workoutDay" className="w-full">
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {Days.map((day) => (
                      <SelectItem key={day} value={day} className="capitalize">
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Exercise Inputs */}
            {/* <div className="space-y-3 mt-2">
              <h3 className="font-medium">Exercises</h3>

              {formState.exerciseList.map((exercise, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-grow">
                    <Input
                      type="text"
                      value={exercise.name}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(index)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <div className="flex-grow">
                  <Input
                    type="text"
                    placeholder={`Exercise ${
                      formState.exerciseList.length + 1
                    }`}
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="bg-zinc-800 hover:bg-zinc-700"
                  onClick={addExerciseToList}
                >
                  <Plus size={16} /> Add
                </Button>
              </div>
            </div> */}

            <div className="grid grid-cols-2 gap-6 mt-4 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create Workout"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default AddWorkoutDialog;
