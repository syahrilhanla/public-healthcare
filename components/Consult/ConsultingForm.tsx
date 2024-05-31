"use client"

import SelectUserDropdown from "components/SelectUserDropdown";
import FailedIndicator from "components/FailedIndicator";
import SelectConsultType from "components/Consult/SelectConsultType";
import ControlledInput from "components/ControlledInput";
import SelectControlType from "components/Consult/SelectControlType";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { LoaderCircle } from "lucide-react";

import useConsultingForm from "components/Consult/hooks/useConsultingForm";
import { ConsultType, HealthControlType, doctors } from "lib/reusableValues";

const ControlTypeInfo = ({ controlType }: { controlType: string }) => {
  const selectedDoctor = doctors.find(doctor => doctor.type === controlType);

  if (!selectedDoctor) return null;

  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">
        Anda akan diarahkan kepada:
      </p>
      <div className="space-y-1">
        <p className="text-sm text-gray-500">
          {selectedDoctor.name}
        </p>
        <p className="text-sm text-blue-500">
          {selectedDoctor?.phone}
        </p>
      </div>
    </div>
  )
}

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
                  form={form}
                  callback={(e) => {
                    form.setValue("name", e.name);
                    form.setValue("posyandu", e.posyandu);
                    form.setValue("userId", e.userId);
                  }}
                />

                <SelectConsultType form={form} />

                {
                  form.watch("consultType") === ConsultType.HEALTH_CONTROL && (
                    <SelectControlType form={form} />
                  )
                }

                {
                  form.getValues("type") && (
                    <ControlTypeInfo controlType={form.getValues("type") as HealthControlType} />
                  )
                }

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