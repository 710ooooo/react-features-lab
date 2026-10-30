import { memo, useDeferredValue, useState } from 'react'
import { slowFilter } from './slowList.js'

const SlowList = memo(function SlowList({ query }) {
  const items = slowFilter(query)
  return <ul className="items">{items.map((t) => <li key={t}>{t}</li>)}</ul>
})

// React 18: 値の「遅れたコピー」を受け取り、重い描画だけ後回しにする
export default function DeferredValue() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery

  return (
    <section>
      <h2>useDeferredValue</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="数字を入力" />
      <div className={isStale ? 'pending' : ''}>
        <SlowList query={deferredQuery} />
      </div>
      <p className="note">setState を自分で制御できない (props で値が来る) 場合は useTransition ではなくこちら。</p>
    </section>
  )
}
