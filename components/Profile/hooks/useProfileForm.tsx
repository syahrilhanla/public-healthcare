import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "lib/firebase.sdk";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { FormStatus } from "type/form.type";

const schema = z.object({
  name: z.string().min(4, {
    message: "Masukkan minimal 3 karakter"
  }),
  nik: z.string().min(16, {
    message: "Masukkan NIK yang valid"
  }).max(16, {
    message: "Masukkan NIK yang valid"
  }),
  birthPlace: z.string().min(1, {
    message: "Masukkan tempat lahir yang valid"
  }),
  birthDate: z.date({
    required_error: "Masukkan tanggal lahir yang valid",
    invalid_type_error: "Masukkan tanggal lahir yang valid"
  }), // "2022-01-01
  address: z.string().min(1, { message: "Masukkan alamat yang valid" }),
  school: z.string().min(1, { message: "Masukkan sekolah yang valid" }),
  posyandu: z.string().min(1, { message: "Pilih posyandu yang valid" }),
  sex: z.string().min(1, { message: "Pilih jenis kelamin yang valid" }),
});

const useProfileForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      nik: "",
      birthPlace: "",
      birthDate: undefined,
      school: "",
      posyandu: "",
      sex: "",
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("editing");

  const router = useRouter();
  const userId = useSearchParams().get("id");

  const getUserData = useCallback(async () => {
    if (!userId) return;

    try {
      setFormStatus("loading");
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const birthDate = new Date(data.birthDate.toDate());

        form.reset({
          ...data,
          birthDate
        });
      }

      setFormStatus("editing");
    } catch (error) {
      console.error("Error to get user data", error);
      setFormStatus("error");
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUserData();
    }
  }, [userId, getUserData])

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // If userId is exist, use userId as reference, otherwise use NIK as reference
    // used for create or edit user data
    const reference = userId ? userId : data.nik;

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
        description: userId ? "Berhasil mengubah profil!" : "Berhasil membuat profil!",
        variant: "default"
      });

      router.push("/dashboard/profil");
    } catch (error) {
      console.error("Error to create/edit user data", error);

      toast({
        title: userId ? "gagal mengubah profil!" : "Gagal membuat profil!",
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

export default useProfileForm;
