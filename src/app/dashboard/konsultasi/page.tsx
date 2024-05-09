import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import ConsultingListTable from "components/Consult/ConsultingListTable";

import { PlusIcon } from "lucide-react";

const ConsultingList = async () => {
  return (
    <div className="grid gap-4 px-2 lg:px-6">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Konsultasi
      </h1>

      <div className="w-full lg:flex lg:justify-end">
        <Link href={"/dashboard/konsultasi/form"}>
          <Button variant={"outline"}
            className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
          >
            <PlusIcon className="h-4 w-4" />
            Tambah Data
          </Button>
        </Link>
      </div>

      <ConsultingListTable />
    </div>
  )
}

export default ConsultingList;