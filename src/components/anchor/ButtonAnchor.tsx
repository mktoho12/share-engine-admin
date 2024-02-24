import Link from "next/link"
import { twMerge } from "tailwind-merge"

type Props = Parameters<typeof Link>[0] & {
  theme?: "primary" | "normal" | "danger"
  disabled?: boolean
}

const themes = {
  primary: "bg-gray-900 text-gray-100",
  normal: "bg-gray-100 text-gray-900 border border-gray-400",
  danger: "bg-red-500 text-white",
}

export default function ButtonAnchor({
  href,
  className,
  children,
  disabled,
  theme = "normal",
}: Props) {
  return (
    <Link
      className={twMerge(
        "w-fit font-semibold rounded-full text-sm disabled:bg-gray-300 grid place-items-center px-2",
        themes[theme],
        disabled && "pointer-events-none bg-gray-300 text-gray-500",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
