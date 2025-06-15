import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthStore } from "../store/authStore";

interface FormValues {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  balance: number;
  createdAt: string;
}

interface LoginResponse {
  user: User;
}

export default function LoginForm() {
  const login = AuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const storeState = (user: User) => {
    if (user) {
      login(user);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;
    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:4000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 201) {
        const user = res.data?.user;
        storeState(user);
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      throw new Error(`Error logging in: ${error}`);
    }
  };

  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-gray-900 dark:text-gray-100 rounded-xl shadow-xl p-8 w-full transition-all duration-300">
      <h2 className="text-3xl font-bold text-center text-indigo-500 mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="e.g. johndoe@example.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
        >
          Login
        </button>
      </form>

      {/* Navigation Link */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-300">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-400 hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
