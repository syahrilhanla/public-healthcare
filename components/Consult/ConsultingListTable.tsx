import { Link } from "next-view-transitions";

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

import { Consult } from "type/consult.type";

interface Props {
  consults: Consult[];
}

const ConsultingListTable = ({ consults }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="overflow-auto font-medium relative">
          <TableHead className="font-medium text-black">Nama</TableHead>
          <TableHead className="font-medium text-black">Tanggal</TableHead>
          <TableHead className="font-medium text-black">Posyandu</TableHead>
          <TableHead className="font-medium text-black">Konsultasi</TableHead>
          <TableHead
            className="text-right font-medium text-black sticky right-0 z-10 bg-white">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {consults.map((consult) => (
          <TableRow key={consult.userId}>
            <TableCell className="text-gray-600 text-nowrap max-w-[15rem] truncate">{consult.name}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{consult.updatedAt}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{consult.posyandu}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{consult.type}</TableCell>
            <TableCell className="text-gray-600 sticky right-0 z-10 bg-white">
              <div className="flex gap-2 justify-end">
                <Link href={`/dashboard/profil/form?id=${consult.userId}`}>
                  <Button variant={"outline"} className="text-gray-600 py-1 px-3">
                    <PencilIcon className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ConsultingListTable;