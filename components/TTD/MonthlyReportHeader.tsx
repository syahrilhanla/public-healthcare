import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MonthlyReportHeader = () => {
  return (
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
  )
}

export default MonthlyReportHeader;