import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import TTDListTable from "components/TTD/TTDListTable";

import useInspectionList from "components/Inspection/hooks/useInspectionList";

import { PlusIcon } from "lucide-react";

const TTDList = async () => {
  const inspections = await useInspectionList();

  return (
    <div className="grid gap-4 px-2 lg:px-6">
      <h1
        className="text-2xl font-semibold text-center lg:text-left text-gray-600"
      >
        Pemantauan Remaja Putri Meminum TTD (Tablet Tambah Darah)
      </h1>

      <div className="w-full lg:flex lg:justify-end">
        <Link href={"/dashboard/hasil-pemeriksaan/form"}>
          <Button variant={"outline"}
            className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
          >
            <PlusIcon className="h-4 w-4" />
            Tambah Data
          </Button>
        </Link>
      </div>

      <TTDListTable inspections={inspections} />
    </div>
  )
}

export default TTDList;