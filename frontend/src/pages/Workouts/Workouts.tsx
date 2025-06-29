import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import WorkoutsList from "@/components/WorkoutsList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addWorkout, updateWorkout } from "@/redux/slices/workoutSlice";
import { addExercise } from "@/redux/slices/exerciseSlice";
import { addSet } from "@/redux/slices/setSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Workout, Exercise, Set } from "@/types/workout";

interface WorkoutResponse extends Omit<Workout, 'exerciseIds'> {
  exercises: (Exercise & { sets: Set[] })[];
}

const Workouts = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const workouts = useAppSelector((state) => state.workout.workouts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const fetchWorkouts = async () => {
    if (!user) return;
    if (Object.keys(workouts).length > 0) return;

    try {
      setLoading(true);
      const activeProfileId = user.currentProfileId;
      if (!activeProfileId) {
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${activeProfileId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Add workouts to store
      res.data.workouts.forEach((workout: WorkoutResponse) => {
        const { exercises, ...workoutData } = workout;
        const exerciseIds = exercises.map(e => e.id);
        
        dispatch(addWorkout({ ...workoutData, exerciseIds }));

        // Add exercises and sets
        exercises.forEach((exercise) => {
          const { sets, ...exerciseData } = exercise;
          dispatch(addExercise(exerciseData));

          sets.forEach((set) => {
            dispatch(addSet(set));
          });
        });
      });
    } catch (err: any) {
      toast.error(
        err.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutUpdate = (updatedWorkout: Workout) => {
    dispatch(updateWorkout(updatedWorkout));
  };

  const workoutIds = Object.keys(workouts);

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Workouts</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Workout</span>
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <WorkoutsList
          workoutIds={workoutIds}
          onWorkoutUpdate={handleWorkoutUpdate}
        />
      )}
    </div>
  );
};

export default Workouts;
