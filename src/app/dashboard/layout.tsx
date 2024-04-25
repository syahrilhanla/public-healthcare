"use client";

import { useEffect, useState } from "react";
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
  const [loginCookie, setLoginCookie] = useState<undefined | string>("");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookie = typeof window !== "undefined" && window.document ?
        document.cookie.split('; ').find(row => row.startsWith('login')) : "";

      setLoginCookie(cookie || undefined);
    }
  }, []);

  useEffect(() => {
    if (loginCookie === undefined) router.push("/");
  }, [loginCookie]);

  useEffect(() => {
    if (pathname === "/dashboard") router.push("/dashboard/hasil-pemeriksaan");
  }, [pathname, router]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <ViewTransitions>
        <Sidebar />
        <div className="flex flex-col">
          <Navbar>
            <MobileSidebar />
          </Navbar>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
            {loginCookie ? children : <>no cookie</>}
          </main>
        </div>
        <Snackbar />
      </ViewTransitions>
    </div>
  );
}
