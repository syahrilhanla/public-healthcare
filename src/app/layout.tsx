import { Inter } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ViewTransitions>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </ViewTransitions>
    </html>
  );
}
