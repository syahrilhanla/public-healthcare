import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "lib/sidebarLinks";

const Sidebar = () => {
  const pathname = usePathname();

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
            {sidebarLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary ${pathname === link.href ? 'bg-muted' : ''}`}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;