"use client";

import { Inter } from "next/font/google";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import Snackbar from "components/Snackbar";
import MobileSidebar from "components/MobileSidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col">
            <Navbar>
              <MobileSidebar />
            </Navbar>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
              {children}
            </main>
          </div>
          <Snackbar />
        </div>
      </body>

    </html>
  );
}
