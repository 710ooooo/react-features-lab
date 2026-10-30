import { createContext, use, useCallback, useRef, useState } from 'react'

// React 19: forwardRef 不要。ref は普通の props として受け取れる
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />
}

const LangContext = createContext('ja')

function Greeting() {
  const lang = use(LangContext)
  return <p>{lang === 'ja' ? 'こんにちは' : 'Hello'}</p>
}

export default function RefAsProp() {
  const inputRef = useRef(null)
  const [lang, setLang] = useState('ja')
  const [log, setLog] = useState([])
  const [showBox, setShowBox] = useState(true)

  // React 19: ref コールバックからクリーンアップ関数を返せる (以前は null で再呼び出しされていた)
  const boxRef = useCallback((node) => {
    setLog((l) => [...l, `mount <${node.tagName.toLowerCase()}>`])
    return () => setLog((l) => [...l, 'cleanup'])
  }, [])

  return (
    <section>
      <h2>ref as prop / ref cleanup / Context as Provider</h2>

      <h3>ref as prop</h3>
      <MyInput ref={inputRef} placeholder="forwardRef なし" />{' '}
      <button onClick={() => inputRef.current.focus()}>フォーカス</button>

      <h3>ref コールバックのクリーンアップ関数</h3>
      <button onClick={() => setShowBox(!showBox)}>要素をトグル</button>
      {showBox && <div ref={boxRef}>📦 ref 付きの要素</div>}
      <p className="note">log: {log.slice(-6).join(' → ')}</p>

      <h3>&lt;Context&gt; をそのまま Provider として使用</h3>
      <button onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}>言語切替</button>
      <LangContext value={lang}>
        <Greeting />
      </LangContext>
    </section>
  )
}
