import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import { Exercise, Workout } from "@/types/workout";
import { SearchDropdown } from "./SearchDropdown";
interface AddExerciseDialogProps {
  workout: Workout;
  onExerciseAdded?: (exercise: Exercise) => void;
  trigger?: React.ReactNode;
}

const AddExerciseDialog: React.FC<AddExerciseDialogProps> = ({ 
  workout, 
  onExerciseAdded,
  trigger 
}) => {
  const [exerciseName, setExerciseName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const user = useAppSelector((state) => state.auth);
  
  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!exerciseName.trim()) {
        toast.error("Please enter an exercise name");
        return;
      }
      
      try {
        setLoading(true);
        
        // Create a new exercise
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/exercise`,
          {
            name: exerciseName,
            workoutId: workout.id,
            profileId: user.currentProfileId,
            sets: []
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        
        toast.success("Exercise added successfully!");
        
        // Reset form
        setExerciseName("");
        setIsOpen(false);
        
        // Callback to parent component if provided
        if (onExerciseAdded && response.data.exercise) {
          onExerciseAdded(response.data.exercise);
        }
      } catch (error: any) {
        console.error("Error adding exercise:", error);
        toast.error(
          error.response?.data?.message || "Failed to add exercise"
        );
      } finally {
        setLoading(false);
      }
    },
    [exerciseName, workout.id, user.token, onExerciseAdded]
  );
  
  const defaultTrigger = (
    <button className="w-full mt-4 p-3 rounded-md border border-dashed border-muted-foreground hover:border-primary text-muted-foreground hover:text-primary flex items-center justify-center gap-2">
      <Plus size={16} />
      <span>Add Exercise</span>
    </button>
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Exercise to {workout.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid md:grid-cols-4 items-center gap-2">
            <Label htmlFor="exerciseName" className="text-right">
              Exercise name
            </Label>
            <div className=" md:col-span-3">
              <SearchDropdown />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !exerciseName.trim()}
              className="gap-1"
            >
              {loading ? "Adding..." : (
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