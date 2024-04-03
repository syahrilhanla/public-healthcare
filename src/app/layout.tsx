"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Snackbar from "components/Snackbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="relative">
          <Snackbar />
        </div>
      </body>
    </html>
  );
}
