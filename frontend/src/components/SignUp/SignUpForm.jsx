import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordRegex, nicknameRegex } from "../../constants";
import { registerUser } from "../../redux/thunks/authThunks";
import { Button } from "../index";

const schema = z
  .object({
    nickname: z
      .string()
      .min(4, "Nickname must be at least 4 characters.")
      .max(20, "Nickname must be maximum 20 characters.")
      .regex(
        nicknameRegex,
        "Nickname must contain only english letters or numbers."
      ),
    email: z
      .string()
      .email("Invalid email.")
      .max(255, "Email must me maximum 255 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password must be maximum 20 characters long.")
      .regex(
        passwordRegex,
        "Password must contain one uppercase, one lowercase, one number and no special characters."
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match.",
    path: ["password_confirmation"],
  });

const SignUpForm = ({ setIsSubmitted }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    // dispatch(setUser({ email: data.email }));
    // setIsSubmitted(true);

    try {
      await dispatch(registerUser(data)).unwrap();

      navigate("/");
      // setIsSubmitted(true);

      // reset();
    } catch (error) {
      console.log("Register failed");
      setError("root", { message: error.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 f-regular"
    >
      <div className="w-[300px]">
        <input
          {...register("nickname")}
          type="text"
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Nickname..."
        />
        {errors.nickname && (
          <p className="px-1 text-red-500">{errors.nickname.message}</p>
        )}
      </div>

      <div className="w-[300px]">
        <input
          {...register("email")}
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Email..."
        />
        {errors.email && (
          <p className="px-1 text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="w-[300px]">
        <input
          {...register("password")}
          type="password"
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Password..."
        />
        {errors.password && (
          <p className="px-1 text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="w-[300px]">
        <input
          {...register("password_confirmation")}
          type="password"
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Confirm password..."
        />
        {errors.password_confirmation && (
          <p className="px-1 text-red-500">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Sign up"}
      </Button>

      {errors.root && (
        <p className="self-start px-1 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
};

export default SignUpForm;
