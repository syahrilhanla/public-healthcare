"use client"

import SelectUserDropdown from "components/SelectUserDropdown";
import FailedIndicator from "components/FailedIndicator";
import SelectConsultType from "components/Consult/SelectConsultType";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { LoaderCircle } from "lucide-react";

import useConsultingForm from "components/Consult/hooks/useConsultingForm";
import ControlledInput from "components/ControlledInput";

const ProfileForm = () => {
  const {
    form,
    formStatus,
    onSubmit,
  } = useConsultingForm();

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
                  callback={(userId) => console.log(userId)}
                  form={form}
                />

                <SelectConsultType form={form} />

                <ControlledInput
                  formSchema={form}
                  inputId="message"
                  includeError
                  labelText="Keluhan"
                  placeholder="Masukkan keluhan"
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