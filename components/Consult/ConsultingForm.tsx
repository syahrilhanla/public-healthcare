"use client"
import 'react-day-picker/dist/style.css';

import SelectUserDropdown from "components/SelectUserDropdown";
import FailedIndicator from "components/FailedIndicator";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";

import { LoaderCircle } from "lucide-react";

import useInspectionForm from "components/Inspection/hooks/useInpsectionForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { consultingTypes } from "lib/reusableValues";

const ProfileForm = () => {
  const {
    form,
    formStatus,
    onSubmit,
    userDropdown,
    setSearchUser
  } = useInspectionForm();

  return (
    <div className="grid gap-4 mx-auto lg:w-[70%] text-gray-600 duration-500">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Konsultasi
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
                <SelectUserDropdown
                  form={form}
                  userDropdown={userDropdown}
                  setSearchUser={(value) => {
                    setSearchUser(value);
                  }}
                />

                <FormField
                  control={form.control}
                  name={"Hb"}
                  render={({ field }) => (
                    <FormItem>
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
                              placeholder={field.value || "Jenis Konsultasi"}
                              className="w-full space-x-2 focus-visible:ring-transparent"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {
                              consultingTypes.map((type) => (
                                <SelectItem key={type} value={type} className="cursor-pointer">
                                  {type}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
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