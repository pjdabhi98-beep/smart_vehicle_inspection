import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Vehicle Inspection",
  description: "Vehicle Inspection Management System",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-100">
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white">

            {/* Logo / Title */}
            <div className="border-b border-gray-700 p-6">
              <h1 className="text-xl font-bold">
                Smart Vehicle
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Inspection System
              </p>
            </div>

            {/* Navigation */}
            <nav className="p-4">

              <Link
                href="/dashboard"
                className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
              >
                📊 Dashboard
              </Link>

              <Link
                href="/vehicles"
                className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
              >
                🚗 Vehicles
              </Link>

              <Link
                href="/inspections"
                className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
              >
                🔍 Inspections
              </Link>

              <Link
                href="/maintenance"
                className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
              >
                �️ Maintenance
              </Link>

            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}