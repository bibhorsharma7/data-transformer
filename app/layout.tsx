import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data ETL App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mt-10 flex flex-col items-center">
          <h1 className="text-xl font-bold">Data ETL App</h1>
        </div>
        {children}
      </body>
    </html>
  );
}
