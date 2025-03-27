import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, EyeIcon, EyeCloseIcon } from "../../icons";
import WyzeLogo from "/images/logo/wyze.png"; 

// Define validation schema
const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Reset Password Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-5 flex justify-start">
          <img src={WyzeLogo} alt="Wyze Logo" className="h-10 w-auto dark:invert" />
        </div>

        <div className="mb-5 sm:pt-10">
          <Link to="/signin" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <ChevronLeftIcon className="size-5" /> Back to Sign In
          </Link>
        </div>

        <div className="flex flex-col w-full">
          <h1 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Enter a new password for your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    {...register("password")}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring focus:ring-indigo-500"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                  >
                    {showPassword ? <EyeCloseIcon className="size-5" /> : <EyeIcon className="size-5" />}
                  </span>
                </div>
                {errors.password && <p className="text-error-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring focus:ring-indigo-500"
                />
                {errors.confirmPassword && <p className="text-error-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

