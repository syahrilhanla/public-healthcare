import { Inter } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster";
import { revalidatePath } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  revalidatePath("layout");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ViewTransitions>
          {children}
          <Toaster />
        </ViewTransitions>
      </body>
    </html>
  );
}
