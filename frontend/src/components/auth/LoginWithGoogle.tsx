import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function LoginWithGoogle() {
  const navigate = useNavigate();

  const loginCredentials = async (res: any) => {
    const decoded: any = jwtDecode(res.credential);
    if (!decoded) {
      toast.error("Google login failed. Please try again.");
    }

    const userData = {
      email: decoded.email,
      googleId: decoded.sub,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { email: userData.email, googleId: userData.googleId }
      );
      toast.success("User logged in Successfully");
      localStorage.setItem("proppedUpToken", response.data.token);
      navigate("/");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  const loginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <>
      <div className="google flex justify-center w-fit ">
        <GoogleLogin onSuccess={loginCredentials} onError={loginError} />
      </div>
    </>
  );
}
export default LoginWithGoogle;
