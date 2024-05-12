import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateUID } from "lib/helpers";
import { useState } from "react";
import { FormStatus } from "type/form.type";

const schema = z.object({
  userId: z.string({
    required_error: "Pilih Siswa"
  }),
  consultId: z.string(),
  type: z.string(),
  message: z.string({
    required_error: "Masukkan keluhan"
  }),
});

const useConsultingForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      consultId: generateUID(),
      type: "",
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