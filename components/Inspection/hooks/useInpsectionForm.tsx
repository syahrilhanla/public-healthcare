import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
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
  const [userDropdown, setUserDropdown] = useState<{
    name: string;
    userId: string;
  }[]>([]);

  const router = useRouter();
  const inspectionId = useSearchParams().get("inspectionId");

  const getUserList = useCallback(async () => {
    try {
      const usersCollection = await getDocs(collection(db, "users"));
      const usersData = usersCollection.docs.map((doc) => {
        return {
          name: doc.data().name,
          userId: doc.id,
        };
      });

      setUserDropdown(usersData);
    } catch (error) {
      console.error("Error to get user list", error);
    }
  }, []);

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

    getUserList();
  }, [inspectionId, getUserData])

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // If userId is exist, use userId as reference, otherwise use NIK as reference
    // used for create or edit user data
    const reference = inspectionId ? inspectionId : data.inspectionId;

    try {
      setFormStatus("submitting");

      const profilePayload = {
        ...data,
        updatedAt: serverTimestamp()
      }

      await setDoc(doc(db, "inspections", reference), {
        ...profilePayload
      });

      toast({
        description: inspectionId ? "Berhasil mengubah data!" : "Berhasil membuat data!",
        variant: "default"
      });

      router.push("/dashboard/hasil-pemeriksaan");
    } catch (error) {
      console.error("Error to create/edit inspection data", error);

      toast({
        title: inspectionId ? "gagal mengubah data!" : "Gagal membuat data!",
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
    formStatus,
    userDropdown
  };
};

export default useInspectionForm;
