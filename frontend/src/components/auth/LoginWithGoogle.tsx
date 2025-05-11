import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { login } from "@/redux/slices/authSlice";
import { setProfiles } from "@/redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginWithGoogle({
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
      }

      const userData = {
        email: decoded.email,
        password: decoded.sub,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        userData
      );

      dispatch(
        login({
          user: response.data.user,
          token: res.data.token,
          currentProfileId: res.data.currentProfileId,
        })
      );
      dispatch(setProfiles(res.data.profiles));

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
      <button disabled={loading} className="google flex justify-center w-fit ">
        <GoogleLogin onSuccess={loginCredentials} onError={loginError} />
      </button>
    </>
  );
}
export default LoginWithGoogle;
