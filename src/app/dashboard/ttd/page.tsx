import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import TTDListTable from "components/TTD/TTDListTable";

import useTTDList from "components/TTD/hooks/useTTDList";

import { PlusIcon } from "lucide-react";

interface Props {
  searchParams: {
    year: string;
  }
}

const TTDList = async ({ searchParams }: Props) => {
  const TTDs = await useTTDList(searchParams);

  return (
    <div className="grid gap-4 px-2 lg:px-6">
      <h1
        className="text-2xl font-semibold text-center lg:text-left text-gray-600"
      >
        Pemantauan TTD Remaja Putri
      </h1>

      <div className="w-full lg:flex gap-4 lg:justify-end">
        <Button
          variant={"outline"}
          className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
        >
          Pilih Tahun
        </Button>

        <Link href={"/dashboard/ttd/form"}>
          <Button variant={"outline"}
            className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
          >
            <PlusIcon className="h-4 w-4" />
            Tambah Data
          </Button>
        </Link>
      </div>

      <TTDListTable TTDs={TTDs} />
    </div>
  )
}

export default TTDList;