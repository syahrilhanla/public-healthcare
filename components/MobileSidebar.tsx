import Link from "next/link";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { sidebarLinks } from "lib/sidebarLinks";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col max-w-[70dvw]">
          <nav className="grid gap-2 text-lg font-medium">
            {sidebarLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={
                  `mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl
                  text-muted-foreground hover:text-foreground ${pathname === link.href ? 'bg-muted' : ''}`
                }
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar