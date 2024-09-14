import React from "react";
import { useForm } from "react-hook-form";

const ReactHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  const inputStyle =
    "w-full p-2 border rounded-md focus:outline-none focus:ring-2";
  const defaultRingStyle = "focus:ring-blue-500";
  const errorRingStyle = "focus:ring-red-500 focus:border-red-500";
  const errorBorderStyle = "border-red-500";
  const errorMessageStyle = "text-red-500 text-sm mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
      noValidate
    >
      <div>
        <input
          type="text"
          placeholder="Username (letters and numbers only)"
          className={`${inputStyle} ${
            errors.username
              ? `${errorRingStyle} ${errorBorderStyle}`
              : defaultRingStyle
          }`}
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
          placeholder="Email (Optional)"
          className={`${inputStyle} ${
            errors.email
              ? `${errorRingStyle} ${errorBorderStyle}`
              : defaultRingStyle
          }`}
          {...register("email", {
            required: false,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className={errorMessageStyle}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Phone (10 digits)"
          className={`${inputStyle} ${
            errors.phone
              ? `${errorRingStyle} ${errorBorderStyle}`
              : defaultRingStyle
          }`}
          {...register("phone")}
        />
        {errors.phone && (
          <p className={errorMessageStyle}>{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        // onClick={(e) => {
        //   e.preventDefault();
        // }}
      >
        Submit
      </button>
    </form>
  );
};

export default ReactHook;
