import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/use-toast";

import { FormStatus } from "type/form.type";
import { generateUID } from "lib/helpers";
import { ConsultType } from "lib/reusableValues";

const schema = z.object({
  userId: z.string({
    required_error: "Pilih Siswa"
  }).min(1, "Pilih Siswa"),
  consultId: z.string(),
  type: z.string().optional(),
  posyandu: z.string(),
  name: z.string(),
  consultType: z.string().min(1, "Pilih jenis konsultasi"),
  message: z.string().min(5, "Masukkan minimal 5 karakter"),
  hasSmoke: z.boolean().optional(),
  ageStartSmoking: z.number().optional(),
  byFriends: z.boolean().optional(),
  byFamily: z.boolean().optional(),
  byCuriosity: z.boolean().optional(),
  byPeerForce: z.boolean().optional(),
  bySpareTime: z.boolean().optional(),
  byStress: z.boolean().optional(),
  smokingSource: z.string().optional(),
  cigaretteCount: z.number().optional(),
  smokingDuration: z.string().optional(),
  knowledgeOfSmokingEffect: z.boolean().optional(),
  wantingToQuit: z.boolean().optional(),
  reasonToQuit: z.string().optional(),
  quitSupport: z.string().optional(),
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
}).refine(data => {
  // If consultType is "SMOKING", then these fields are required
  if (data.consultType === 'SMOKING') {
    return data.hasSmoke !== undefined &&
      data.ageStartSmoking !== undefined &&
      data.byFriends !== undefined &&
      data.byFamily !== undefined &&
      data.byCuriosity !== undefined &&
      data.byPeerForce !== undefined &&
      data.bySpareTime !== undefined &&
      data.byStress !== undefined &&
      data.smokingSource !== undefined &&
      data.cigaretteCount !== undefined &&
      data.smokingDuration !== undefined &&
      data.knowledgeOfSmokingEffect !== undefined &&
      data.wantingToQuit !== undefined &&
      data.reasonToQuit !== undefined &&
      data.quitSupport !== undefined;
  }
  // Otherwise, these fields are not required
  return true;
}, {
  // Custom error message
  message: "All smoking related fields are required when consultType is SMOKING",
  path: ['consultType']
});;

const useConsultingForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      name: "",
      posyandu: "",
      consultId: generateUID(),
      type: "",
      consultType: "",
      message: "",
      hasSmoke: false,
      ageStartSmoking: 0,
      byFriends: false,
      byFamily: false,
      byCuriosity: false,
      byPeerForce: false,
      bySpareTime: false,
      byStress: false,
      smokingSource: "",
      cigaretteCount: 0,
      smokingDuration: "",
      knowledgeOfSmokingEffect: false,
      wantingToQuit: false,
      reasonToQuit: "",
      quitSupport: ""
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("editing");

  const router = useRouter();

  // set message for pregnancy consult type to bypass the form
  useEffect(() => {
    if (form.getValues("consultType") === ConsultType.PREGNANCY) {
      form.setValue("message", "Anda akan diarahkan ke program Komen 911");
    }

    if (form.getValues("consultType") === ConsultType.STOP_SMOKING) {
      form.setValue("message", "Anda akan diarahkan ke program Stop Smoking");
    }
  }, [form.getValues("consultType")])

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setFormStatus("submitting");

      const payload = { ...data };

      const request: {
        data: {}; message: string; status: number
      } = await (await fetch("/api/consult", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })).json();

      if (request.status !== 200) {
        throw new Error(request.message);
      }

      toast({
        title: request.message,
        variant: "default"
      });

      router.push("/dashboard/konsultasi");
    } catch (error) {
      console.error("Error submitting form: ", error);

      let errorDescription = ((error as Error).message);

      toast({
        title: errorDescription,
        variant: "destructive"
      });
    } finally {
      setFormStatus("editing");
    }
  }

  return {
    form,
    onSubmit,
    formStatus
  }
}

export default useConsultingForm;