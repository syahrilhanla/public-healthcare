import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormStatus } from "type/form.type";
import { generateUID } from "lib/helpers";
import { ConsultType } from "lib/reusableValues";

const schema = z.object({
  userId: z.string({
    required_error: "Pilih Siswa"
  }).min(1, "Pilih Siswa"),
  consultId: z.string(),
  type: z.string().optional(),
  consultType: z.string().min(1, "Pilih jenis konsultasi"),
  message: z.string({
    required_error: "Masukkan keluhan"
  }).min(5, "Masukkan minimal 5 karakter")
}).refine(data => {
  // If consultType is "HEALTH_CONTROL", then type is required
  if (data.consultType === ConsultType.HEALTH_CONTROL) {
    return data.type !== "";
  }
  // Otherwise, type is not required
  return true;
}, {
  // Custom error message
  message: "Masukkan tipe keluhan",
  path: ['type']
});

const useConsultingForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      consultId: generateUID(),
      type: "",
      consultType: "",
      message: "",
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("editing");

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
  }

  return {
    form,
    onSubmit,
    formStatus
  }
}

export default useConsultingForm;