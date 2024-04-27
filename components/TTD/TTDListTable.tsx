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

interface Props {
  TTDs: TtdType[];
}

const TTDListTable = ({ TTDs }: Props) => {
  return (
    <Table className="max-w-full">
      <TableHeader>
        <TableRow className="overflow-auto font-medium relative">
          <TableHead className="font-medium text-black" rowSpan={2}>Nama</TableHead>
          <TableHead className="font-medium text-black align-middle text-center"
            rowSpan={1}
            colSpan={12}
          >
            Pemantauan Bulanan
          </TableHead>
        </TableRow>
        <TableRow className="overflow-auto font-medium relative">
          <TableHead className="font-medium text-black" rowSpan={1}>Jan</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Feb</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Mar</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Apr</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Mei</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Jun</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Jul</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Agu</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Sep</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Okt</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Nov</TableHead>
          <TableHead className="font-medium text-black" rowSpan={1}>Des</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
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