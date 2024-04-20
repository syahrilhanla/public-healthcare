"use client"
import 'react-day-picker/dist/style.css';

import ControlledInput from "components/ControlledInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CalendarIcon, LoaderCircle } from "lucide-react";

import useProfileForm from "components/Profile/hooks/useProfileForm";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const ProfileForm = () => {
  const {
    form, onSubmit, formStatus
  } = useProfileForm();

  return (
    <div className="grid gap-4 mx-auto lg:w-[70%] text-gray-600 duration-500">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Profil
      </h1>

      {
        formStatus === "loading" ? (
          <div>
            <LoaderCircle className="animate-spin" /> Loading...
          </div>
        ) : (
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <ControlledInput
                formSchema={form}
                inputId="name"
                includeError
                labelText="Nama Lengkap"
                placeholder="Nama"
              />

              <ControlledInput
                formSchema={form}
                inputId="nik"
                includeError
                labelText="NIK"
                placeholder="NIK"
                type="number"
              />

              <div className="space-y-2">
                <div className="grid grid-cols-[5fr_5fr] gap-4">
                  <ControlledInput
                    formSchema={form}
                    inputId="birthPlace"
                    includeError
                    labelText="Tempat Lahir"
                    placeholder="Tempat Lahir"
                  />
                  <FormField
                    control={form.control}
                    name={"birthDate"}
                    render={({ field }) => (
                      <>
                        <FormItem className="flex flex-col justify-end items-start">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full text-left font-normal text-slate-500"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd MMMM yyyy")
                                  ) : (
                                    <span>Tanggal Lahir</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-80" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                fromYear={1970}
                                toYear={new Date().getFullYear()}
                                styles={{
                                  caption_dropdowns: {
                                    width: "12rem",
                                    display: "flex",
                                    gap: "1rem",
                                    color: "slategrey"
                                  }
                                }}
                                captionLayout="dropdown-buttons"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name={"sex"}
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="sex">Jenis Kelamin</FormLabel>
                      <RadioGroup
                        className="flex gap-6 duration-500"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormItem className="space-x-2 flex items-center">
                          <Label htmlFor="male" className="space-x-2">
                            <FormControl>
                              <RadioGroupItem
                                value="Laki-laki"
                                id="male"
                                checked={field.value === "Laki-laki"}
                              />
                            </FormControl>
                            <span>
                              Laki-laki
                            </span>
                          </Label>
                        </FormItem>
                        <FormItem className="space-x-2 flex items-center">
                          <Label htmlFor="female" className="space-x-2">
                            <FormControl>
                              <RadioGroupItem
                                value="Perempuan"
                                id="female"
                                checked={field.value === "Perempuan"}
                              />
                            </FormControl>
                            <span>
                              Perempuan
                            </span>
                          </Label>
                        </FormItem>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <ControlledInput
                formSchema={form}
                inputId="address"
                includeError
                labelText="Alamat"
                placeholder="Alamat"
                type="textarea"
              />

              <ControlledInput
                formSchema={form}
                inputId="school"
                includeError
                labelText="Sekolah"
                placeholder="Asal Sekolah"
              />

              <FormField
                control={form.control}
                name={"posyandu"}
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="space-y-2 grid">
                        <FormLabel htmlFor="posyandu">Posyandu</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="posyandu"
                              className="w-full p-2 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-0 focus:ring-transparent"
                            >
                              <SelectValue
                                placeholder={field.value || "Pilih Posyandu"}
                                className="w-full space-x-2 focus-visible:ring-transparent"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Posyandu Remaja FRESH">
                                Posyandu Remaja FRESH
                              </SelectItem>
                              <SelectItem value="Posyandu Remaja Smart Gemilang">
                                Posyandu Remaja Smart Gemilang
                              </SelectItem>
                              <SelectItem value="Posyandu Remaja Kusuma Jaya">
                                Posyandu Remaja Kusuma Jaya
                              </SelectItem>
                              <SelectItem value="Posyandu Remaja Mandiri Sehat">
                                Posyandu Remaja Mandiri Sehat
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  </>
                )}
              />
              <Button
                type="submit"
              >
                {
                  formStatus === "submitting" ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Simpan"
                  )
                }
              </Button>
            </form>
          </Form>
        )
      }
    </div>
  )
}

export default ProfileForm;