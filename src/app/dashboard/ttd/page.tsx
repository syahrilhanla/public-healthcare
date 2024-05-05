import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import TTDListTable from "components/TTD/TTDListTable";
import YearFilter from "components/TTD/YearFilter";
import PosyanduFilter from "components/PosyanduFilter";

import useTTDList from "components/TTD/hooks/useTTDList";

import { PlusIcon } from "lucide-react";

interface Props {
  searchParams: {
    year: string;
    posyandu: string;
  }
}

const TTDList = async ({ searchParams }: Props) => {
  const TTDs = await useTTDList(searchParams);

  return (
    <div className="grid gap-4 px-2 lg:px-6">
      <div className="lg:flex gap-2 text-2xl font-semibold text-gray-600">
        <h1>
          Pemantauan TTD Remaja Putri
        </h1>
        <h1>
          {searchParams.posyandu ? `- ${searchParams.posyandu}` : ""}
        </h1>
      </div>

      <div className="w-full flex justify-between items-center">
        <h2 className="lg:text-2xl font-semibold text-lg text-slate-600">
          {searchParams.year ? searchParams.year : new Date().getFullYear()}
        </h2>

        <div className="lg:w-fit w-full flex gap-4 justify-end">
          <YearFilter selectedYear={Number(searchParams.year)} />
          <PosyanduFilter selectedPosyandu={searchParams.posyandu} />

          <Link href={"/dashboard/ttd/form"}>
            <Button variant={"outline"}
              className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
            >
              <PlusIcon className="h-4 w-4" />
              Tambah Data
            </Button>
          </Link>
        </div>
      </div>

      <TTDListTable TTDs={TTDs} selectedYear={
        searchParams.year ? Number(searchParams.year) :
          new Date().getFullYear()
      } />
    </div>
  )
}

export default TTDList;