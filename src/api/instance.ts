"use client"

import { default as Axios, AxiosError, AxiosRequestConfig } from "axios"
import TokenStorage from "./token-storage"

/**
 * APIエンドポイント用のaxiosインスタンス
 */
export const AXIOS_INSTANCE_FOR_API = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_PATH}`,
})

/**
 * リクエスト実行前に追加で入れる処理
 */
AXIOS_INSTANCE_FOR_API.interceptors.request.use(
  async config => {
    // 認証が不要なリクエストはそのまま返す
    if (config.url === "/api/v1/login" && config.method === "post") {
      return config
    }

    // 保存されているアクセストークンを取得
    const accessToken: string | null = TokenStorage.getToken()

    // アクセストークンが存在しない場合はログインページへリダイレクト
    if (!accessToken) {
      location.href = "/login"
    }

    // アクセストークンを取得できている場合（ログイン後の場合）はヘッダーに追加
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken!}`)
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * React Query経由でAPIを呼び出すときのカスタムaxiosインスタンス
 *
 * @param {AxiosRequestConfig} config axiosのconfig
 */
export const apiInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()

  const promise = AXIOS_INSTANCE_FOR_API({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error: `cancel` does not exist on `Promise`
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}

/** APIエラー */
export type ErrorType<Error> = AxiosError<Error>

/** APIのリクエストbody */
export type BodyType<BodyData> = BodyData & { headers?: any }
