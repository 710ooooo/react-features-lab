import { useEffect, useEffectEvent, useState } from 'react'

// React 19.2: Effect 内で「最新の値を読みたいだけ」のロジックを依存配列から切り離す
export default function EffectEvent() {
  const [room, setRoom] = useState('general')
  const [muted, setMuted] = useState(false)
  const [log, setLog] = useState([])

  // muted を読むが、muted が変わっても Effect は再実行されない
  const onMessage = useEffectEvent((msg) => {
    if (!muted) setLog((l) => [...l.slice(-7), `[${room}] ${msg}`])
  })

  useEffect(() => {
    setLog((l) => [...l.slice(-7), `--- ${room} に接続 ---`])
    const id = setInterval(() => onMessage(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(id)
  }, [room]) // muted を依存に入れなくてよい

  return (
    <section>
      <h2>useEffectEvent</h2>
      <select value={room} onChange={(e) => setRoom(e.target.value)}>
        <option>general</option>
        <option>random</option>
      </select>{' '}
      <label>
        <input type="checkbox" checked={muted} onChange={(e) => setMuted(e.target.checked)} /> ミュート
      </label>
      <ul>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>
      <p className="note">ミュートを切り替えても「接続」ログは出ません (= 再接続されない)。</p>
    </section>
  )
}
