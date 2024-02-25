import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export default function Button({
  className,
  children,
  ...attrs
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        "min-w-48 min-h-14 font-semibold rounded bg-primary text-white text-sm disabled:bg-gray-300 grid place-items-center px-2 hover:bg-opacity-95 hover:shadow-lg transition-all disabled:text-gray-500 disabled:pointer-events-none",
        className
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
