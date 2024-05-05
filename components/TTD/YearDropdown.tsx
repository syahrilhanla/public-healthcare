import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Link } from "next-view-transitions";

interface Props {
  selectedYear: number;
}

const YearDropdown = ({ selectedYear }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={"outline"}
          className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
        >
          {selectedYear ? selectedYear : "Pilih Tahun"}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-48 overflow-auto">
        <DropdownMenuSeparator />
        <div className="grid gap-1 text-center ">
          {
            Array.from({ length: 11 }, (_, i) => 2023 + i).map((year) => (
              <Link href={`/dashboard/ttd?year=${year}`} key={year}>
                <div className="px-4 py-1.5 hover:bg-muted duration-200 rounded-md">
                  {year}
                </div>
              </Link>
            ))
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default YearDropdown