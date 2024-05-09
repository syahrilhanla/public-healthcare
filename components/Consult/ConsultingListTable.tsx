import { Link } from "next-view-transitions";

import DeleteProfileModal from "components/Profile/DeleteProfileModal";
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

import { Profile } from "type/profile.type";

interface Props {
  profiles: Profile[];
}

const ConsultingListTable = () => {
  const consultingData = [
    {
      name: "Asep",
      date: "2021-09-01",
      posyandu: "Posyandu 1",
      consultation: "Konsultasi 1"
    },
    {
      name: "Budi",
      date: "2021-09-02",
      posyandu: "Posyandu 2",
      consultation: "Konsultasi 2"
    },
    {
      name: "Caca",
      date: "2021-09-03",
      posyandu: "Posyandu 3",
      consultation: "Konsultasi 3"
    },
    {
      name: "Dedi",
      date: "2021-09-04",
      posyandu: "Posyandu 4",
      consultation: "Konsultasi 4"
    },
    {
      name: "Euis",
      date: "2021-09-05",
      posyandu: "Posyandu 5",
      consultation: "Konsultasi 5"
    },
    {
      name: "Fafa",
      date: "2021-09-06",
      posyandu: "Posyandu 6",
      consultation: "Konsultasi 6"
    },
    {
      name: "Gaga",
      date: "2021-09-07",
      posyandu: "Posyandu 7",
      consultation: "Konsultasi 7"
    },
    {
      name: "Haha",
      date: "2021-09-08",
      posyandu: "Posyandu 8",
      consultation: "Konsultasi 8"
    },
    {
      name: "Ii",
      date: "2021-09-09",
      posyandu: "Posyandu 9",
      consultation: "Konsultasi 9"
    },
    {
      name: "Jaja",
      date: "2021-09-10",
      posyandu: "Posyandu 10",
      consultation: "Konsultasi 10"
    }
  ]

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
        {consultingData.map((data) => (
          <TableRow key={data.name}>
            <TableCell className="text-gray-600 text-nowrap max-w-[15rem] truncate">{data.name}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{data.date}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{data.posyandu}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{data.consultation}</TableCell>
            <TableCell className="text-gray-600 sticky right-0 z-10 bg-white">
              <div className="flex gap-2 justify-end">
                <Link href={`/dashboard/profil/form?id=${data.name}`}>
                  <Button variant={"outline"} className="text-gray-600 py-1 px-3">
                    <PencilIcon className="w-3 h-3" />
                  </Button>
                </Link>
                {/* <DeleteProfileModal selectedProfile={data} /> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ConsultingListTable;