import Link from "next/link";
import Image from "next/image";
import {
  BarChart2,
  BookMarked,
  ClipboardPlus,
  HeartPulseIcon,
  Speech,
  UserCog,
  Users
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-4 font-semibold">
            <Image
              src="/img/logo.png"
              alt="Workflow"
              width={40}
              height={40}
            />
            <span className="text-nowrap">Puskesmas 9 Nopember</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
            >
              <BarChart2 className="h-5 w-5" />
              Hasil Pemeriksaan
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
            >
              <HeartPulseIcon className="h-5 w-5" />
              Tablet Tambah Darah
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-4 text-primary transition-all hover:text-primary"
            >
              <Speech className="h-5 w-5" />
              Konsultasi
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
            >
              <ClipboardPlus className="h-5 w-5" />
              Laporan
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
            >
              <BookMarked className="h-5 w-5" />
              Materi Penyuluhan
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-5 w-5" />
              Profil
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
            >
              <UserCog className="h-5 w-5" />
              Pengaturan Admin
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;