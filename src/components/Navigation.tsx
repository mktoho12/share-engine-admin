import Link from "next/link"
import { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends HTMLAttributes<HTMLDivElement> {
  show?: boolean
  close?: () => void
}

export default function Navigation({ show = false, close }: Props) {
  return (
    <nav
      className={twMerge(
        "fixed top-14 -left-3 px-4 w-full min-h-screen bg-gray-50 border-r border-r-gray-500 transition-transform duration-300 z-10 transform translate-x-0 md:translate-x-0 md:w-80",
        !show && "-translate-x-full"
      )}
    >
      <ul className="py-4 pl-3">
        <li>
          <Link href="/user" onClick={close}>
            ユーザー
          </Link>
        </li>
        <li>
          <a href="/upload">ファイルアップロード</a>
        </li>
      </ul>
    </nav>
  )
}
