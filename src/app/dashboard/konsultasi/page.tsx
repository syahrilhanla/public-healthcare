import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import ConsultingListTable from "components/Consult/ConsultingListTable";

import { PlusIcon } from "lucide-react";
import ConsultingFilter from "components/Consult/ConsultingFilter";
import PosyanduFilter from "components/PosyanduFilter";

interface Props {
  searchParams: {
    posyandu: string;
    konsultasi: string;
  }
}

const ConsultingList = async ({ searchParams }: Props) => {
  return (
    <div className="grid gap-4 px-2 lg:px-6">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Konsultasi
      </h1>

      <div className="w-full lg:flex lg:justify-end gap-4">
        <ConsultingFilter selectedConsultation={searchParams.konsultasi} />
        <PosyanduFilter selectedPosyandu={searchParams.posyandu} />
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