import { useState } from 'react'

// React 19: <title> / <meta> / <link> をコンポーネント内に書くと <head> に自動で巻き上げられる
export default function Metadata() {
  const [count, setCount] = useState(0)
  return (
    <section>
      <title>{`クリック ${count} 回 | React 19`}</title>
      <meta name="description" content="Document Metadata のデモ" />
      <h2>Document Metadata</h2>
      <button onClick={() => setCount(count + 1)}>クリック ({count})</button>
      <p className="note">ブラウザのタブのタイトルが変わります。react-helmet 不要。</p>
    </section>
  )
}
