"use client"

import Providers from "@/lib/providers"
import localFont from "next/font/local"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import "./globals.css"

const monaSans = localFont({
  src: "../fonts/Mona-Sans.woff2",
  weight: "200 900",

  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Share Engine</title>
      </head>

      <body
        className={twMerge(monaSans.className, navOpen && "overflow-hidden")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
