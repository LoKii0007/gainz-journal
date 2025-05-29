import { Check, ChevronsUpDown, Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { allGymExercises } from "@/lib/constants";
import { useEffect, useState, useMemo, useRef } from "react";
import { Button } from "./ui/button";

export function SearchDropdown({
  exerciseName,
  dropdownOpen,
  setDropdownOpen,
  setExerciseName,
}: {
  exerciseName: {label: string, value: string};
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  setExerciseName: (value: {label: string, value: string}) => void;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Reset search when dropdown closes
  useEffect(() => {
    if (!isSelectOpen) {
      setSearchValue("");
    }
  }, [isSelectOpen]);

  // Sync the internal state with parent
  useEffect(() => {
    setIsSelectOpen(dropdownOpen);
  }, [dropdownOpen]);

  // Notify parent when internal state changes
  useEffect(() => {
    setDropdownOpen(isSelectOpen);
  }, [isSelectOpen, setDropdownOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    if (isSelectOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelectOpen]);

  // Filter exercises based on search
  const filteredExercises = useMemo(() => {
    return allGymExercises.filter((exercise) =>
      exercise.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const clearSearch = () => {
    setSearchValue("");
  };

  const handleTriggerClick = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleExerciseSelect = (exerciseValue: {label: string, value: string}) => {
    setExerciseName(exerciseValue);
    setIsSelectOpen(false);
  };

  useEffect(() => {
    console.log("exerciseName", searchValue);
  }, [searchValue]);

  const handleAddCustomExercise = () => {
    setIsSelectOpen(false);
    setExerciseName({label: searchValue, value: searchValue});
  };

  return (
    <div className="relative w-full flex justify-center">
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="w-full border border-gray-200 rounded-md p-1 flex justify-between text-sm items-center cursor-pointer bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTriggerClick();
          }
        }}
      >
        {exerciseName.label || "Select exercise..."}
        <ChevronsUpDown className="w-4 h-4" />
      </div>

      {/* Dropdown Content */}
      {isSelectOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[300px] transition-all duration-200"
        >
          <div className="max-h-[300px] overflow-y-auto">
            {/* Search Input */}
            <div
              className="flex items-center border-b px-3 sticky top-0 bg-white z-10"
              onKeyDown={(e) => e.stopPropagation()}
            >
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                placeholder="Search exercise..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-0 shadow-none focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                autoFocus
              />
              {searchValue && (
                <button
                  onClick={clearSearch}
                  onMouseDown={(e) => e.preventDefault()}
                  className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Exercise List */}
            {filteredExercises.length === 0 ? (
              <div className="py-4 text-center text-sm text-gray-500 px-3">
                <p>No exercise found.</p>
                <Button onClick={()=>handleAddCustomExercise()} type="button" variant="outline" size="sm" className="mt-3 w-full mx-auto">
                  <Plus className="w-4 h-4 mr-2" /> Add custom
                </Button>
              </div>
            ) : (
              <div>
                {filteredExercises.map((exercise) => (
                  <div
                    key={exercise.value}
                    onClick={() => handleExerciseSelect(exercise)}
                    className={`cursor-pointer w-full text-sm md:text-base text-left flex justify-between items-center px-3 py-1 md:hover:bg-gray-100 transition-colors ${
                      exercise.value === exerciseName.value
                        ? "font-semibold bg-gray-50"
                        : ""
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleExerciseSelect(exercise);
                      }
                    }}
                    tabIndex={0}
                    role="option"
                    aria-selected={exercise.value === exerciseName.value}
                  >
                    <span>{exercise.label}</span>
                    {exercise.value === exerciseName.value && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
