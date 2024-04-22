"use client"

import { useState } from "react";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "lib/firebase.sdk";

import Modal from "components/Modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { TrashIcon } from "lucide-react";

import { Profile } from "type/profile.type";

interface Props {
  selectedProfile: Profile;
}

const DeleteProfileModal = ({ selectedProfile }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", selectedProfile.nik));

      toast({
        description: "Data berhasil dihapus!",
        variant: "default",
      });

      setOpen(false);
    } catch (error) {
      console.error("Error removing document: ", error);

      toast({
        description: "Gagal menghapus data!",
        variant: "destructive",
        action: <ToastAction
          altText="Coba lagi"
          onClick={async () => {
            await deleteDoc(doc(db, "users", selectedProfile.nik))
          }}
        >Coba lagi
        </ToastAction>,
      });
    }
  }

  return (
    <Modal
      Trigger={
        <Button variant={"destructive"} className="text-gray-600 py-1 px-3">
          <TrashIcon className="w-3 h-3 text-white" />
        </Button>
      }
      title="Konfirmasi Hapus Data"
      openState={{ open, setOpen }}
    >
      <div className="w-full space-y-4 gap-1 flex flex-col justify-end">
        <p>
          Apakah anda yakin ingin menghapus data ini?
        </p>
        <div className="grid gap-1 text-slate-500">
          <p>
            {selectedProfile.name}
          </p>
          <p>
            {selectedProfile.nik}
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

export default DeleteProfileModal;