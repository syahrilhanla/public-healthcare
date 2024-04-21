import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "lib/firebase.sdk";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { generateUID } from "lib/helpers";

const schema = z.object({
  userId: z.string(),
  TB: z.number({
    required_error: "Masukkan nilai yang valid"
  }),
  BB: z.number({
    required_error: "Masukkan nilai yang valid"
  }),
  LILA: z.number({
    required_error: "Masukkan nilai yang valid"
  }),
  LP: z.number({
    required_error: "Masukkan nilai yang valid"
  }),
  Hb: z.number({
    required_error: "Masukkan nilai yang valid"
  }),
  TD: z.number({
    required_error: "Masukkan nilai yang valid"
  }),
  inspectionId: z.string(),
});

type FormStatus = "editing" | "loading" | "submitting" | "error";

const useInspectionForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      TB: 0,
      BB: 0,
      LILA: 0,
      LP: 0,
      Hb: 0,
      TD: 0,
      inspectionId: generateUID(),
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("editing");

  const router = useRouter();
  const inspectionId = useSearchParams().get("inspectionId");

  const getUserData = useCallback(async () => {
    if (!inspectionId) return;

    try {
      setFormStatus("loading");
      const docRef = doc(db, "inspection", inspectionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        form.reset({
          ...data,
        });
      }

      setFormStatus("editing");
    } catch (error) {
      console.error("Error to get user data", error);
      setFormStatus("error");
    }
  }, [inspectionId]);

  useEffect(() => {
    if (inspectionId) {
      getUserData();
    }
  }, [inspectionId, getUserData])

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // If userId is exist, use userId as reference, otherwise use NIK as reference
    // used for create or edit user data
    const reference = inspectionId ? inspectionId : "data.nik";

    try {
      setFormStatus("submitting");

      const profilePayload = {
        ...data,
        updatedAt: serverTimestamp()
      }

      await setDoc(doc(db, "users", reference), {
        ...profilePayload
      });

      toast({
        description: inspectionId ? "Berhasil mengubah profil!" : "Berhasil membuat profil!",
        variant: "default"
      });

      router.push("/dashboard/profil");
    } catch (error) {
      console.error("Error to create/edit user data", error);

      toast({
        title: inspectionId ? "gagal mengubah profil!" : "Gagal membuat profil!",
        description: "Silahkan coba lagi",
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
  };
};

export default useInspectionForm;
