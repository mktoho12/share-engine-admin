"use client"

import { useLoginForAccessToken } from "@/api"
import TokenStorage from "@/api/token-storage"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEventHandler, useEffect, useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {
    data: token,
    mutate: loginForAccessToken,
    isPending,
  } = useLoginForAccessToken()

  const login: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    loginForAccessToken({
      data: {
        username,
        password,
      },
    })
  }

  const router = useRouter()
  useEffect(() => {
    if (token?.access_token) {
      TokenStorage.saveToken(token)

      setTimeout(() => {
        router.push("/")
      }, 100)
    }
  }, [token, router])

  return (
    <main className="h-screen flex px-5 md:px-0 items-stretch">
      <section className="hidden md:block bg-none color-white w-[400px] h-full relative">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            width={100}
            height={100}
            alt="Share Engine"
            className="top-9 left-6 absolute w-32"
          />
        </Link>
        <video
          playsInline
          autoPlay
          loop
          muted
          src="/videos/login-sidebar.mp4"
          className="block w-full h-full object-cover pointer-events-none"
        />
        <span className="absolute text-white bottom-0 right-0 p-2 bg-black bg-opacity-60">
          by BACKGROUNDS2023 via{" "}
          <a
            href="https://pixabay.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Pixabay
          </a>
        </span>
      </section>
      <section className="w-full md:ml-24 flex flex-col justify-center md:max-w-[544px] md:pt-8 md:px-16">
        <h2 className="font-bold text-2xl mb-10">Sign in to Share Engine</h2>

        <form>
          <button
            type="submit"
            className="border rounded-full w-full border-gray-300 flex h-14 items-center px-6 justify-center gap-2 font-semibold"
          >
            <Image
              src="/images/icon/google.svg"
              width={18}
              height={18}
              alt="Google"
              role="img"
              className="mr-3"
            />
            Sign in with Google
          </button>
        </form>

        <hr
          className="relative my-8 overflow-visible border-none bg-gray-300 h-px text-gray-500 text-center
            after:content-['or_sign_in_with_username'] after:inline-block after:relative after:-top-3 after:text-sm
            after:px-4 after:bg-white"
        />

        <div>
          <form onSubmit={login}>
            <div className="flex flex-col gap-3">
              <fieldset>
                <label
                  htmlFor="login"
                  className="block mt-3.5 mb-1 text-sm font-bold"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="hint: Seasonal mackerel"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full border rounded-xl h-14 px-4 border-gray-300 font-semibold"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoFocus
                  tabIndex={1}
                />
              </fieldset>

              <fieldset>
                <label
                  htmlFor="password"
                  className="mt-3.5 mb-1 text-sm font-bold flex justify-between"
                >
                  Password
                  <a
                    href="/password_resets/new"
                    className="font-normal underline"
                  >
                    Forgot?
                  </a>
                </label>
                <input
                  type="password"
                  placeholder="hint: Not Companies Over..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border rounded-xl h-14 px-4 border-gray-300 font-semibold"
                  tabIndex={2}
                />
              </fieldset>
            </div>

            <button
              className="bg-black text-white font-semibold h-14 w-full mt-8 rounded-full text-sm disabled:bg-gray-300"
              disabled={isPending}
            >
              Sign In
            </button>

            <p className="mt-5 text-center text-sm">
              {"Don't have an account? "}
              <a href="/signup" className="underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
