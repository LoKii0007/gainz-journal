import React, { useMemo, useState } from "react";
import { Exercise, Set, WeightType, WeightUnit } from "@/types/workout";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import AddSetsDialog from "./AddSetsDialog";
import {
  Dumbbell,
  Edit,
  Trash,
  Check,
  AlertTriangle,
  HistoryIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import toast from "react-hot-toast";
import { groupBy } from "lodash";
import { format } from "date-fns";
import {
  weightMeasurements,
  weightUnits,
  allGymExercises,
} from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getColorByIndex } from "@/utils/helper";
import { addSet, removeSet, updateSet } from "@/redux/slices/setSlice";

interface ExerciseCardProps {
  exercise: Exercise;
  onExerciseDeleted?: (exerciseId: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps & { index: number }> = ({
  exercise: initialExercise,
  onExerciseDeleted,
  index,
}) => {
  const exercise = useMemo<Exercise>(() => initialExercise, []);
  const [editingSet, setEditingSet] = useState<Set | null>(null);
  const [deletingSet, setDeletingSet] = useState<Set | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteExerciseDialogOpen, setIsDeleteExerciseDialogOpen] =
    useState(false);
  const [newReps, setNewReps] = useState(0);
  const [newWeight, setNewWeight] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const sets = useAppSelector((state) => state.set.sets);

  const exerciseSets = useMemo(() => {
    return Object.values(sets).filter(
      (set) => set.exerciseId === exercise.id
    ) as Set[];
  }, [sets, exercise.id]);

  const dayStart = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  // Handle sets being added
  const handleSetsAdded = (newSets: Set[]) => {
    newSets.forEach((set) => {
      dispatch(addSet(set));
    });
  };

  // Open edit dialog for a set
  const openEditDialog = (set: Set) => {
    setEditingSet(set);
    setNewReps(set.reps);
    setNewWeight(set.weight);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog for a set
  const openDeleteDialog = (set: Set) => {
    setDeletingSet(set);
    setIsDeleteDialogOpen(true);
  };

  // Update set
  const handleUpdateSet = async () => {
    if (!editingSet) return;

    try {
      setLoading(true);

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/set/${editingSet.id}`,
        {
          reps: newReps,
          weight: newWeight,
          unit: editingSet.unit,
          weightType: editingSet.weightType,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Update set in Redux store
      dispatch(updateSet(response.data.set));

      toast.success("Set updated successfully");
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update set");
    } finally {
      setLoading(false);
    }
  };

  // Delete set
  const handleDeleteSet = async () => {
    if (!deletingSet) return;

    try {
      setLoading(true);

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/set/${deletingSet.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Remove set from Redux store
      dispatch(removeSet(deletingSet.id));

      toast.success("Set deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete set");
    } finally {
      setLoading(false);
    }
  };

  // Delete exercise
  const handleDeleteExercise = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/exercise/${exercise.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Delete all associated sets
      exerciseSets.forEach((set) => {
        dispatch(removeSet(set.id));
      });

      toast.success("Exercise deleted successfully");
      setIsDeleteExerciseDialogOpen(false);

      // Notify parent component
      if (onExerciseDeleted) {
        onExerciseDeleted(exercise.id);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete exercise");
    } finally {
      setLoading(false);
    }
  };

  const setsHistory = useMemo(() => {
    const filteredSets = exerciseSets.filter(
      (s: Set) => new Date(s.createdAt) < dayStart
    );

    // Group sets by date string (e.g., '2025-05-03')
    const groupedByDay = groupBy(filteredSets, (s: Set) => {
      const date = new Date(s.createdAt);
      return date.toISOString().split("T")[0]; // formats to YYYY-MM-DD
    });

    // Convert to nested array of sets grouped by day and sort by date descending
    return Object.entries(groupedByDay)
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateB).getTime() - new Date(dateA).getTime()
      )
      .map(([_, sets]) => sets);
  }, [exerciseSets, dayStart]);

  const formatWeight = (set: Set) => {
    const weightType =
      set.weightType === WeightType.PER_SIDE ? "/Side" : "Total";
    return `${set.weight} ${set.unit.toLowerCase()} ${weightType}`;
  };

  const getExerciseName = () => {
    const exerciseName: any = allGymExercises.find(
      (e) => e.value === exercise.name
    );
    return exerciseName ? exerciseName.label : exercise.name;
  };

  return (
    <>
      <Card className={`w-full ${getColorByIndex(index)}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-medium flex items-center mb-0">
            <Dumbbell className="mr-2 h-5 w-5" />
            {getExerciseName()}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => setIsDeleteExerciseDialogOpen(true)}
            >
              <Trash size={16} />
            </Button>
            <AddSetsDialog exercise={exercise} onSetsAdded={handleSetsAdded} />
          </div>
        </CardHeader>
        <CardContent>
          {exerciseSets.length > 0 ? (
            <div className="space-y-1">
              <div className="grid grid-cols-12 text-xs text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Reps</div>
                <div className="col-span-4">Weight</div>
                <div className="col-span-4">Actions</div>
              </div>
              {exerciseSets
                .filter((s) => new Date(s.createdAt) > dayStart)
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((set, index) => (
                  <div
                    key={set.id}
                    className="grid grid-cols-12 text-sm py-1.5 border-b last:border-0 items-center"
                  >
                    <div className="col-span-1">{index + 1}</div>
                    <div className="col-span-3">{set.reps}</div>
                    <div className="col-span-4">{formatWeight(set)}</div>
                    <div className="col-span-4 flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs flex items-center"
                        onClick={() => openEditDialog(set)}
                      >
                        <Edit size={14} className="mr-1" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs flex items-center text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => openDeleteDialog(set)}
                      >
                        <Trash size={14} className="mr-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              {setsHistory.map((setOfDay) => (
                <React.Fragment key={setOfDay[0].createdAt}>
                  <div className="text-sm text-muted-foreground py-2 mb-0 text-center flex items-center gap-2">
                    <HistoryIcon size={16} />
                    <span>
                      {format(new Date(setOfDay[0].createdAt), "MMM d, yyyy")}
                    </span>
                  </div>

                  {setOfDay
                    .sort(
                      (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                    )
                    .map((set, index) => (
                      <div key={set.id}>
                        <div className="grid grid-cols-12 text-sm py-1.5 border-b last:border-0 items-center">
                          <div className="col-span-1">{index + 1}</div>
                          <div className="col-span-3">{set.reps}</div>
                          <div className="col-span-4">{formatWeight(set)}</div>
                        </div>
                      </div>
                    ))}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground py-2 text-center">
              No sets yet. Add your first set!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Set Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Set</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-reps">Reps</Label>
                <Input
                  id="edit-reps"
                  type="number"
                  min="1"
                  value={newReps}
                  onChange={(e) => setNewReps(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="edit-weight">Weight</Label>
                <Input
                  id="edit-weight"
                  type="number"
                  min="0"
                  step="0.5"
                  value={newWeight}
                  onChange={(e) =>
                    setNewWeight(parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Weight Type</Label>
                <Select
                  value={editingSet?.weightType}
                  onValueChange={(value) =>
                    setEditingSet((prev) =>
                      prev ? { ...prev, weightType: value as WeightType } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Weight type" />
                  </SelectTrigger>
                  <SelectContent>
                    {weightMeasurements.map((measurement) => (
                      <SelectItem
                        key={measurement.value}
                        value={measurement.value}
                      >
                        {measurement.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Unit</Label>
                <Select
                  value={editingSet?.unit}
                  onValueChange={(value) =>
                    setEditingSet((prev) =>
                      prev ? { ...prev, unit: value as WeightUnit } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {weightUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateSet}
              disabled={loading || newReps <= 0 || newWeight <= 0}
              className="gap-1"
            >
              {loading ? (
                "Updating..."
              ) : (
                <>
                  <Check size={16} />
                  Update
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Set Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Set</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p>Are you sure you want to delete this set?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Reps: {deletingSet?.reps} | Weight: {deletingSet?.weight} kg
            </p>
            <p className="text-sm text-red-500 mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSet}
              disabled={loading}
              className="gap-1"
            >
              {loading ? (
                "Deleting..."
              ) : (
                <>
                  <Trash size={16} />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Exercise Dialog */}
      <Dialog
        open={isDeleteExerciseDialogOpen}
        onOpenChange={setIsDeleteExerciseDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle size={18} />
              Delete Exercise
            </DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p>
              Are you sure you want to delete the exercise{" "}
              <span className="font-semibold">
                {allGymExercises.find((e) => e.value === exercise.name)
                  ?.label || exercise.name}
              </span>
              ?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This will permanently delete all {exerciseSets.length} sets
              associated with this exercise.
            </p>
            <p className="text-sm text-red-500 mt-2 font-medium">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteExerciseDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteExercise}
              disabled={loading}
              className="gap-1"
            >
              {loading ? (
                "Deleting..."
              ) : (
                <>
                  <Trash size={16} />
                  Delete Exercise
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExerciseCard;
