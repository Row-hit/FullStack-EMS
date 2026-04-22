import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const roleConfig = {
  admin: {
    role: "admin",
    title: "Admin portal",
    subtitle: "Sign in to manage the organization",
  },
  employee: {
    role: "employee",
    title: "Employee Portal",
    subtitle: "sign in to access your account",
  },
};
const LoginForm = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const config = roleConfig[role];

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => setLoading(false), 2000);
    navigate("/", { state: { role, user: data } });
  };

  if (!config) return <Navigate to={"/login"} replace />;
  return (
    <div className="flex-1 flex justify-center items-center p-6 sm:p-12 bg-[var(--bg)]">
      <div className="w-full max-w-md animate-fade-in">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-[var(--text-main)]  hover:text-[var(--text-sec)]  text-sm mb-10 transition-colors"
        >
          <ArrowLeftIcon size={16} /> Back to portals
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium text-[var(--text-main)] ">
            {config.title}
          </h1>
          <p className="text-[var(--text-sec)] text-sm sm:text-base mt-2">
            {config.subtitle}
          </p>
        </div>
        <div>
          {isSubmitted && Object.values(errors).length > 0 && (
            <div className="mb-6 p-4 bg-[var(--bg)] border border-rose-200 text-[var(--text-main)] text-sm rounded-xl flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              {Object.values(errors)[0]?.message}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                Email address
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="Enter Email here..."
                className="text-[var(--text-main)] bg-[var(--bg-sec)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="••••••••"
                  className="pr-11  text-[var(--text-main)] bg-[var(--bg-sec)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-sec)] hover:text-[var(--text-main)] transition-colors"
                >
                  {" "}
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50   transition-all duration-200 shadow-lg shadow-indigo-500/ active:scale-[0.98] flex items-center justify-center"
            >
              {loading ? (
                <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
