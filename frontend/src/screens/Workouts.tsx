import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import WorkoutsList from "@/components/WorkoutsList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setWorkouts } from "@/redux/slices/workoutSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Workout } from "@/types/workout";

const Workouts = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { token } = useAppSelector((state) => state.auth);
  const workouts = useAppSelector((state) => state.workout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const fetchWorkouts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const activeProfileId = localStorage.getItem("currentProfileId");
      if (!activeProfileId) {
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${activeProfileId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setWorkouts(res.data.workouts));
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
    const updatedWorkouts = workouts.map((w) =>
      w.id === updatedWorkout.id ? updatedWorkout : w
    );
    dispatch(setWorkouts(updatedWorkouts));
  };

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
          workouts={workouts}
          onWorkoutUpdate={handleWorkoutUpdate}
        />
      )}
    </div>
  );
};

export default Workouts;
