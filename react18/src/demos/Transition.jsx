import { useState, useTransition } from 'react'
import { slowFilter } from './slowList.js'

// React 18: 緊急でない更新を transition としてマークし、入力のレスポンスを保つ
export default function Transition() {
  const [input, setInput] = useState('')
  const [items, setItems] = useState(() => slowFilter(''))
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    setInput(e.target.value) // 緊急: すぐ反映
    startTransition(() => {
      setItems(slowFilter(e.target.value)) // 非緊急: 後回し・中断可能
    })
  }

  return (
    <section>
      <h2>useTransition</h2>
      <input value={input} onChange={handleChange} placeholder="数字を入力 (例: 12)" />
      {isPending && <span> 更新中…</span>}
      <ul className={`items ${isPending ? 'pending' : ''}`}>
        {items.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </section>
  )
}
