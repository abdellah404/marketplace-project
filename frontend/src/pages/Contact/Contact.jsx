import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export function Contact() {


  const { token } = useAuth();  


  // Validation schema for fullname, email, and message
  const contactSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  // Send to EmailJS and to admin chat
 const onSubmit = async (formData, event) => {
  event.preventDefault();
  try {
    // 1. Send to EmailJS
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "service_54n0yal",
        template_id: "template_vmad4j1",
        user_id: "4Xb_Dzq0q4Knazi_K",
        template_params: {
          from_name: formData.fullname,
          reply_to: formData.email,
          message: formData.message,
        },
      }),
    });

    if (response.ok) {
      toast.success("Message sent successfully!");
      event.target.reset();
      reset();

      // 2. Try to send to admin chat, but don't alert user if it fails
      try {
        await axios.post(
          "http://localhost:8000/api/chat/send",
          {
            receiver_id: 13, // admin user id
            message: `${formData.message}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (chatError) {
        // Optionally log or toast a warning, but don't show alert
        console.warn("Message sent to email, but failed to send to admin chat.");
      }
    } else {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    alert("There was an error sending your message. Please try again later.");
  }
};

  return (
    <>
      <form action="post" onSubmit={handleSubmit(onSubmit)} id="contact-form">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mt-5">
              <div className="login-card p-4 border rounded">
                <h2 className="text-center mb-4 font-weight-bold">Contact Us</h2>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    className="form-control shadow-none border-2"
                    placeholder="Enter your full name"
                    {...register("fullname")}
                  />
                  <p className="text-danger mt-1">
                    {errors.fullname?.message}
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-control shadow-none border-2"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  <p className="text-danger mt-1">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="form-control shadow-none border-2"
                    placeholder="Enter your message"
                    {...register("message")}
                  />
                  <p className="text-danger mt-1">
                    {errors.message?.message}
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn w-100 mb-3 btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Contact;