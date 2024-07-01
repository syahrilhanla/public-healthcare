import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";

const Navbar = ({ children }: Readonly<{
  children: React.ReactNode
}>
) => {
  return (
    <header className="sticky top-0 flex h-full items-center md:justify-end justify-between gap-4 border-b bg-muted/40 px-4 py-4 lg:h-[60px] lg:px-6">
      {/* Mobile sidebar trigger */}
      {
        children
      }
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </header>
  )
}

export default Navbar