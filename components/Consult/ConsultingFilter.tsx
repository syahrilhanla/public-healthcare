"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { useQueryString } from "lib/useQueryString";

import { ConsultType, consultingTypes } from "lib/reusableValues";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  selectedConsultation: string;
}

const ConsultingFilter = ({ selectedConsultation }: Props) => {
  const {
    createQueryString,
    removeQueryString
  } = useQueryString();

  useEffect(() => {
    if (selectedConsultation !== ConsultType.HEALTH_CONTROL)
      removeQueryString("keluhan");
  }, [selectedConsultation]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600
            focus-visible:outline-gray-600 focus-visible:ring-0 focus-visible:ring-transparent"
        >
          {selectedConsultation ? selectedConsultation : "Jenis Konsultasi"}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-52">
        <div className="grid gap-1 text-left">
          {
            consultingTypes.map((consult) => (
              <DropdownMenuItem
                key={consult}
                className="hover:bg-gray-100 text-gray-600 hover:text-gray-800
                  duration-300 cursor-pointer"
                onClick={() => createQueryString("konsultasi", consult)}
              >
                {consult}
              </DropdownMenuItem>
            ))
          }
          <DropdownMenuItem
            className="mt-1 py-2 bg-red-100 text-red-400 duration-300
              font-semibold hover:bg-opacity-100 bg-opacity-80 hover:cursor-pointer"
            onClick={() => removeQueryString("konsultasi")}
          >
            <p className="w-full text-center">
              Hapus Filter
            </p>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default ConsultingFilter