import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice.js";
import useAuth from "../../hooks/useAuth.js";
import { Navigate, useNavigate } from "react-router";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Outlet } from "react-router";
import useTheme from "../../hooks/useTheme.js";

export function Login() {
  const { error, login , isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Access the isDarkMode state

  const userSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "afhyhe88OpRRRR3",
    },
  });

  const onSubmit = async (formData, event) => {
    event.preventDefault();
    console.log(formData);
    await login(formData)
      .then((result) => {
        navigate("/app");
      })
      .catch((err) => {})
      
  };

  return (
    <>
      {isAuthenticated && <Navigate to="/app"></Navigate>}
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mt-5">
              <div className="login-card p-4 border rounded">
                <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-control shadow-none border-2 "                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  <p className="text-danger mt-1">
                    {" "}
                    {error?.errors?.email || errors.email?.message}
                  </p>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control shadow-none border-2 "                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <p className="text-danger mt-1">
                    {" "}
                    {error?.errors?.password || errors.password?.message}
                  </p>
                </div>
                <button
                  type="submit"
                  className={`btn w-100 mb-3 ${
                    isDarkMode ? "btn-dark-purple" : "btn-primary"
                  }`} // Dynamic button styles
                  style={{
                    backgroundColor: isDarkMode ? "#6a0dad" : "black", // Dark purple for dark mode
                    color: isDarkMode ? "#ffffff" : "white",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <p className="mt-4 text-center">
                  New here?{" "}
                  <a href="/app/register" className="text-primary">
                    Register Here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
