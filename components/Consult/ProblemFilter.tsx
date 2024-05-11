"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { useQueryString } from "lib/useQueryString";

import { healthControlTypes } from "lib/reusableValues";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  selectedProblem: string;
}

// SPECIAL CASE: This component is used to filter the consultation type in HEALTH_CONTROL
const ProblemFilter = ({ selectedProblem }: Props) => {
  const {
    createQueryString,
    removeQueryString
  } = useQueryString();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600 
            focus-visible:outline-gray-600 focus-visible:ring-0 focus-visible:ring-transparent"
        >
          {selectedProblem ? selectedProblem : "Pilih Keluhan"}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-fit overflow-auto">
        <DropdownMenuSeparator />
        <div className="grid gap-1 text-left">
          {
            healthControlTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                className="hover:bg-gray-100 text-gray-600 hover:text-gray-800
                  duration-300 cursor-pointer"
                onClick={() => createQueryString("keluhan", type)}
              >
                {type}
              </DropdownMenuItem>
            ))
          }
          <DropdownMenuItem
            className="mt-1 py-2 bg-red-100 text-red-400 duration-300
              text-center font-semibold hover:bg-opacity-100 bg-opacity-80 hover:cursor-pointer"
            onClick={() => removeQueryString("keluhan")}
          >
            Hapus Filter
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default ProblemFilter