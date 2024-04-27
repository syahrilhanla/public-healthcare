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
import { CalendarIcon, LoaderCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import FailedIndicator from "components/FailedIndicator";
import { Input } from "@/components/ui/input";
import useTTDForm from "./hooks/useTTDForm";

const TTDForm = () => {
  const {
    form,
    formStatus,
    onSubmit,
    userDropdown,
    setSearchUser
  } = useTTDForm();

  return (
    <div className="grid gap-4 mx-auto lg:w-[70%] text-gray-600 duration-500">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        TTD Remaja Putri
      </h1>

      {
        formStatus === "loading" ? (
          <div className="w-full flex gap-3 justify-center text-center">
            <LoaderCircle className="animate-spin" /> <p>Loading...</p>
          </div>
        ) :
          formStatus === "error" ? (
            <FailedIndicator />
          ) : (
            <Form {...form}>
              <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name={"userId"}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="space-y-2 grid">
                          <FormLabel htmlFor="userId">Siswa</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                id="userId"
                                className="w-full h-16 px-2 py-4 text-left
                                border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-0 focus:ring-transparent"
                              >
                                <SelectValue
                                  placeholder={"Pilih Siswa"}
                                  className="w-full space-x-2 focus-visible:ring-transparent"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <div className="space-y-2">
                                  <Input
                                    placeholder="Cari Siswa"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-transparent"
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setSearchUser(value);
                                    }}
                                  />
                                  {
                                    userDropdown.map(({ name, userId }) => (
                                      <SelectItem key={userId} value={userId}>
                                        <div className="grid gap-1 text-sm text-slate-600">
                                          <p>{name}</p>
                                          <p className="text-slate-400">{userId}</p>
                                        </div>
                                      </SelectItem>
                                    ))
                                  }
                                </div>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    </>
                  )}
                />

                <ControlledInput
                  formSchema={form}
                  inputId="TB"
                  includeError
                  type="number"
                  labelText="Tinggi Badan (cm)"
                  placeholder="0 cm"
                />

                <ControlledInput
                  formSchema={form}
                  inputId="BB"
                  includeError
                  type="number"
                  labelText="Berat Badan (kg)"
                  placeholder="0 kg"
                />

                <ControlledInput
                  formSchema={form}
                  inputId="LP"
                  includeError
                  type="number"
                  labelText="Lingkar Perut (cm)"
                  placeholder="0 cm"
                />

                <ControlledInput
                  formSchema={form}
                  inputId="LILA"
                  includeError
                  type="number"
                  labelText="Lingkar Tangan (cm) (Opsional)"
                  placeholder="0 cm"
                />

                <ControlledInput
                  formSchema={form}
                  inputId="Hb"
                  includeError
                  type="number"
                  labelText="Hemoglobin (Opsional)"
                  placeholder="0 g/dL"
                />

                <ControlledInput
                  formSchema={form}
                  inputId="TD"
                  includeError
                  labelText="Tekanan Darah"
                  placeholder="0 0 mmHg"
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

export default TTDForm;