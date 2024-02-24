# Share Engine Admin Informal
シェアハウス住民がQiita Hackathonで作ったアプリ[Share Engine](https://github.com/EngineMaker/share-engine/)の非公式管理ツールです。


## Getting Started

```bash
gh repo clone mktoho12/share-engine-admin
cd share-engine-admin
./init.sh
```

依存ライブラリをインストール

```bash
bun i
```

pnpmのライブラリもないとorvalが動かないらしい。ひどい

```bash
pnpm i
```

Share EngineをチェックアウトしてAPIクライアントを生成

```bash
bun api:update
```

APIサーバーを起動

```bash
bun api:serve
```

フロントの`.env`ファイルを作成

```
cp .env-sample .env
```

フロントの開発サーバーを起動

```bash
bun dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
