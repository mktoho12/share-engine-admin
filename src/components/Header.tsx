"use client"

import TokenStorage from "@/api/token-storage"
import Image from "next/image"
import Link from "next/link"
import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react"
import Navigation from "./Navigation"
import ButtonAnchor from "./anchor/ButtonAnchor"

interface Props extends HTMLAttributes<HTMLDivElement> {
  navOpen?: boolean
  setNavOpen?: Dispatch<SetStateAction<boolean>>
}

export default function Header({ navOpen, setNavOpen }: Props) {
  const [token, setToken] = useState<string>()
  useEffect(() => {
    setToken(TokenStorage.getToken()?.access_token)
  }, [])

  const isLoggedIn = useMemo(() => !!token, [token])

  const [accountMemuOpen, setAccountMenuOpen] = useState(false)

  const logout = () => {
    TokenStorage.clearToken()
    setToken(undefined)
  }

  return (
    <header className="w-full h-14 bg-gray-300 border-b border-b-gray-500 bg-opacity-50 backdrop-blur fixed items-center px-4 flex gap-4 z-10">
      <button className="md:hidden">
        <Image
          src="/images/icon/menu.svg"
          width={28}
          height={28}
          alt="Menu"
          onClick={() => setNavOpen?.(prev => !prev)}
        />
      </button>
      <Link href="/" className="inline-flex grow items-center gap-2">
        <Image
          src="/images/icon/share-engine.png"
          width={28}
          height={28}
          alt="Share Engine"
        />
        Share Engine
      </Link>

      <div className="butons inline-flex gap-2 items-center">
        {isLoggedIn ? (
          <div className="relative flex items-center">
            <button onClick={() => setAccountMenuOpen(prev => !prev)}>
              <Image
                src="/images/icon/account.svg"
                width={36}
                height={36}
                alt="Account"
              />
            </button>
            {accountMemuOpen && (
              <div className="absolute w-[248px] right-0 top-10 border border-gray-300 bg-gray-50 pt-3">
                <ul className="border-b border-b-gray-300 flex flex-col gap-3 px-3 pb-3">
                  <li>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2"
                      onClick={() => setAccountMenuOpen(false)}
                    >
                      <Image
                        src="/images/icon/profile.svg"
                        alt="Profile"
                        width={20}
                        height={20}
                      />
                      Profile
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Image
                      src="/images/icon/items.svg"
                      alt="Items"
                      width={20}
                      height={20}
                    />
                    My Items
                  </li>
                  <li className="flex items-center gap-2">
                    <Image
                      src="/images/icon/settings.svg"
                      alt="Settings"
                      width={20}
                      height={20}
                    />
                    Account Settings
                  </li>
                </ul>
                <div className="p-3">
                  <button className="flex items-center gap-2" onClick={logout}>
                    <Image
                      src="/images/icon/logout.svg"
                      alt="Log Out"
                      width={20}
                      height={20}
                    />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <ButtonAnchor href="/signup" className="h-8 font-normal text-xs">
              Sign Up
            </ButtonAnchor>
            <ButtonAnchor href="/login" className="h-8 text-xs" theme="primary">
              Sign In
            </ButtonAnchor>
          </>
        )}
      </div>

      <Navigation show={navOpen} close={() => setNavOpen?.(false)} />
    </header>
  )
}
