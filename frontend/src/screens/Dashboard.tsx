import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  setWorkouts,
  deleteExerciseFromWorkout,
} from "../redux/slices/workoutSlice";
import { Workout, Exercise } from "../types/workout";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getDayOfWeek } from "../lib/helpers";
import AddWorkoutDialog from "../components/AddWorkoutDialog";
import ExerciseCard from "../components/ExerciseCard";
import AddExerciseDialog from "../components/AddExerciseDialog";
import DeleteDialog from "@/components/DeleteDialog";
import WorkoutsList from "@/components/WorkoutsList";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const workouts = useAppSelector((state) => state.workout);
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null);
  const [todayExercises, setTodayExercises] = useState<Exercise[]>([]);
  const user = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const handleTodaysWorkout = useCallback((workouts: Workout[]) => {
    const today = getDayOfWeek(new Date());
    const todayWo = workouts.find(
      (w: Workout) => w.day.toLowerCase() === today.toLowerCase()
    );
    setTodayWorkout(todayWo || null);
    setTodayExercises(todayWo?.exercises || []);
  }, []);

  const fetchWorkouts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const activeProfileId = user.currentProfileId;
      if (
        !activeProfileId ||
        activeProfileId === "undefined" ||
        activeProfileId === null
      ) {
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${activeProfileId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      dispatch(setWorkouts(res.data.workouts));
      handleTodaysWorkout(res.data.workouts);
    } catch (err: any) {
      toast.error(
        err.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseAdded = (newExercise: Exercise) => {
    if (todayWorkout) {
      // Update the exercises list
      setTodayExercises((prev) => [...prev, newExercise]);

      // Update the workout object with the new exercise
      const updatedWorkout = {
        ...todayWorkout,
        exercises: [...(todayWorkout.exercises || []), newExercise],
      };
      setTodayWorkout(updatedWorkout);

      // Update the workouts in the redux store
      const updatedWorkouts = workouts.map((w: Workout) =>
        w.id === todayWorkout.id ? updatedWorkout : w
      );
      dispatch(setWorkouts(updatedWorkouts));
    }
  };

  const handleExerciseDeleted = (exerciseId: string) => {
    if (todayWorkout) {
      // Update the exercises list
      const updatedExercises = todayExercises.filter(
        (e) => e.id !== exerciseId
      );
      setTodayExercises(updatedExercises);

      // Update the workout object without the deleted exercise
      const updatedWorkout = {
        ...todayWorkout,
        exercises: todayWorkout.exercises.filter((e) => e.id !== exerciseId),
      };
      setTodayWorkout(updatedWorkout);

      // Update the redux store
      dispatch(
        deleteExerciseFromWorkout({ workoutId: todayWorkout.id, exerciseId })
      );
    }
  };

  useEffect(() => {
    handleTodaysWorkout(workouts);
  }, [workouts]);

  const handleWorkoutUpdate = (updatedWorkout: Workout) => {
    const updatedWorkouts = workouts.map((w) =>
      w.id === updatedWorkout.id ? updatedWorkout : w
    );
    dispatch(setWorkouts(updatedWorkouts));
  };

  return (
    <div className="space-y-6 max-w-screen-lg mx-auto p-2 md:p-4">
      <header className="flex justify-between items-center p-2 md:p-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {format(new Date(), "EEEE, MMMM d")}
          </p>
        </div>
        <AddWorkoutDialog />
      </header>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          {todayWorkout ? (
            <div className="rounded-lg border bg-card p-2 md:p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold capitalize">
                  {todayWorkout.title}
                </h2>
                <div className="flex items-center gap-2">
                  <DeleteDialog workoutId={todayWorkout.id} />
                  <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                    {todayWorkout.day}
                  </span>
                </div>
              </div>

              {todayExercises.length > 0 ? (
                <div className="space-y-3">
                  {todayExercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onExerciseDeleted={handleExerciseDeleted}
                    />
                  ))}

                  <AddExerciseDialog
                    workout={todayWorkout}
                    onExerciseAdded={handleExerciseAdded}
                  />
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    No exercises added yet
                  </p>
                  <AddExerciseDialog
                    workout={todayWorkout}
                    onExerciseAdded={handleExerciseAdded}
                    trigger={
                      <button
                        id="add-first-exercise-btn"
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground flex items-center gap-2 mx-auto"
                      >
                        <Plus size={16} />
                        <span>Add First Exercise</span>
                      </button>
                    }
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-2">
                No Workout Planned for Today
              </h2>
              <p className="text-muted-foreground mb-6">
                Start your fitness journey by adding a workout for today
              </p>
              <AddWorkoutDialog />
            </div>
          )}
          {/* other workouts */}
          <div className="pb-6 px-2 flex flex-col items-center justify-center">
            <h2 className="w-full font-semibold mb-2 text-left">Other Workouts</h2>
            <WorkoutsList
              workouts={workouts}
              onWorkoutUpdate={handleWorkoutUpdate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
