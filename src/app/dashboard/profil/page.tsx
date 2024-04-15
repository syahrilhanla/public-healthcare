import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProfileList = () => {
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
            <TableHead className="w-[200px] font-medium text-black">Nama</TableHead>
            <TableHead className="font-medium text-black">JK</TableHead>
            <TableHead className="font-medium text-black">Sekolah</TableHead>
            <TableHead className="font-medium text-black">TTL</TableHead>
            <TableHead className="text-right font-medium text-black">NIK</TableHead>
            <TableHead className="font-medium text-black">Posyandu</TableHead>
            <TableHead className="font-medium text-black">Alamat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          <TableRow>
            <TableCell className="text-gray-600">Test 1</TableCell>
            <TableCell className="text-gray-600 w-[7rem]">Perempuan</TableCell>
            <TableCell className="text-gray-600">SMA 2 Banjarmasin</TableCell>
            <TableCell className="text-gray-600">Banjarmasin, 12 Maret 2009</TableCell>
            <TableCell className="text-gray-600">2918273756448882</TableCell>
            <TableCell className="text-gray-600">Posyandu Remaja FRESH</TableCell>
            <TableCell className="text-gray-600">Jl. Pengambangan</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ProfileList;