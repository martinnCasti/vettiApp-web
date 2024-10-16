"use client";

import { useState } from "react";
import api from "@/src/api"; // Adjust this to match your actual path
import { useRouter } from "next/navigation";
import cookie from "js-cookie";

// Define the SignInRequestBody interface
interface SignInRequestBody {
  email: string;
  password: string;
}

const SignIn = () => {
  const [form, setForm] = useState<SignInRequestBody>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Use Axios (api) to make the request for sign-in
      const response = await api.post("/user/login", form);
      console.log("User signed in successfully:", response.data);

      // Store the token in cookies
      const { access_token, refresh_token } = response.data;
      cookie.set("access_token", access_token);
      cookie.set("refresh_token", refresh_token);

      setSuccess(true);
      // Redirect to dashboard or another page
      router.push("/dashboard");
    } catch (err: any) {
      console.error(
        "Error signing in:",
        err.response ? err.response.data : err.message
      );
      setError(err.response ? err.response.data.message : "Error signing in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Sign In
        </h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 mb-4">Successfully signed in!</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
