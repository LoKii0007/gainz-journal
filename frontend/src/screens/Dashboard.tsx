import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setWorkouts } from "../redux/slices/workoutSlice";
import { Workout, Exercise } from "../types/workout";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getDayOfWeek } from "../lib/helpers";
import AddWorkoutDialog from "../components/AddWorkoutDialog";
import ExerciseCard from "../components/ExerciseCard";
import AddExerciseDialog from "../components/AddExerciseDialog";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const workouts = useAppSelector((state) => state.workout.workouts);
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null);
  const [todayExercises, setTodayExercises] = useState<Exercise[]>([]);
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const fetchWorkouts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${
          user.profiles[0].id
        }`,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      dispatch(setWorkouts(res.data.workouts));

      // Find today's workout
      const today = getDayOfWeek(new Date());
      const todayWo = res.data.workouts.find(
        (w: Workout) => w.day.toLowerCase() === today.toLowerCase()
      );
      if (todayWo) {
        setTodayWorkout(todayWo);
        setTodayExercises(todayWo.exercises || []);
      }
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
      const updatedWorkouts = workouts.map((w) =>
        w.id === todayWorkout.id ? updatedWorkout : w
      );
      dispatch(setWorkouts(updatedWorkouts));
    }
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

        {user && (
          <div className="flex items-center gap-2">
            <AddWorkoutDialog />
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {user.profiles[0]?.imageUrl ? (
                <img
                  src={user.profiles[0]?.imageUrl}
                  alt={user.profiles[0]?.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-medium">
                  {user.profiles[0]?.name?.charAt(0)}
                </span>
              )}
            </div>
          </div>
        )}
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
                <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                  {todayWorkout.day}
                </span>
              </div>

              {todayExercises.length > 0 ? (
                <div className="space-y-3">
                  {todayExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
