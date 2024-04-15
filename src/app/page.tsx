"use client"

import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import useSnackbarStore from "lib/stores/snackbar.store"

const Dashboard = () => {
  const {
    updateSnackbarState
  } = useSnackbarStore();

  const router = useRouter();

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
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // login logic here 

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    updateSnackbarState({
      snackbarMessage: "Login berhasil!",
      snackbarOpen: true,
    });

    router.push("/dashboard/hasil-pemeriksaan");
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
                          <Input
                            id="password"
                            type="password"
                            {...field}
                            value={field.value}
                            className="focus-visible:ring-transparent focus:outline-none "
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                    <FormMessage />
                  </>
                )}
              />
              <Button type="submit" className="w-full">
                Login
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