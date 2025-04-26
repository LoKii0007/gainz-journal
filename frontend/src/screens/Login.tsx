import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../lib/hooks';
import { login } from '../redux/slices/authSlice';
import axios from 'axios';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginInputs>({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<Partial<LoginInputs>>({});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData);
      
      dispatch(login({
        user: res.data.user,
        token: res.data.token,
      }));
      
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Here you would implement or redirect to Google OAuth
      // For now, we'll just show a placeholder message
      setError('Google login not implemented yet');
    } catch (err: any) {
      setError(err.message);
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
          <p className="text-muted-foreground mt-2">Log in to your account to continue</p>
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
                  validationErrors.email ? 'border-destructive' : 'border-input'
                } bg-background`}
              />
            </div>
            {validationErrors.email && (
              <p className="mt-1 text-sm text-destructive">{validationErrors.email}</p>
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
                  validationErrors.password ? 'border-destructive' : 'border-input'
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
              <p className="mt-1 text-sm text-destructive">{validationErrors.password}</p>
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
              'Log In'
            )}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-border w-full"></div>
            <span className="relative bg-background px-4 text-sm text-muted-foreground">
              or continue with
            </span>
          </div>
          
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-4 p-3 rounded-md border border-input bg-background flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
        
        <p className="text-center mt-6 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login; 