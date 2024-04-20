import { Button } from "@/components/ui/button";
import Modal from "components/Modal";
import { TrashIcon } from "lucide-react";

const DeleteProfileModal = () => {
  return (
    <Modal
      Trigger={
        <Button variant={"destructive"} className="text-gray-600 py-1 px-3">
          <TrashIcon className="w-3 h-3 text-white" />
        </Button>
      }
      title="Konfirmasi Hapus Data"
    >
      <div className="space-y-4 gap-4 flex flex-col justify-end">
        <p>
          Apakah anda yakin ingin menghapus data ini?
        </p>
        <Button
          variant={"destructive"}
        >
          Hapus
        </Button>
      </div>

    </Modal>
  )
}

export default DeleteProfileModal;