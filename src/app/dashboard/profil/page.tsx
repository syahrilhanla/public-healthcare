import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useProfileList from "components/Profile/hooks/useProfileList";

const ProfileList = async () => {
  const profiles = await useProfileList();

  return (
    <div className="grid gap-4 px-2 lg:px-6">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Profil
      </h1>

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
          </TableRow>
        </TableHeader>
        <TableBody >
          {profiles.map((profile) => (
            <TableRow key={profile.NIK}>
              <TableCell className="text-gray-600  text-nowrap max-w-[7rem]">{profile.fullName}</TableCell>
              <TableCell className="text-gray-600 text-nowrap">{profile.sex}</TableCell>
              <TableCell className="text-gray-600">{profile.birthplace}</TableCell>
              <TableCell className="text-gray-600">{profile.birthplace}</TableCell>
              <TableCell className="text-gray-600 text-right">{profile.NIK}</TableCell>
              <TableCell className="text-gray-600">{profile.posyandu}</TableCell>
              <TableCell className="text-gray-600">{profile.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProfileList;