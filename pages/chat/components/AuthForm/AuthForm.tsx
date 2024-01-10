//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Input from "pages/chat/components/Input";
import Button from "pages/chat/components/Button";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "pages/chat/components/AuthSocialButton";
import { useRouter } from "next/navigation";
import ToasterContext from "app/context/ToasterContext";

type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>("LOGIN");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/chat/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            toast.success("Account created successfully!");
            router.push("/chat/users");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong!");
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }
          if (callback?.ok) {
            toast.success("Logged in successfully!");
            router.push("/chat/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          toast.success("Logged in successfully!");
          router.push("/conversations");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <ToasterContext>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div clasName='bg-white px-4 py-8 sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && <Input id='name' label='Name' register={register} errors={errors} />}
            <Input id='email' label='Email address' type='email' register={register} errors={errors} />
            <Input id='password' label='Password' type='password' register={register} errors={errors} />

            <div>
              <Button disabled={isLoading} fullWidth type='submit'>
                {variant === "LOGIN" ? "Let's Chat !" : "Register"}
              </Button>
            </div>
          </form>
          <div className='mt-6'>
            <div className='relative'>
              <div
                className='
                absolute 
                inset-0 
                flex 
                items-center
              '
              >
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white px-2 text-gray-500'>Or continue with</span>
              </div>
            </div>

            <div className='mt-6 flex gap-2'>
              <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
              <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
            </div>
          </div>

          <div
            className='
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          '
          >
            <div>{variant === "LOGIN" ? "New to Messenger?" : "Already have an account?"}</div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </ToasterContext>
  );
};

export default AuthForm;
