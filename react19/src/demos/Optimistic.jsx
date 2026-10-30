import { useOptimistic, useState, startTransition } from 'react'
import { sleep } from './fakeApi.js'

// サーバー応答を待たずに UI を楽観的に更新し、完了/失敗で実データに戻る
export default function Optimistic() {
  const [todos, setTodos] = useState([{ id: 1, text: '牛乳を買う' }])
  const [optimisticTodos, addOptimistic] = useOptimistic(todos, (state, newTodo) => [
    ...state,
    { ...newTodo, sending: true },
  ])

  const action = async (formData) => {
    const text = formData.get('text')
    addOptimistic({ id: Date.now(), text })
    await sleep(1500)
    if (text === 'fail') return // 失敗時は setTodos しない → 楽観的な項目は消える
    startTransition(() => setTodos((t) => [...t, { id: Date.now(), text }]))
  }

  return (
    <section>
      <h2>useOptimistic</h2>
      <ul>
        {optimisticTodos.map((t) => (
          <li key={t.id} className={t.sending ? 'pending' : ''}>
            {t.text} {t.sending && '(送信中…)'}
          </li>
        ))}
      </ul>
      <form action={action}>
        <input name="text" placeholder="fail と入れると失敗" />{' '}
        <button>追加</button>
      </form>
    </section>
  )
}
