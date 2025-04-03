import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import WyzeLogo from "/images/logo/wyze.png"; 


// Define validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").min(5, "Email is required"),
  });
  
  // Define form type
  type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
  
  export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ForgotPasswordForm>({
      resolver: zodResolver(forgotPasswordSchema),
    });
  
    const onSubmit = async (data: ForgotPasswordForm) => {
      setLoading(true);
      try {
        console.log("Forgot Password Data:", data);
        // API call to send reset link
      } catch (error) {
        console.error("Error sending reset email", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-5 flex justify-start">
            <img src={WyzeLogo} alt="Wyze Logo" className="h-10 w-auto dark:invert" />
          </div>
  
          {/* Back to Sign In */}
          <div className="mb-5 sm:pt-10">
            <Link
              to="/signin"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ChevronLeftIcon className="size-5" /> Back to Sign In
            </Link>
          </div>
  
          <div className="flex flex-col w-full">
            <h1 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Enter your email address and we’ll send you a link to reset your password.
            </p>
  
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring focus:ring-indigo-500"
                  />
                  {errors.email && <p className="text-error-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
  
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }


