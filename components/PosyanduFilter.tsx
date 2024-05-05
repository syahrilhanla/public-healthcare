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

import posyanduList from "lib/posyanduList";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  selectedPosyandu: string;
}

const PosyanduFilter = ({ selectedPosyandu }: Props) => {
  const {
    createQueryString,
    removeQueryString
  } = useQueryString();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
        >
          {selectedPosyandu ? selectedPosyandu : "Pilih Posyandu"}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-52 overflow-auto">
        <DropdownMenuSeparator />
        <div className="grid gap-1 text-left">
          {
            posyanduList.map((posyandu) => (
              <DropdownMenuItem
                key={posyandu}
                className="hover:bg-gray-100 text-gray-600 hover:text-gray-800
                  duration-300 cursor-pointer"
                onClick={() => createQueryString("posyandu", posyandu)}
              >
                {posyandu}
              </DropdownMenuItem>
            ))
          }
          <DropdownMenuItem
            className="mt-1 py-2 bg-red-100 text-red-400 duration-300
              text-center font-semibold hover:bg-opacity-100 bg-opacity-80 hover:cursor-pointer"
            onClick={() => removeQueryString("posyandu")}
          >
            Hapus Filter
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default PosyanduFilter