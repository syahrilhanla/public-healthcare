"use client"

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "lib/firebase.sdk";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import useSnackbarStore from "lib/stores/snackbar.store";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";

const Dashboard = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    updateSnackbarState
  } = useSnackbarStore();

  const router = useRouter();

  useEffect(() => {
    const loginCookie = typeof window !== "undefined" && window.document ?
      document.cookie.split('; ').find(row => row.startsWith('login')) : "";

    if (loginCookie) router.push("/dashboard/hasil-pemeriksaan");
  }, []);

  const formSchema = z.object({
    email: z.string().email().min(2, {
      message: "Email tidak boleh kosong!",
    }),
    password: z.string().min(2, {
      message: "Password tidak boleh kosong!",
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = useFormState(form);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    try {
      const login = await signInWithEmailAndPassword(auth, email, password);

      let date = new Date();
      date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days from now
      let expires = ";expires=" + date.toUTCString();

      const cookieToSet = `login=${login.user.uid}${expires}`
      document.cookie = cookieToSet;

      updateSnackbarState({
        snackbarMessage: "Login berhasil!",
        snackbarOpen: true,
      });

      router.push("/dashboard/hasil-pemeriksaan");
    } catch (error) {
      console.error("failed to login", error);

      updateSnackbarState({
        snackbarMessage: "Login Gagal!",
        snackbarOpen: true,
        type: "error",
      });
    }
  }

  return (
    <div className="w-[70%] mx-auto my-auto lg:grid h-[100dvh] lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12 lg:bg-muted lg:shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Masukkan email dan password anda
                </p>
              </div>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="grid gap-2">
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              {...field}
                              value={field.value}
                              type="email"
                              className="focus-visible:ring-transparent focus:outline-none "
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                      <FormMessage />
                    </>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                        </div>
                        <FormControl>
                          <span className="h-fit flex relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              {...field}
                              value={field.value}
                              className="focus-visible:ring-transparent focus:outline-none relative"
                            />
                            {
                              showPassword ? (
                                <EyeIcon
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute top-3 right-2 h-4 w-4 text-slate-600 
                                    hover:cursor-pointer" />
                              ) : (
                                <EyeOffIcon
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute top-3 right-2 h-4 w-4 text-slate-600 
                                    hover:cursor-pointer" />
                              )
                            }
                          </span>
                        </FormControl>
                      </div>
                    </FormItem>
                    <FormMessage />
                  </>
                )}
              />
              <Button
                type="submit"
                className={"w-full disabled:cursor-not-allowed"}
                disabled={isSubmitting}
              >
                {
                  isSubmitting ? <LoaderCircle className="h-6 w-6 animate-spin" /> : "Login"
                }
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Belum punya akun?{" "}
              <Link href="https://api.whatsapp.com/send?phone=6285923555297&text=Hai%2C%20tolong%20buatkan%20akun%20baru%20untuk%20saya%20sebagai%20admin%20Puskesmas%209%20Nopember."
                target="_blank"
                className="underline">
                Hubungi petugas
              </Link>
            </div>
          </form>
        </Form >
      </div >
      <div className="hidden bg-white lg:flex justify-center items-center">
        <Image
          src="/img/logo.png"
          alt="Workflow"
          width={300}
          height={300}
          className="dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div >
  )
}

export default Dashboard;