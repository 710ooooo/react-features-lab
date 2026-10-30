import { useActionState } from 'react'
import { updateName } from './fakeApi.js'

// React 19: <form action={fn}> に async 関数を渡せる。
// useActionState で pending / エラー / 結果をまとめて管理
export default function Actions() {
  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      try {
        const name = await updateName(formData.get('name'))
        return { name, error: null }
      } catch (e) {
        return { ...prev, error: e.message }
      }
    },
    { name: '(未設定)', error: null },
  )

  return (
    <section>
      <h2>Actions / useActionState</h2>
      <p>現在の名前: <strong>{state.name}</strong></p>
      <form action={formAction}>
        <input name="name" placeholder="名前 (error と入れると失敗)" />{' '}
        <button disabled={isPending}>{isPending ? '送信中…' : '更新'}</button>
      </form>
      {state.error && <p style={{ color: 'tomato' }}>{state.error}</p>}
      <p className="note">送信成功後、非制御フォームは自動でリセットされます。</p>
    </section>
  )
}
