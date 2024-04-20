import { Link } from "next-view-transitions";
import { format } from "date-fns";
import { id } from 'date-fns/locale'

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

const ProfileListTable = ({ profiles }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="overflow-auto font-medium relative">
          <TableHead className="font-medium text-black">Nama</TableHead>
          <TableHead className="font-medium text-black">JK</TableHead>
          <TableHead className="font-medium text-black">Sekolah</TableHead>
          <TableHead className="font-medium text-black">TTL</TableHead>
          <TableHead className="text-right font-medium text-black">NIK</TableHead>
          <TableHead className="font-medium text-black">Posyandu</TableHead>
          <TableHead className="font-medium text-black">Alamat</TableHead>
          <TableHead
            className="text-right font-medium text-black sticky right-0 z-10 bg-white">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {profiles.map((profile) => (
          <TableRow key={profile.nik}>
            <TableCell className="text-gray-600 text-nowrap max-w-[15rem] truncate">{profile.name}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{profile.sex}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{profile.school}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">
              {profile.birthPlace + ", " + profile.birthDate}
            </TableCell>
            <TableCell className="text-gray-600 text-right">{profile.nik}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{profile.posyandu}</TableCell>
            <TableCell className="text-gray-600 text-nowrap">{profile.address}</TableCell>
            <TableCell className="text-gray-600 sticky right-0 z-10 bg-white">
              <div className="flex gap-2">
                <Link href={`/dashboard/profil/form?id=${profile.nik}`}>
                  <Button variant={"outline"} className="text-gray-600 py-1 px-3">
                    <PencilIcon className="w-3 h-3" />
                  </Button>
                </Link>
                <DeleteProfileModal selectedProfile={profile} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProfileListTable;