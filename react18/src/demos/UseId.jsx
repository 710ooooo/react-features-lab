import { useId } from 'react'

function Field({ label }) {
  // React 18: SSR とクライアントで一致する一意な ID を生成
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>{' '}
      <input id={id} /> <code>{id}</code>
    </div>
  )
}

export default function UseId() {
  return (
    <section>
      <h2>useId</h2>
      <Field label="名前" />
      <Field label="メール" />
      <p className="note">リストの key には使わないこと。アクセシビリティ属性の紐付け用です。</p>
    </section>
  )
}
