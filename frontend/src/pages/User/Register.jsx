import useAuth from "../../hooks/useAuth.js";
import { Navigate, useNavigate } from "react-router";
import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Outlet } from "react-router";

export function Register() {
  const { error, register_new_user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "afhyhe88OpRRRR3",
      name: "yassine",
    },
  });

  const onSubmit = (formData, event) => {
    event.preventDefault();
    console.log(formData);
    register_new_user(formData)
      .then((result) => {
        navigate("/app");
      })
      .catch((err) => {});
  };

  return (
    <>
      {isAuthenticated && <Navigate to="/app"></Navigate>}
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-md-4 col-lg-4">
              <div className="register-card p-4 border rounded">
                <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    placeholder="Enter your firstName"
                    {...register("name")}
                  />
                  <p className="text-danger mt-1">
                    {errors.name?.message || error?.errors?.name}
                  </p>
                </div>

                {/* email  */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  <p className="text-danger mt-1">
                    {errors.email?.message || error?.errors?.email}
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <p className="text-danger mt-1">
                    {errors.password?.message || error?.errors?.password}
                  </p>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Register
                </button>
                <p className="mt-4 text-center">
                  Already a member?{" "}
                  <a href="/app/login" className="text-primary">
                    Login
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
