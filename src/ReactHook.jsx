import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const ReactHook = () => {
  const inputStyle = "w-full p-2 border rounded-md";
  const errorStyle = "border-red-500 border-2";
  const errorMessageStyle = "text-red-500 text-sm mt-1";
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto"
      >
        <div>
          <input
            type="text"
            placeholder="Username (letters and numbers only)"
            className={`${inputStyle} ${errors.username && errorStyle}`}
            {...register("username", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Username must contain only letters and numbers",
              },
            })}
          />
          {errors.username && (
            <p className={errorMessageStyle}>{errors.username.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className={`${inputStyle} ${
              (errors.email || touchedFields.email) && errorStyle
            }`}
            {...register("email", {
              // required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email && (
            <p className={errorMessageStyle}>
              {errors.email.type === "required"
                ? "Email is required"
                : "Invalid email format"}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Phone (10 digits)"
            className={`${inputStyle} ${
              (errors.phone || touchedFields.phone) && errorStyle
            }`}
            {...register("phone", {
              required: true,
              pattern: /^\d{10}$/,
            })}
          />
          {errors.phone && (
            <p className={errorMessageStyle}>
              {errors.phone.type === "required"
                ? "Phone number is required"
                : "Phone must be 10 digits"}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default ReactHook;
