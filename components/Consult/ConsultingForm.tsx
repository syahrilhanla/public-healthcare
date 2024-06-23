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
import RadioButtons from "components/RadioButtons";
import SelectSmokingReason from "./SelectSmokingReason";

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

                {
                  form.getValues("consultType") !== ConsultType.PREGNANCY
                    && form.getValues("consultType") !== ConsultType.STOP_SMOKING
                    ? <ControlledInput
                      formSchema={form}
                      inputId="message"
                      includeError
                      labelText="Keluhan"
                      placeholder="Masukkan keluhan"
                    />
                    : null
                }

                {
                  form.getValues("consultType") === ConsultType.PREGNANCY ? (
                    <div>
                      <p className="text-sm text-blue-500">
                        Anda akan diarahkan ke program Komen 911
                      </p>
                    </div>
                  ) : null
                }

                {
                  form.getValues("consultType") === ConsultType.STOP_SMOKING && (
                    <>
                      <RadioButtons
                        formSchema={form}
                        inputId="smokingStatus"
                        includeError
                        labelText="Apakah kamu pernah merokok walau satu hisapan?"
                        options={[
                          {
                            value: "YES",
                            label: "Pernah"
                          },
                          {
                            value: "NO",
                            label: "Tidak Pernah"
                          }
                        ]}
                      />

                      <ControlledInput
                        formSchema={form}
                        inputId="birthPlace"
                        includeError
                        labelText="Berapa usia kamu mulai merokok?"
                        placeholder="e.g. 12 tahun"
                      />

                      <SelectSmokingReason form={form} />

                      <ControlledInput
                        formSchema={form}
                        inputId="birthPlace"
                        includeError
                        labelText="Dari mana kamu tahu tentang merokok?"
                        placeholder="e.g. teman, keluarga, iklan, dll"
                      />

                      <ControlledInput
                        formSchema={form}
                        inputId="birthPlace"
                        includeError
                        labelText="Berapa jumlah batang rokok yang kamu hisap setiap hari?"
                        placeholder="e.g. teman, keluarga, iklan, dll"
                      />

                      <RadioButtons
                        formSchema={form}
                        inputId="smokingStatus"
                        includeError
                        labelText="Apakah kamu tahu dampak buruk dari merokok?"
                        options={[
                          {
                            value: "YES",
                            label: "Tahu"
                          },
                          {
                            value: "NO",
                            label: "Tidak Tahu"
                          }
                        ]}
                      />

                      <RadioButtons
                        formSchema={form}
                        inputId="smokingStatus"
                        includeError
                        labelText="Apakah kamu ada keinginan untuk berhenti merokok?"
                        options={[
                          {
                            value: "YES",
                            label: "Ingin"
                          },
                          {
                            value: "NO",
                            label: "Tidak Ingin"
                          }
                        ]}
                      />

                      <ControlledInput
                        formSchema={form}
                        inputId="birthPlace"
                        includeError
                        labelText="Apa alasanmu ingin berhenti merokok?"
                      />

                      <ControlledInput
                        formSchema={form}
                        inputId="birthPlace"
                        includeError
                        labelText="Siapa yang mendukungmu berhenti merokok?"
                        placeholder="e.g. keluarga, teman, dll"
                      />
                    </>
                  )
                }

                <Button
                  type="submit"
                >
                  {
                    formStatus === "submitting" ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      form.getValues("consultType") === ConsultType.PREGNANCY
                        || form.getValues("consultType") === ConsultType.STOP_SMOKING
                        ? "Lanjut" : "Simpan"
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