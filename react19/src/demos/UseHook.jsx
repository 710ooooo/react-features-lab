import { Suspense, createContext, use, useState } from 'react'
import { sleep } from './fakeApi.js'

const ThemeContext = createContext('light')

async function fetchUser(id) {
  await sleep(1000)
  return { id, name: `User #${id}` }
}

// use() で Promise を読み取る (解決まで最も近い Suspense がフォールバック)
function User({ userPromise }) {
  const user = use(userPromise)
  return <p>👤 {user.name}</p>
}

// use() は if の中でも呼べる (通常の Hook と違い条件付き呼び出し OK)
function ThemeLabel({ show }) {
  if (!show) return null
  const theme = use(ThemeContext)
  return <p>テーマ: {theme}</p>
}

export default function UseHook() {
  const [id, setId] = useState(1)
  // Promise はレンダー中に毎回作らず、state などでキャッシュする
  const [userPromise, setUserPromise] = useState(() => fetchUser(1))
  const [show, setShow] = useState(true)

  const next = () => {
    setId(id + 1)
    setUserPromise(fetchUser(id + 1))
  }

  return (
    <section>
      <h2>use()</h2>
      <button onClick={next}>次のユーザー</button>
      <Suspense fallback={<p>Loading…</p>}>
        <User userPromise={userPromise} />
      </Suspense>
      <hr />
      <label>
        <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} /> テーマを表示
      </label>
      <ThemeContext value="dark">
        <ThemeLabel show={show} />
      </ThemeContext>
    </section>
  )
}
