"use client";
// import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
// import envConfig from "@/config";
import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/apiRequest/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
// import { clientSessionToken} from "@/lib/http";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.login(values);
      //  fetch(
      //   `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify(values),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // ).then(async (res) => {
      //   const payload = await res.json();
      //   const data = {
      //     status: res.status,
      //     payload
      //   };
      //   if (!res.ok) {
      //     throw data;
      //   }
      //   return data;
      // })
      toast({
        description: result.payload.message,
      });

      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        expriresAt: result.payload.data.expiresAt,
      });
      // const resultFromNextServer = await
      // fetch('/api/auth',{
      //     method: 'POST',
      //     body: JSON.stringify(result),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }).then(async (res) => {
      //     const payload = await res.json();
      //     const data = {
      //       status: res.status,
      //       payload
      //     };
      //     if (!res.ok) {
      //       throw data;
      //     }
      //     return data;
      //   })
      // toast({
      //   description: result.payload.message
      // })
      //   console.log(result)
      //  clientSessionToken.value = result.payload.data.token
      router.push("/me");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="mật khẩu" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
