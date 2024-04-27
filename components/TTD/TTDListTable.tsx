import { Link } from "next-view-transitions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

import { TtdType } from "type/ttd.type";
import MonthlyReportHeader from "./MonthlyReportHeader";

interface Props {
  TTDs: TtdType[];
}

const TTDListTable = ({ TTDs }: Props) => {
  return (
    <Table className="max-w-full">
      <MonthlyReportHeader />
      <TableBody>
        {TTDs.map((TTD) => (
          <>
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
                Object.values(TTD.monthlyStatus).map((status, index) => (
                  <TableCell className="text-center" key={index}>
                    {status ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-400" />}
                  </TableCell>
                ))
              }
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  )
}

export default TTDListTable;