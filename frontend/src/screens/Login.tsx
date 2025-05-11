import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../lib/hooks";
import { login } from "../redux/slices/authSlice";
import axios from "axios";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import LoginWithGoogle from "@/components/auth/LoginWithGoogle";
import { setProfiles } from "@/redux/slices/profileSlice";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginInputs>({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Partial<LoginInputs>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (validationErrors[name as keyof LoginInputs]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Partial<LoginInputs> = {};
        err.errors.forEach((error) => {
          const path = error.path[0] as keyof LoginInputs;
          errors[path] = error.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData
      );

      dispatch(
        login({
          user: res.data.user,
          token: res.data.token,
          currentProfileId: res.data.currentProfileId,
        })
      );
      dispatch(setProfiles(res.data.profiles));

      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-4">
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Log in to your account to continue
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className={`w-full p-3 pl-10 rounded-md border ${
                  validationErrors.email ? "border-destructive" : "border-input"
                } bg-background`}
              />
            </div>
            {validationErrors.email && (
              <p className="mt-1 text-sm text-destructive">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full p-3 pl-10 rounded-md border ${
                  validationErrors.password
                    ? "border-destructive"
                    : "border-input"
                } bg-background`}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
            {validationErrors.password && (
              <p className="mt-1 text-sm text-destructive">
                {validationErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-md bg-primary text-primary-foreground font-medium"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="space-y-4 my-4">
          <div className="grid grid-cols-3 items-center justify-center">
            <div className="border-t border-border w-full"></div>
            <span className="relative bg-background px-4 text-sm text-center text-muted-foreground">
              or continue with
            </span>
            <div className="border-t border-border w-full"></div>
          </div>

          <div className="grid items-center justify-center">
            <LoginWithGoogle loading={loading} setLoading={setLoading} />
          </div>
        </div>

        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
