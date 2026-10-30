import { useRef, useState } from 'react'

function RenderCount({ name }) {
  const renders = useRef(0)
  renders.current += 1
  return <p>{name} のレンダー回数: {renders.current}</p>
}

function Child({ items, onSelect }) {
  return (
    <div>
      <RenderCount name="Child" />
      {items.map((i) => <button key={i} onClick={() => onSelect(i)}>{i}</button>)}
    </div>
  )
}

// React Compiler が有効なので、memo / useMemo / useCallback を書かなくても
// 親の無関係な state 変更で Child は再レンダーされない
export default function Compiler() {
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(null)
  const items = ['A', 'B', 'C']

  return (
    <section>
      <h2>React Compiler</h2>
      <button onClick={() => setCount(count + 1)}>親だけ更新 ({count})</button>
      <p>選択: {selected ?? '-'}</p>
      <Child items={items} onSelect={setSelected} />
      <p className="note">
        vite.config.js の babel プラグインを外すと、ボタンを押すたびに Child のレンダー回数が増えます。
        React DevTools では最適化済みコンポーネントに「Memo ✨」バッジが付きます。
      </p>
    </section>
  )
}
