import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlusIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addProfile } from "@/redux/slices/profileSlice";

const AddProfileDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const onSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a profile name");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
        {
          name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(addProfile(res.data.profile));
      
      toast.success("Profile created successfully");
      setOpen(false);
      setName("");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full flex items-center gap-2">
          <UserPlusIcon size={16} />
          <span>Add New Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Profile</DialogTitle>
          <DialogDescription>
            Create a new profile to track different workout routines
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter profile name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit();
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={onSubmit} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Creating..." : "Create Profile"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProfileDialog; 