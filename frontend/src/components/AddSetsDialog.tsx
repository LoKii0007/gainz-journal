import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Plus, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import { Exercise, Set } from "@/types/workout";

interface AddSetsDialogProps {
  exercise: Exercise;
  onSetsAdded?: (sets: Set[]) => void;
}

const AddSetsDialog: React.FC<AddSetsDialogProps> = ({ exercise, onSetsAdded }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [setInputs, setSetInputs] = useState<Array<{ reps: number, weight: number }>>([{ reps: 0, weight: 0 }]);
  
  const { token } = useAppSelector((state) => state.auth);
  
  // Add another set input field
  const addSetInput = useCallback(() => {
    setSetInputs((prev) => [...prev, { reps: 0, weight: 0 }]);
  }, []);
  
  // Remove a set input field
  const removeSetInput = useCallback((index: number) => {
    setSetInputs((prev) => prev.filter((_, i) => i !== index));
  }, []);
  
  // Update a specific set input field
  const updateSetInput = useCallback((index: number, field: 'reps' | 'weight', value: number) => {
    setSetInputs((prev) => 
      prev.map((set, i) => 
        i === index ? { ...set, [field]: value } : set
      )
    );
  }, []);
  
  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Filter out invalid sets (where reps or weight is 0)
      const validSets = setInputs.filter(set => set.reps > 0 && set.weight > 0);
      
      if (validSets.length === 0) {
        toast.error("Please add at least one valid set with reps and weight");
        return;
      }
      
      try {
        setLoading(true);
        
        // Create multiple sets for the exercise
        const createdSets: Set[] = [];
        
        for (const set of validSets) {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/set`,
            {
              reps: set.reps,
              weight: set.weight,
              exerciseId: exercise.id,
              profileId: localStorage.getItem("currentProfileId"),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          
          createdSets.push(response.data.set);
        }
        
        toast.success(`${validSets.length} sets added successfully!`);
        
        // Reset form
        setSetInputs([{ reps: 0, weight: 0 }]);
        setIsOpen(false);
        
        // Callback to parent component if provided
        if (onSetsAdded) {
          onSetsAdded(createdSets);
        }
      } catch (error: any) {
        console.error("Error adding sets:", error);
        toast.error(
          error.response?.data?.message || "Failed to add sets"
        );
      } finally {
        setLoading(false);
      }
    },
    [setInputs, exercise.id, token, onSetsAdded]
  );
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Sets</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Sets for {exercise.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="space-y-3">
              {setInputs.map((setInput, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`reps-${index}`} className="text-xs">
                        Reps {index + 1}
                      </Label>
                      <Input
                        id={`reps-${index}`}
                        type="number"
                        min="1"
                        placeholder="Reps"
                        value={setInput.reps || ''}
                        onChange={(e) =>
                          updateSetInput(index, 'reps', parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`weight-${index}`} className="text-xs">
                        Weight {index + 1} (kg)
                      </Label>
                      <Input
                        id={`weight-${index}`}
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="Weight"
                        value={setInput.weight || ''}
                        onChange={(e) =>
                          updateSetInput(index, 'weight', parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mt-5"
                      onClick={() => removeSetInput(index)}
                    >
                      <X size={16} className="text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={addSetInput}
              >
                <Plus size={16} className="mr-1" /> Add Another Set
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Sets"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddSetsDialog; 