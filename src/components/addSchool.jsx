"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import "../styles/form.css";

export default function SchoolRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    });

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch("/api/add", {
      method: "POST",
      body: formData,
    });

    const resData = await res.json();

    if (res.ok) {
      alert("School registered successfully!");
      reset();
    } else {
      alert(resData.error || "Failed to register school.");
    }
  };

  return (
    <div className="container">
      <Link href="/">← View listed schools</Link>
      <h1 className="form-title">School Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="form-group">
          <label>Enter Your School Name</label>
          <input
            type="text"
            placeholder="School Name"
            {...register("name", { required: "School name is required" })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Upload School Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "School image is required",
              validate: {
                isImage: (files) =>
                  files && files[0] && files[0].type.startsWith("image/")
                    ? true
                    : "Only image files are allowed",
                fileSize: (files) =>
                  files && files[0] && files[0].size <= 3 * 1024 * 1024
                    ? true
                    : "Image size must be less than 3MB",
              },
            })}
          />
          {errors.image && (
            <span className="error">{errors.image.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Enter Official Email ID</label>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email_id && (
            <span className="error">{errors.email_id.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Enter Contact Number</label>
          <input
            type="text"
            placeholder="Contact Number"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[1-9][0-9]{9}$/,
                message: "Enter valid 10-digit number",
              },
            })}
          />
          {errors.contact && (
            <span className="error">{errors.contact.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Enter City Name</label>
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <span className="error">{errors.city.message}</span>}
        </div>

        <div className="form-group">
          <label>Enter State Name</label>
          <input
            type="text"
            placeholder="State"
            {...register("state", { required: "State is required" })}
          />
          {errors.state && (
            <span className="error">{errors.state.message}</span>
          )}
        </div>

        <div className="form-group address-group">
          <label>Enter Address</label>
          <textarea
            placeholder="Physical Address"
            {...register("address", { required: "Address is required" })}
          ></textarea>
          {errors.address && (
            <span className="error">{errors.address.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register Your School"}
        </button>
      </form>
    </div>
  );
}
