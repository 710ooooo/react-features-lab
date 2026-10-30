import { useFormStatus } from 'react-dom'
import { sleep } from './fakeApi.js'

// 親の <form> の送信状態を props バケツリレーなしで取得できる
function SubmitButton() {
  const { pending, data } = useFormStatus()
  return (
    <button disabled={pending}>
      {pending ? `「${data.get('message')}」を送信中…` : '送信'}
    </button>
  )
}

export default function FormStatus() {
  return (
    <section>
      <h2>useFormStatus</h2>
      <form action={async () => { await sleep(1200) }}>
        <input name="message" defaultValue="こんにちは" />{' '}
        <SubmitButton />
      </form>
      <p className="note">useFormStatus は &lt;form&gt; の内側にあるコンポーネントで呼ぶ必要があります。</p>
    </section>
  )
}
