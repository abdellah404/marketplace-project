import useAuth from "../../hooks/useAuth.js";
import { Navigate, useNavigate } from "react-router";
import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
      phone: Yup.string()
      .matches(/^0[0-9]{9}$/, "Phone number must start with 0 and have 10 digits")
      .required("Phone number is required"),
      city : Yup.string().required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "afhyhe88OpRRRR3",
      name: "yassine",
      city: "kenitra",
      phone: "0642253987",
    },
  });

  const onSubmit = async (formData, event) => {
    event.preventDefault();
    console.log(formData);
    await register_new_user(formData)
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
            <div className="col-md-4 col-lg-4 mt-5">
              <div className="register-card p-4 border rounded">
                <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control shadow-none border-2 "                    placeholder="Enter your firstName"
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
                    className="form-control shadow-none border-2 "                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  <p className="text-danger mt-1">
                    {errors.email?.message || error?.errors?.email}
                  </p>
                </div>

               {/* {city} */}

               <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    className="form-control shadow-none border-2 "                    placeholder="Enter your location"
                    {...register("city")}
                  />
                  <p className="text-danger mt-1">
                    {errors.city?.message || error?.errors?.city}
                  </p>
                </div>

               {/* {phone} */}


               <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="form-control shadow-none border-2 "                    placeholder="Enter your email"
                    {...register("phone")}
                  />
                  <p className="text-danger mt-1">
                    {errors.phone?.message || error?.errors?.phone}
                  </p>
                </div>

               {/* {password} */}
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
                    {errors.password?.message || error?.errors?.password}
                  </p>
                </div>
                <button disabled={isSubmitting} type="submit" className="btn btn-dark w-100 mb-3">
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
