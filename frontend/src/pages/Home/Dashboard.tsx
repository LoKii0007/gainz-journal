import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  addWorkout,
  updateWorkout,
} from "../../redux/slices/workoutSlice";
import { addExercise, removeExercise } from "../../redux/slices/exerciseSlice";
import { addSet } from "../../redux/slices/setSlice";
import { Workout, Exercise, Set as WorkoutSet } from "../../types/workout";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getDayOfWeek } from "../../lib/helpers";
import AddWorkoutDialog from "../../components/AddWorkoutDialog";
import ExerciseCard from "../../components/ExerciseCard";
import AddExerciseDialog from "../../components/AddExerciseDialog";
import DeleteDialog from "@/components/DeleteDialog";
import WorkoutsList from "@/components/WorkoutsList";
import { Skeleton } from "@/components/ui/skeleton";

interface WorkoutResponse extends Omit<Workout, 'exerciseIds'> {
  exercises: (Exercise & { sets: WorkoutSet[] })[];
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const workouts = useAppSelector((state) => state.workout.workouts);
  const exercises = useAppSelector((state) => state.exercise.exercises);
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null);
  const user = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const handleTodaysWorkout = useCallback((workouts: Record<string, Workout>) => {
    const today = getDayOfWeek(new Date());
    const todayWo = Object.values(workouts).find(
      (w: Workout) => w.day.toLowerCase() === today.toLowerCase()
    );
    setTodayWorkout(todayWo || null);
  }, []);

  const fetchWorkouts = async () => {
    if (!user) return;
    if (Object.keys(workouts).length > 0) return;
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

      // Add workouts to store
      res.data.workouts.forEach((workout: WorkoutResponse) => {
        const { exercises: workoutExercises, ...workoutData } = workout;
        const exerciseIds = workoutExercises.map(e => e.id);
        
        dispatch(addWorkout({ ...workoutData, exerciseIds }));

        // Add exercises and sets
        workoutExercises.forEach((exercise) => {
          const { sets, ...exerciseData } = exercise;
          dispatch(addExercise(exerciseData));

          sets.forEach((set) => {
            dispatch(addSet(set));
          });
        });
      });

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
      // Update the workout with the new exercise ID
      dispatch(updateWorkout({
        id: todayWorkout.id,
        exerciseIds: [...(todayWorkout.exerciseIds || []), newExercise.id]
      }));

      // Add the exercise to the store
      dispatch(addExercise(newExercise));
    }
  };

  const handleExerciseDeleted = (exerciseId: string) => {
    if (todayWorkout) {
      // Remove the exercise ID from the workout
      dispatch(updateWorkout({
        id: todayWorkout.id,
        exerciseIds: todayWorkout.exerciseIds.filter(id => id !== exerciseId)
      }));

      // Remove the exercise from the store
      dispatch(removeExercise(exerciseId));
    }
  };

  useEffect(() => {
    handleTodaysWorkout(workouts);
  }, [workouts, handleTodaysWorkout]);

  const handleWorkoutUpdate = (updatedWorkout: Workout) => {
    dispatch(updateWorkout(updatedWorkout));
  };

  const todayExercises = todayWorkout
    ? todayWorkout.exerciseIds?.map(id => exercises[id]).filter(Boolean) || []
    : [];

  const workoutIds = Object.keys(workouts);

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
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
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
                  {todayExercises.map((exercise, index) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onExerciseDeleted={handleExerciseDeleted}
                      index={index}
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
            <div className="rounded-lg border bg-card p-6 flex flex-col items-center justify-center space-y-4">
              <h2 className="text-xl font-semibold mb-2">
                No Workout Planned for Today
              </h2>
              <div>
                <img className="w-15" src={`/images/no-workout-${user.gender === null ? "male" : user.gender === "MALE" ? "male" : "female"}.png`} alt="No Workout" />
              </div>
              <AddWorkoutDialog />
            </div>
          )}
          {/* other workouts */}
          <div className="pb-6 px-2 flex flex-col items-center justify-center">
            <h2 className="w-full font-semibold mb-2 text-left">
              Other Workouts
            </h2>
            <WorkoutsList
              workoutIds={workoutIds}
              onWorkoutUpdate={handleWorkoutUpdate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
