import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SigInAction } from "@/redux/auth";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch()
   const navigate = useNavigate()

  const onSubmit = async(formData) => {
     const data = await dispatch(SigInAction(formData))
    if(data?.payload?.success){
      // toast({
      //   title : 'SignIn Successfull',
      //   description : data?.payload?.message,
      //   variant: "success",
      // })
      navigate('/')
    }else{
      // toast({
      //   title : 'SignIn Failed',
      //   description : data?.payload?.error?.message,
      //   variant: "destructive",
      // })
    }
  }
  
  return (
    <div className="w-full flex flex-col items-center">
      <p className="font-bold mt-8 text-2xl mx-auto mb-8">
        Sign In to your Account
      </p>
      <div className="w-2xl">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input
            id="email"
            placeholder="your email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          )}
          <Label>Password</Label>
          <Input
            id="password"
            placeholder="your password"
            type="password"
            {...register("password", {
              required: "password is required",
              validate: {
                noSpaces: (value) => {
                  const trimmedValue = value.trim();
                  return (
                    (trimmedValue !== "" &&
                      trimmedValue === value &&
                      !trimmedValue.includes(" ")) ||
                    "Password cannot contain spaces"
                  );
                },
              },
              minLength: {
                value: 5,
                message: "Password must be more than 5 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm mt-2 text-red-500">
              {errors.password?.message}
            </p>
          )}
          <Button className="w-full mt-5 bg-black hover:bg-gray-600 dark:bg-white dark:text-black text-white shadow-md">
            SignIn to your Account
          </Button>{" "}
        </form>
        <div className="flex gap-2 justify-end mt-2">
          <p>Don't have an account? </p>
          <Link to="/auth/sign-up">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
