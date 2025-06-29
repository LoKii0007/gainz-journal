import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { login } from "@/redux/slices/authSlice";
import { setProfiles } from "@/redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Profile } from "@/types/user";

function SignupWithGoogle({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginCredentials = async (res: any) => {
    try {
      const decoded: any = jwtDecode(res.credential);
      if (!decoded) {
        toast.error("Google login failed. Please try again.");
        return;
      }

      const registerData = {
        email: decoded.email,
        password: decoded.sub,
        name: decoded.name,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        registerData
      );

      dispatch(
        login({
          user: response.data.user,
          token: response.data.token,
          currentProfileId: response.data.currentProfileId,
        })
      );

      const profiles = response.data.profiles as Profile[];
      dispatch(setProfiles(profiles));

      localStorage.removeItem("workouts");
      localStorage.removeItem("exercises");
      localStorage.removeItem("sets");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Google login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const loginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <>
      <button disabled={loading} className="google flex justify-center w-fit">
        <GoogleLogin onSuccess={loginCredentials} onError={loginError} />
      </button>
    </>
  );
}

export default SignupWithGoogle;
