<<<<<<< HEAD
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
=======
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import type React from "react"
import { ReduxProvider } from "../redux/provider"
import { SessionProvider } from "next-auth/react"
import NavBar from "../components/NavBar"
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Flipcard Portal",
  description: "A social media platform for sharing websites and images",
}
>>>>>>> fbab2be (commit code)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
<<<<<<< HEAD
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
=======
      <body className={`${inter.className} min-h-screen`}>
        <SessionProviderWrapper>
          <ReduxProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-1 pb-[60px] md:pb-0">{children}</div>
            </div>
          </ReduxProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}

>>>>>>> fbab2be (commit code)
