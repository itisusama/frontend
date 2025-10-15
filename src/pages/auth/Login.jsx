import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { users } from "../../data/users";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

   useEffect(() => {
    // If already logged in, redirect to profile
    const storedUser = localStorage.getItem("user");
    if (storedUser) navigate("/profile");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
      // ✅ Save user in localStorage
      await login(foundUser);

      // ✅ Redirect to profile
      navigate("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    alert("Continue with Google clicked!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="text-error text-sm text-center">{error}</p>
            )}

            <button type="submit" className="btn btn-primary w-full mt-2">
              <LogIn className="w-4 h-4 mr-1" /> Login
            </button>

            <div className="divider">or</div>

            <button
              type="button"
              className="btn btn-outline w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="w-4 h-4" /> Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
