"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { doc, deleteDoc } from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";

import Modal from "components/Modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  selectedTTD: {
    userId: string;
    name: string;
  };
}

const DeleteTTDModal = ({ selectedTTD }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, DatabaseCollections.TTDS, selectedTTD.userId));

      toast({
        description: "Data berhasil dihapus!",
        variant: "default",
      });

      setOpen(false);
      router.push("/dashboard/ttd");
      router.refresh();
    } catch (error) {
      console.error("Error removing document: ", error);

      toast({
        description: "Gagal menghapus data!",
        variant: "destructive",
      });
    }
  }

  return (
    <Modal
      Trigger={
        <Button
          variant={"outline"}
          className="py-1 px-4 text-red-500 border border-red-500 
            hover:text-red-500 hover:bg-red-50 duration-300"
        >
          Hapus Data
        </Button>
      }
      title="Konfirmasi Hapus Data"
      openState={{ open, setOpen }}
    >
      <div className="w-full space-y-4 gap-1 flex flex-col justify-end">
        <p>
          Apakah anda yakin ingin menghapus data TTD ini?
        </p>
        <div className="grid gap-1 text-slate-500">
          <p>
            {selectedTTD.name}
          </p>
        </div>

        <Button
          variant={"destructive"}
          onClick={handleDelete}
        >
          Hapus
        </Button>
      </div>

    </Modal>
  )
}

export default DeleteTTDModal;