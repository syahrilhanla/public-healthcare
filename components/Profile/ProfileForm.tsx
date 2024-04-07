"use client"

import 'react-day-picker/dist/style.css';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import useProfileForm from "components/Profile/hooks/useProfileForm";
import { cn } from "@/lib/utils";
import ControlledInput from "components/ControlledInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProfileForm = () => {
  const {
    form, onSubmit
  } = useProfileForm();

  return (
    <div className="grid gap-4 mx-auto lg:w-[70%] text-gray-600 duration-500">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Profil
      </h1>
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
            <Label htmlFor="name">Tempat Tanggal Lahir</Label>
            <div className="grid grid-cols-[5fr_5fr] gap-4">
              <Input
                placeholder="Tempat Lahir"
                className="focus-visible:ring-transparent"
              />
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full text-left font-normal text-slate-500"
                    )}
                  >
                    Tanggal Lahir
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-80" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={undefined}
                    onSelect={undefined}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={3000}
                    initialFocus
                    styles={{
                      caption_dropdowns: {
                        width: "12rem",
                        display: "flex",
                        gap: "1rem",
                        color: "slategrey"
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sex">Jenis Kelamin</Label>
            <RadioGroup className="flex gap-6">
              <div className="space-x-2 flex items-center">
                <RadioGroupItem value="Laki-laki" id="male" />
                <Label htmlFor="male">
                  Laki-laki
                </Label>
              </div>
              <div className="space-x-2 flex items-center">
                <RadioGroupItem value="Perempuan" id="female" />
                <Label htmlFor="female">
                  Perempuan
                </Label>
              </div>
            </RadioGroup>
          </div>

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
                        <SelectTrigger id="posyandu">
                          <SelectValue
                            placeholder="Pilih Posyandu"
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProfileForm;