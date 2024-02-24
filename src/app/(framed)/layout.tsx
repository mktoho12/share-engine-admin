"use client"

import Header from "@/components/Header"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export default function FramedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />

      <div
        className={twMerge(
          "pt-14 md:ml-80",
          navOpen &&
            "pointer-events-none backdrop-blur bg-gray-100 bg-opacity-50"
        )}
      >
        {children}
      </div>

      {navOpen && (
        <div className="fixed w-full h-screen top-0 left-0 bg-white bg-opacity-50 backdrop-blur-sm"></div>
      )}
    </>
  )
}
