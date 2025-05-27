import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { useDispatch } from "react-redux";
import {SignUpAction } from "@/redux/auth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
   const dispatch = useDispatch()
   const navigate = useNavigate()
  
  const onSubmit = async(formData)=>{
      const data = await dispatch(SignUpAction(formData))
    if(data?.payload?.success){
      navigate('/auth/sign-in')
      // toast({
      //   description : data?.payload?.message,
      // })
    }else{
      // toast({
      //   title : 'SignIn Failed',
      //   description : data?.payload?.error?.message,
      // })
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <p className="font-bold mt-8 text-2xl mx-auto mb-8">
        Create your Account
      </p>
      <div className="w-2xl">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Label>User Name</Label>
          <Input id="username" placeholder="your username" 
           {...register("username", {
                  required: "username is required",
                  validate: {
                    noSpaces: (value) => {
                      const trimmedValue = value.trim();
                      return (
                        (trimmedValue !== "" &&
                          trimmedValue === value &&
                          !trimmedValue.includes(" ")) ||
                        "Username cannot contain spaces"
                      );
                    },
                    lowercase: (value) => {
                      return (
                        value === value.toLowerCase() ||
                        "Username must be in lowercase"
                      );
                    },
                  },
                  minLength: {
                    value: 5,
                    message: "username must be more than 5 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "username cannot exceed 20 characters",
                  },
                })}/>
                 {errors.username && (
                <p className="text-sm mt-2 text-red-500">
                  {errors.username.message}
                </p>
              )}
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
          <Input id="password" placeholder="your password" type='password' 
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
            Create your Account
          </Button>{" "}
        </form>
        <div className="flex gap-2 justify-end mt-2">
          <p>Already have an account? </p>
          <Link to="/auth/sign-in">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
