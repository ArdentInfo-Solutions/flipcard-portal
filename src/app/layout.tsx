import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* <nav className="bg-gray-800 text-white p-4">
              <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                  Social Media App
                </Link>
                <div className="space-x-4">
                  <Link href="/">Home</Link>
                  <Link href="/images">Images</Link>
                  <Link href="/upload/webitem">Upload Web Item</Link>
                  <Link href="/upload/socialmediapost">Upload Social Media Post</Link>
                  <Link href="/profile">Profile</Link>
                </div>
              </div>
            </nav> */}
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}