"use client"

import { useReadUsers } from "@/api"
import TokenStorage from "@/api/token-storage"

export default function Test() {
  const { data: users, refetch } = useReadUsers()
  const logout = () => {
    TokenStorage.clearToken()
  }

  return (
    <p>
      {JSON.stringify({ users })}
      <button onClick={() => refetch()}>refetch</button>
      <button onClick={logout}>Logout</button>
    </p>
  )
}
