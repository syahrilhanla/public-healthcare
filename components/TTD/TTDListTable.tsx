import { Link } from "next-view-transitions";

import DeleteInspectionModal from "components/Inspection/DeleteInspectionModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon } from "lucide-react";

import { Inspection } from "type/inspection.type";

interface Props {
  inspections: Inspection[];
}

const TTDListTable = ({ inspections }: Props) => {
  return (
    <Table className="max-w-full">
      <TableHeader>
        <TableRow className="overflow-auto font-medium relative">
          <TableHead className="font-medium text-black">Nama</TableHead>
          <TableHead className="font-medium text-black">Tanggal</TableHead>
          <TableHead className="text-right font-medium text-black">TB</TableHead>
          <TableHead className="text-right font-medium text-black">BB</TableHead>
          <TableHead className="text-right font-medium text-black">LP</TableHead>
          <TableHead className="text-right font-medium text-black">Lila</TableHead>
          <TableHead className="text-right font-medium text-black">Hb</TableHead>
          <TableHead className="text-right font-medium text-black">TD</TableHead>
          <TableHead
            className="text-right font-medium text-black sticky right-0 z-10 bg-white">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {inspections.map((inspection) => (
          <TableRow key={inspection.inspectionId}>
            <TableCell className="w-[18rem] text-gray-600 text-nowrap truncate">{inspection.name}</TableCell>
            <TableCell className="w-[10rem] text-gray-600 text-nowrap">{inspection.updatedAt}</TableCell>
            <TableCell className="w-[5rem] text-right text-gray-600 text-nowrap">{inspection.TB}</TableCell>
            <TableCell className="w-[5rem] text-right text-gray-600 text-nowrap">{inspection.BB}</TableCell>
            <TableCell className="w-[5rem] text-right text-gray-600">{inspection.LP}</TableCell>
            <TableCell className="w-[5rem] text-right text-gray-600 text-nowrap">{inspection.LILA || "-"}</TableCell>
            <TableCell className="w-[5rem] text-right text-gray-600 text-nowrap">{inspection.Hb || "-"}</TableCell>
            <TableCell className="w-[5rem] text-right text-gray-600 text-nowrap">{inspection.TD}</TableCell>
            <TableCell className="max-w-10 text-right text-gray-600 sticky right-0 z-10 bg-white">
              <div className="flex gap-2 w-full justify-end">
                <Link href={`/dashboard/hasil-pemeriksaan/form?id=${inspection.inspectionId}`}>
                  <Button variant={"outline"} className="text-gray-600 py-1 px-3">
                    <PencilIcon className="w-3 h-3" />
                  </Button>
                </Link>
                <DeleteInspectionModal selectedInspection={inspection} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TTDListTable;