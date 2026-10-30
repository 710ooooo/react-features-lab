# react-features-lab

React 18 / 19 で追加された機能を試すためのプレイグラウンド。
バージョンごとに独立したプロジェクトになっていて、それぞれ専用の Node バージョンの Docker イメージで動く。

| フォルダ | React | Node | Vite | URL |
| --- | --- | --- | --- | --- |
| `react18/` | 18.3.1 | 22 | 6 | http://localhost:5180 |
| `react19/` | 19.3.1 | 24 | 8 (+ React Compiler) | http://localhost:5190 |

## 起動

```sh
# 両方
docker compose up --build

# 片方だけ
docker compose up --build react19
```

`src/` を編集するとホットリロードされる。依存を追加したら `--build` を付けて再ビルドする
(`node_modules` はコンテナ内の匿名ボリュームにあるため)。

```sh
docker compose run --rm react19 npm install <pkg>
docker compose up --build -V react19   # -V で node_modules ボリュームを作り直す
```

Docker を使わない場合は各フォルダで `nvm use && npm install && npm run dev`。

## デモ一覧

### React 18 (`react18/src/demos`)
- **Automatic Batching** — setTimeout / await 後の setState もまとめてレンダー
- **useTransition** — 重い更新を非緊急としてマーク
- **useDeferredValue** — 値の遅延コピーで重い描画を後回し
- **Suspense + lazy** — transition と組み合わせて fallback を抑制
- **useId** — SSR セーフな一意 ID
- **useSyncExternalStore** — 外部ストアの購読

### React 19 (`react19/src/demos`)
- **Actions / useActionState** — `<form action={async fn}>` と pending / エラー管理
- **useFormStatus** — 親フォームの送信状態を取得
- **useOptimistic** — 楽観的 UI 更新
- **use()** — Promise / Context の読み取り (条件付き呼び出し可)
- **ref as prop / ref cleanup / `<Context>` as Provider**
- **Document Metadata** — コンポーネント内の `<title>` / `<meta>`
- **`<Activity>`** (19.2) — state を保持したまま非表示
- **useEffectEvent** (19.2) — Effect から非リアクティブなロジックを分離
- **React Compiler** — 手動 memo なしの自動メモ化 (`vite.config.js` で有効化)
