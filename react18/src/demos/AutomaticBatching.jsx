import { useRef, useState } from 'react'

// React 18: setTimeout / Promise / ネイティブイベント内の setState もまとめて 1 回の再レンダーになる
export default function AutomaticBatching() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const renders = useRef(0)
  renders.current += 1

  const handleTimeout = () => {
    setTimeout(() => {
      // React 17 まではここで 2 回レンダーされていた
      setCount((c) => c + 1)
      setFlag((f) => !f)
    }, 0)
  }

  const handleFetch = async () => {
    await new Promise((r) => setTimeout(r, 300))
    setCount((c) => c + 1)
    setFlag((f) => !f)
  }

  return (
    <section>
      <h2>Automatic Batching</h2>
      <p>count: {count} / flag: {String(flag)}</p>
      <p>レンダー回数: {renders.current}</p>
      <button onClick={handleTimeout}>setTimeout 内で 2 回 setState</button>{' '}
      <button onClick={handleFetch}>await 後に 2 回 setState</button>
      <p className="note">
        どちらのボタンもレンダー回数は 1 ずつしか増えません (StrictMode の開発時二重レンダーで
        実際の数値は 2 刻みになることがあります)。逆に即時反映したい場合は flushSync を使います。
      </p>
    </section>
  )
}
