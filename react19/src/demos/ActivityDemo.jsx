import { Activity, useEffect, useState } from 'react'

function Counter({ label }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(`[${label}] effect mount`)
    return () => console.log(`[${label}] effect cleanup`)
  }, [label])
  return (
    <div>
      <input placeholder={`${label} の入力`} /> <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

// React 19.2: <Activity mode="hidden"> は state を保持したまま非表示にし、effect は一時停止する
export default function ActivityDemo() {
  const [visible, setVisible] = useState(true)
  return (
    <section>
      <h2>&lt;Activity&gt;</h2>
      <button onClick={() => setVisible(!visible)}>表示切替</button>

      <h3>Activity で隠す (state 保持)</h3>
      <Activity mode={visible ? 'visible' : 'hidden'}>
        <Counter label="Activity" />
      </Activity>

      <h3>条件付きレンダー (state 破棄)</h3>
      {visible && <Counter label="Conditional" />}

      <p className="note">入力・カウントしてから切り替えて比較。Console で effect の挙動も確認できます。</p>
    </section>
  )
}
