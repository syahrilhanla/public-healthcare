import { Link } from "next-view-transitions";

import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { sidebarLinks } from "lib/sidebarLinks";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {
  const pathname = usePathname();
  const handleSignOut = () => {
    document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

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
          <nav className="h-screen grid gap-2 text-lg font-medium content-between">
            <div className="grid gap-2">
              {sidebarLinks.map((link, index) => (
                <SheetTrigger asChild key={index}>
                  <Link
                    key={index}
                    href={link.href}
                    className={
                      `mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl
                    text-muted-foreground hover:text-foreground 
                    ${pathname === link.href ? 'bg-muted' : ''}`
                    }
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                </SheetTrigger>
              ))}
            </div>

            <Link
              href={"/"}
              className={`flex items-center justify-between gap-3 border-t py-4 px-4 text-red-500 transition-all hover:text-red-600 duration-300 hover:bg-red-50`}
              onClick={handleSignOut}
            >
              Sign Out <LogOut className="h-5 w-5" />
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar