"use client"

import { useReadUser, useReadUsers } from "@/api"
import Image from "next/image"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export default function Page() {
  const [userId, setUserId] = useState<number>()
  const { data: users } = useReadUsers()
  const { data: user, refetch: fetchUser } = useReadUser(userId ?? 0, {
    query: { enabled: false },
  })

  useEffect(() => {
    if (userId) fetchUser()
  }, [fetchUser, userId])

  return (
    <main className="p-2 text-sm max-w-screen-md">
      <h1 className="text-2xl font-bold py-2">ユーザー管理</h1>
      {users &&
        users.map((user, index) => (
          <div
            key={user.id}
            className={twMerge(
              "flex gap-2 items-center p-2 md:cursor-pointer",
              index % 2 ? "bg-slate-100" : "bg-slate-200"
            )}
            onClick={() => setUserId(user.id)}
          >
            <div className="text-xl">{user.name}</div>
          </div>
        ))}

      {user && (
        <div className="mt-4 flex flex-col gap-4">
          {user.own_items && user.own_items?.length > 0 && (
            <div>
              <h3 className="text-xl">{user.name}のモノ</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {user.own_items.map(item => (
                  <div key={item.id} className="rounded-b shadow">
                    <Image
                      src={item.image_url1!}
                      alt={item.name}
                      width={100}
                      height={100}
                      objectFit="cover"
                      className="w-full"
                    />
                    <div className="p-2">
                      <div className="flex justify-between">
                        <div>{item.name}</div>
                        <div>{item.price}円</div>
                      </div>
                      <div
                        className={twMerge(
                          "text-slate-500",
                          item.available ? "text-blue-700" : "text-slate-500"
                        )}
                      >
                        {item.available ? "available" : "busy"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {user.rent_items && user.rent_items?.length > 0 && (
            <div>
              <h3 className="text-xl">{user.name}が借りてるモノ</h3>
              <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
                {user.rent_items.map(item => (
                  <div key={item.id} className="rounded-b shadow">
                    <Image
                      src={item.image_url1!}
                      alt={item.name}
                      width={100}
                      height={100}
                      objectFit="cover"
                      className="w-full"
                    />
                    <div className="p-2">
                      <div className="flex justify-between">
                        <div>{item.name}</div>
                        <div>{item.price}円</div>
                      </div>
                      <div>{item.owner_id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
