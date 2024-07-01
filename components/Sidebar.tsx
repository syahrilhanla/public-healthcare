import { Link } from "next-view-transitions";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "lib/sidebarLinks";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const handleSignOut = () => {
    document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  return (
    <div className="h-screen hidden bg-muted/40 md:block">
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

        <Link
          href={"/"}
          className={`flex items-center justify-between gap-3 border-t py-4 px-4 text-red-500 transition-all hover:text-red-600 duration-300 hover:bg-red-50`}
          onClick={handleSignOut}
        >
          Sign Out <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;