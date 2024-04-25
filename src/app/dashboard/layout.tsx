"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ViewTransitions } from 'next-view-transitions'

import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import Snackbar from "components/Snackbar";
import MobileSidebar from "components/MobileSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const loginCookie = typeof window !== "undefined" && window.document ?
    document.cookie.split('; ').find(row => row.startsWith('login')) : "";

  useEffect(() => {
    if (!loginCookie) router.push("/");
    if (pathname === "/dashboard") router.push("/dashboard/hasil-pemeriksaan");
  }, [pathname, router, loginCookie]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <ViewTransitions>
        <Sidebar />
        <div className="flex flex-col">
          <Navbar>
            <MobileSidebar />
          </Navbar>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
            {loginCookie ? children : <></>}
          </main>
        </div>
        <Snackbar />
      </ViewTransitions>
    </div>
  );
}
