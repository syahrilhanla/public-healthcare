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
  january: z.boolean().optional(),
  february: z.boolean().optional(),
  march: z.boolean().optional(),
  april: z.boolean().optional(),
  may: z.boolean().optional(),
  june: z.boolean().optional(),
  july: z.boolean().optional(),
  august: z.boolean().optional(),
  september: z.boolean().optional(),
  october: z.boolean().optional(),
  november: z.boolean().optional(),
  december: z.boolean().optional(),
});

const recordSchema = z.object({
  year: z.string(),
  monthlyRecord: monthlyRecord,
});

const schema = z.object({
  userId: z.string().default(""),
  year: z.string().default(""),
  TTDId: z.string(),
  records: z.array(recordSchema),
});

const useTTDForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      TTDId: "",
      records: []
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

  const TTDId = useSearchParams().get("id");

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

  const getUserTTDData = useCallback(async () => {
    if (!TTDId) return;

    try {
      setFormStatus("loading");
      const docRef = doc(db, DatabaseCollections.TTDS, TTDId);
      const docSnap = await getDoc(docRef);

      console.log(docSnap.data());
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
  }, [TTDId, form]);

  const handleCheckMonthlyRecord = (month: keyof typeof monthlyRecord, year: string) => {
    const records = form.getValues("records");
    const recordIndex = records.findIndex(record => record.year === year);

    if (recordIndex !== -1) {
      const record = records[recordIndex];
      const monthValue = month as keyof typeof record.monthlyRecord;

      const newMonthlyRecord = {
        ...record.monthlyRecord,
        [monthValue]: !record.monthlyRecord[monthValue],
      };

      const updatedRecord = {
        ...record,
        monthlyRecord: newMonthlyRecord,
      };

      const updatedRecords = records.map((record, index) =>
        index === recordIndex ? updatedRecord : record
      );

      form.setValue("records", updatedRecords);
    }
  };

  const handleDeleteRecord = (year: string) => {
    const records = form.getValues("records");

    // Filter out the record with the specified year
    const updatedRecords = records.filter(record => record.year !== year);

    form.setValue("records", updatedRecords);
  };

  useEffect(() => {
    if (TTDId) {
      getUserTTDData();
    }

    getUserList();
  }, [TTDId, getUserTTDData, getUserList]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // If userId is exist, use userId as reference, otherwise use NIK as reference
    // used for create or edit user data
    const reference = TTDId ? TTDId : data.userId;

    try {
      setFormStatus("submitting");

      const TTDPayload = {
        ...data,
        TTDId: data.userId,
        name: userDropdown.find((user) => user.userId === data.userId)?.name,
        updatedAt: serverTimestamp(),
        years: data.records.map(record => record.year),
        records: data.records.map(record => ({
          ...record,
          monthlyRecord: Object.fromEntries(
            Object.entries(record.monthlyRecord).map(([key, value]) => [
              key,
              value === undefined ? null : value,
            ])
          ),
        })),
      }

      await setDoc(doc(db, DatabaseCollections.TTDS, reference), {
        ...TTDPayload
      });

      toast({
        description: TTDId ? "Berhasil mengubah data!" : "Berhasil membuat data!",
        variant: "default"
      });

      router.push("/dashboard/ttd");
      router.refresh();
    } catch (error) {
      console.error("Error to create/edit inspection data", error);

      toast({
        title: TTDId ? "gagal mengubah data!" : "Gagal membuat data!",
        description: "Silahkan coba lagi",
        variant: "destructive"
      });
    } finally {
      setFormStatus("editing");
    }
  }

  return {
    form,
    records: form.watch("records"),
    onSubmit,
    formStatus,
    userDropdown,
    setSearchUser,
    handleCheckMonthlyRecord,
    handleDeleteRecord
  };
};

export default useTTDForm;

export const initialMonthlyRecord = {
  january: undefined,
  february: undefined,
  march: undefined,
  april: undefined,
  may: undefined,
  june: undefined,
  july: undefined,
  august: undefined,
  september: undefined,
  october: undefined,
  november: undefined,
  december: undefined,
}

export const initialRecords = {
  year: "",
  monthlyRecord: initialMonthlyRecord
}
