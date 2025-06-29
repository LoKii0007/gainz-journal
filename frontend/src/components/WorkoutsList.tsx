import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Workout, Exercise, Days } from "@/types/workout";
import AddExerciseDialog from "./AddExerciseDialog";
import ExerciseCard from "./ExerciseCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeExercise } from "@/redux/slices/exerciseSlice";

interface WorkoutsListProps {
  workoutIds: string[];
  onWorkoutUpdate?: (updatedWorkout: Workout) => void;
}

// Helper function to get day index starting from Monday
const getDayIndex = (day: Days): number => {
  const daysOrder = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
  ];
  return daysOrder.indexOf(day);
};

const WorkoutsList: React.FC<WorkoutsListProps> = ({ workoutIds, onWorkoutUpdate }) => {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(state => state.workout.workouts);
  const exercises = useAppSelector(state => state.exercise.exercises);

  const handleExerciseAdded = (workoutId: string, newExercise: Exercise) => {
    if (onWorkoutUpdate) {
      const workout = workouts[workoutId];
      if (workout) {
        const updatedWorkout = {
          ...workout,
          exerciseIds: [...(workout.exerciseIds || []), newExercise.id]
        };
        onWorkoutUpdate(updatedWorkout);
      }
    }
  };
  
  const handleExerciseDeleted = (workoutId: string, exerciseId: string) => {
    dispatch(removeExercise(exerciseId));
    
    if (onWorkoutUpdate) {
      const workout = workouts[workoutId];
      if (workout) {
        const updatedWorkout = {
          ...workout,
          exerciseIds: workout.exerciseIds.filter(id => id !== exerciseId)
        };
        onWorkoutUpdate(updatedWorkout);
      }
    }
  };

  // Sort workouts by day
  const sortedWorkoutIds = [...workoutIds].sort((a, b) => {
    const workoutA = workouts[a];
    const workoutB = workouts[b];
    if (!workoutA || !workoutB) return 0;
    return getDayIndex(workoutA.day) - getDayIndex(workoutB.day);
  });

  return (
    <Accordion type="single" collapsible className="w-full">
      {sortedWorkoutIds.map((workoutId) => {
        const workout = workouts[workoutId];
        if (!workout) return null;
        
        const workoutExercises = workout.exerciseIds?.map(id => exercises[id]).filter(Boolean) || [];

        return (
          <AccordionItem key={workout.id} value={workout.id} className="border-b">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center">
                  <div className="font-medium">{workout.title}</div>
                  <div className="ml-2 px-2 py-0.5 text-xs rounded-full bg-zinc-900 text-zinc-100">
                    {workout.day}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {workoutExercises.length} exercises
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {workoutExercises.length > 0 ? (
                  <>
                    {workoutExercises.map((exercise, index) => (
                      <ExerciseCard 
                        key={exercise.id} 
                        exercise={exercise} 
                        index={index}
                        onExerciseDeleted={(exerciseId) => handleExerciseDeleted(workout.id, exerciseId)}
                      />
                    ))}
                  </>
                ) : (
                  <div className="text-center py-3 text-muted-foreground">
                    No exercises added yet
                  </div>
                )}
                
                <AddExerciseDialog 
                  workout={workout} 
                  onExerciseAdded={(exercise) => handleExerciseAdded(workout.id, exercise)}
                  trigger={
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <Plus size={14} className="mr-1" />
                      Add Exercise
                    </Button>
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default WorkoutsList; 