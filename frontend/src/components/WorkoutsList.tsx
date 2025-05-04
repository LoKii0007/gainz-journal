import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Workout, Exercise } from "@/types/workout";
import AddExerciseDialog from "./AddExerciseDialog";
import ExerciseCard from "./ExerciseCard";
import { useAppDispatch } from "@/lib/hooks";
import { deleteExerciseFromWorkout } from "@/redux/slices/workoutSlice";

interface WorkoutsListProps {
  workouts: Workout[];
  onWorkoutUpdate?: (updatedWorkout: Workout) => void;
}

const WorkoutsList: React.FC<WorkoutsListProps> = ({ workouts, onWorkoutUpdate }) => {
  const dispatch = useAppDispatch();

  const handleExerciseAdded = (workoutId: string, newExercise: Exercise) => {
    if (onWorkoutUpdate) {
      const workout = workouts.find(w => w.id === workoutId);
      if (workout) {
        const updatedWorkout = {
          ...workout,
          exercises: [...(workout.exercises || []), newExercise]
        };
        onWorkoutUpdate(updatedWorkout);
      }
    }
  };
  
  const handleExerciseDeleted = (workoutId: string, exerciseId: string) => {
    dispatch(deleteExerciseFromWorkout({ workoutId, exerciseId }));
    
    if (onWorkoutUpdate) {
      const workout = workouts.find(w => w.id === workoutId);
      if (workout) {
        const updatedWorkout = {
          ...workout,
          exercises: workout.exercises.filter(e => e.id !== exerciseId)
        };
        onWorkoutUpdate(updatedWorkout);
      }
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {workouts?.map((workout) => (
        <AccordionItem key={workout.id} value={workout.id} className="border-b">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex items-center">
                <div className="font-medium">{workout.title}</div>
                <div className="ml-2 px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                  {workout.day}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {workout.exercises ? workout.exercises.length : 0} exercises
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {workout.exercises && workout.exercises.length > 0 ? (
                <>
                  {workout.exercises.map((exercise) => (
                    <ExerciseCard 
                      key={exercise.id} 
                      exercise={exercise} 
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
      ))}
    </Accordion>
  );
};

export default WorkoutsList; 