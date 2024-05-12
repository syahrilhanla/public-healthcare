"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useQueryString } from "lib/useQueryString";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  selectedYear: number;
}

const YearFilter = ({ selectedYear }: Props) => {
  const { createQueryString } = useQueryString();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600
            focus-visible:outline-gray-600 focus-visible:ring-0 focus-visible:ring-transparent"
        >
          {selectedYear ? selectedYear : "Pilih Tahun"}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-48 overflow-auto">
        <div className="grid gap-1 text-center ">
          {
            Array.from({ length: 11 }, (_, i) => 2023 + i).map((year) => (
              <DropdownMenuItem
                key={year}
                className="hover:bg-gray-100 text-gray-600 hover:text-gray-800
                  duration-300 cursor-pointer"
                onClick={() => createQueryString("year", String(year))}
              >
                {year}
              </DropdownMenuItem>
            ))
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default YearFilter