import { Suspense, lazy, useState, useTransition } from 'react'

// 擬似的に 1.5 秒かかる動的 import
const LazyPanel = lazy(() =>
  new Promise((r) => setTimeout(r, 1500)).then(() => import('./LazyPanel.jsx')),
)

// React 18: Suspense が Concurrent レンダリングと統合され、SSR でもストリーミング可能に
export default function SuspenseDemo() {
  const [show, setShow] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <section>
      <h2>Suspense + lazy</h2>
      <button onClick={() => setShow((s) => !s)}>通常で切り替え</button>{' '}
      <button onClick={() => startTransition(() => setShow((s) => !s))}>
        transition で切り替え {isPending && '(読み込み中…)'}
      </button>
      <div style={{ marginTop: 16 }}>
        <Suspense fallback={<p>Loading…</p>}>{show && <LazyPanel />}</Suspense>
      </div>
      <p className="note">
        transition 経由だと fallback を出さずに旧 UI を表示し続けます (初回のみ。再読み込みで再現)。
      </p>
    </section>
  )
}
