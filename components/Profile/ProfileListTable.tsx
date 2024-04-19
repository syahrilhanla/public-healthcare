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
import { PencilIcon, TrashIcon } from "lucide-react";

import { Profile } from "type/profile.type";

interface Props {
  profiles: Profile[];
}

const ProfileListTable = ({ profiles }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="overflow-auto font-medium">
          <TableHead className="font-medium text-black">Nama</TableHead>
          <TableHead className="font-medium text-black">JK</TableHead>
          <TableHead className="font-medium text-black">Sekolah</TableHead>
          <TableHead className="font-medium text-black">TTL</TableHead>
          <TableHead className="text-right font-medium text-black">NIK</TableHead>
          <TableHead className="font-medium text-black">Posyandu</TableHead>
          <TableHead className="font-medium text-black">Alamat</TableHead>
          <TableHead className="text-right font-medium text-black">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {profiles.map((profile) => (
          <TableRow key={profile.NIK}>
            <TableCell className="text-gray-600  text-nowrap max-w-[7rem]">{profile.fullName}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{profile.sex}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{profile.birthplace}</TableCell>
            <TableCell className="text-gray-600">{profile.birthplace}</TableCell>
            <TableCell className="text-gray-600 text-right">{profile.NIK}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{profile.posyandu}</TableCell>
            <TableCell className="text-gray-600">{profile.address}</TableCell>
            <TableCell className="text-gray-600">
              <div className="flex gap-2">
                <Link href={`/dashboard/profil/form?id=${profile.NIK}`}>
                  <Button variant={"outline"} className="text-gray-600 py-1 px-3">
                    <PencilIcon className="w-3 h-3" />
                  </Button>
                </Link>
                <Button variant={"destructive"} className="text-gray-600 py-1 px-3">
                  <TrashIcon className="w-3 h-3 text-white" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProfileListTable;