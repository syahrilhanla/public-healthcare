"use client"

import 'react-day-picker/dist/style.css';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Form } from "@/components/ui/form";

import useProfileForm from "components/Profile/hooks/useProfileForm";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import ControlledInput from "components/ControlledInput";

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

          <div className="space-y-2">
            <Label htmlFor="NIK">NIK</Label>
            <Input
              placeholder="NIK"
              type="number"
              className="focus-visible:ring-transparent"
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => {
                e.currentTarget.blur();
              }}
            />
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              className="focus-visible:ring-transparent"
              placeholder="Alamat"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">Sekolah</Label>
            <Input
              className="focus-visible:ring-transparent"
              placeholder="Sekolah"
            />
          </div>

          <div className="space-y-2 grid">
            <Label htmlFor="posyandu">Posyandu</Label>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant={"outline"}
                  className="w-full space-x-2 focus-visible:ring-transparent"
                >
                  <ChevronDown className="h-4 w-4" />
                  <span>
                    Pilih Posyandu
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Posyandu Remaja FRESH</DropdownMenuItem>
                <DropdownMenuItem>Posyandu Remaja Smart Gemilang</DropdownMenuItem>
                <DropdownMenuItem>Posyandu Remaja Kusuma Jaya</DropdownMenuItem>
                <DropdownMenuItem>Posyandu Remaja Mandiri Sehat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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