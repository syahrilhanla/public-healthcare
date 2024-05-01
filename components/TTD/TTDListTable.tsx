import React from "react";
import { Link } from "next-view-transitions";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

import { TtdType } from "type/ttd.type";
import MonthlyReportHeader from "./MonthlyReportHeader";

interface Props {
  TTDs: TtdType[];
}

const TTDListTable = ({ TTDs, selectedYear = new Date().getFullYear() }: Props) => {
  return (
    <Table className="max-w-full">
      <MonthlyReportHeader />
      <TableBody>
        {TTDs.map((TTD) => (
          <TableRow key={TTD.ttdId}>
            <TableCell className="w-[18rem] text-gray-600 text-nowrap truncate">
              <Link href={`/dashboard/ttd/form?id=${TTD.nik}`}>
                <div className="grid gap-0.5">
                  {TTD.name}
                  <span className="text-sm text-gray-400">{TTD.nik}</span>
                </div>
              </Link>
            </TableCell>
            {
              TTD.records.map((record, index) => (
                <React.Fragment key={index}>
                  {Object.keys(record.monthlyRecord)
                    .sort((a, b) => (
                      new Date(`1970, ${a}, 1`)!.getTime()
                      - new Date(`1970, ${b}, 1`)!.getTime()))
                    .map((month, index) => {
                      const status = record.monthlyRecord[month as keyof typeof record.monthlyRecord];
                      return (
                        <TableCell className="text-center" key={month}>
                          {
                            status
                              ? <Check className="h-4 w-4 text-green-500" />
                              : status === null || status === undefined
                                ? <span className="text-gray-400">-</span>
                                : <X className="h-4 w-4 text-red-400" />
                          }
                        </TableCell>
                      );
                    })}
                </React.Fragment>
              ))
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TTDListTable;