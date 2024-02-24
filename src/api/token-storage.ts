"use client"

import { Token } from "./model"

// アクセストークンをセッションストレージに保存するキー
const ACCESS_TOKEN_KEY = "token"

class TokenStorage {
  static getToken() {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY)

    if (!token) {
      return undefined
    }

    try {
      return JSON.parse(token) as Token
    } catch (e) {
      console.error("Failed to parse token", e)
      return undefined
    }
  }

  static saveToken(token: Token) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token))
  }

  static clearToken() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  }
}

export default TokenStorage
