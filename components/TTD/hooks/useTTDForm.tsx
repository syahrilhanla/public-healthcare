import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore";
import { DatabaseCollections, Sex, db } from "lib/firebase.sdk";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";

import { generateUID, useDebounce } from "lib/helpers";
import { Profile } from "type/profile.type";
import { FormStatus } from "type/form.type";

const monthlyRecord = z.object({
  january: z.boolean(),
  february: z.boolean(),
  march: z.boolean(),
  april: z.boolean(),
  may: z.boolean(),
  june: z.boolean(),
  july: z.boolean(),
  august: z.boolean(),
  september: z.boolean(),
  october: z.boolean(),
  november: z.boolean(),
  december: z.boolean(),
});

const schema = z.object({
  TTDId: z.string(),
  userId: z.string().min(1, { message: "Pilih siswa" }),
  year: z.string().min(1, { message: "Pilih tahun" }),
  monthlyRecord: monthlyRecord
});

const useTTDForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      year: "",
      TTDId: generateUID(),
      monthlyRecord: {
        january: false,
        february: undefined,
        march: false,
        april: true,
        may: false,
        june: undefined,
        july: false,
        august: true,
        september: false,
        october: false,
        november: false,
        december: false,
      },
    },
  });

  const router = useRouter();

  const [formStatus, setFormStatus] = useState<FormStatus>("editing");

  const [searchUser, setSearchUser] = useState<string>("");
  const [overallUserData, setOverallUserData] = useState<Profile[]>([]);
  const [userDropdown, setUserDropdown] = useState<{
    name: string;
    userId: string;
  }[]>([]);

  const inspectionId = useSearchParams().get("id");

  const userDebounce = useDebounce(searchUser, 700);

  const getUserBySearch = useCallback(() => {
    if (searchUser) {
      const regex = new RegExp(searchUser, "i");

      const filteredUsers = userDropdown.filter((user) => {
        return regex.test(user.name);
      });

      setUserDropdown(filteredUsers);
      return;
    } else {
      setUserDropdown(overallUserData.map((user) => {
        return {
          name: user.name,
          userId: user.nik,
        }
      }));
    }
  }, [userDebounce, overallUserData, userDropdown, searchUser]);

  useEffect(() => {
    getUserBySearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDebounce]);

  const getUserList = useCallback(async () => {
    try {
      const userQuery = query(
        collection(db, DatabaseCollections.USERS),
        where("sex", "==", Sex.FEMALE)
      );

      const usersCollection = await getDocs(userQuery);
      const usersData = usersCollection.docs.map((doc) => {
        return {
          name: doc.data().name,
          userId: doc.id,
        };
      });

      setUserDropdown(usersData);
      setOverallUserData(usersCollection.docs.map((doc) => doc.data() as Profile));
    } catch (error) {
      console.error("Error to GET INSPECTION list", error);
    }
  }, []);

  const getInspectionData = useCallback(async () => {
    if (!inspectionId) return;

    try {
      setFormStatus("loading");
      const docRef = doc(db, DatabaseCollections.INSPECTIONS, inspectionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        form.reset({
          ...data,
        });
      }

      setFormStatus("editing");
    } catch (error) {
      console.error("Error to GET INSPECTION data", error);
      setFormStatus("error");
    }
  }, [inspectionId, form]);

  const handleCheckMonthlyRecord = (month: keyof typeof monthlyRecord) => {
    form.watch("monthlyRecord")
    const monthlyRecord = form.getValues("monthlyRecord");

    const newMonthlyRecord = {
      ...monthlyRecord,
      [month]: !monthlyRecord[month],
    };

    form.setValue("monthlyRecord", newMonthlyRecord);
  };

  useEffect(() => {
    if (inspectionId) {
      getInspectionData();
    }

    getUserList();
  }, [inspectionId, getInspectionData, getUserList]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // If userId is exist, use userId as reference, otherwise use NIK as reference
    // used for create or edit user data
    const reference = inspectionId ? inspectionId : data.TTDId;

    try {
      setFormStatus("submitting");

      const TTDPayload = {
        ...data,
        name: userDropdown.find((user) => user.userId === data.userId)?.name,
        updatedAt: serverTimestamp()
      }

      console.log(TTDPayload)

      // await setDoc(doc(db, DatabaseCollections.INSPECTIONS, reference), {
      //   ...inspectionPayload
      // });

      toast({
        description: inspectionId ? "Berhasil mengubah data!" : "Berhasil membuat data!",
        variant: "default"
      });

      // router.push("/dashboard/hasil-pemeriksaan");
      router.refresh();
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
    userDropdown,
    setSearchUser,
    handleCheckMonthlyRecord
  };
};

export default useTTDForm;
