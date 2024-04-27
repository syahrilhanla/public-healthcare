import {
  BarChart2,
  HeartPulseIcon,
  Speech,
  ClipboardPlus,
  BookMarked,
  Users,
  UserCog
} from "lucide-react";

export const sidebarLinks = [
  { href: '/dashboard/hasil-pemeriksaan', text: 'Hasil Pemeriksaan', icon: <BarChart2 className="h-5 w-5" /> },
  { href: '/dashboard/ttd', text: 'Tablet Tambah Darah', icon: <HeartPulseIcon className="h-5 w-5" /> },
  { href: '/dashboard/konsultasi', text: 'Konsultasi', icon: <Speech className="h-5 w-5" /> },
  { href: '/dashboard/materi', text: 'Materi Penyuluhan', icon: <BookMarked className="h-5 w-5" /> },
  { href: '/dashboard/profil', text: 'Profil', icon: <Users className="h-5 w-5" /> },
  { href: '/dashboard/pengaturan', text: 'Pengaturan Admin', icon: <UserCog className="h-5 w-5" /> }
];