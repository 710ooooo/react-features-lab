import { useState, version } from 'react'
import AutomaticBatching from './demos/AutomaticBatching.jsx'
import Transition from './demos/Transition.jsx'
import DeferredValue from './demos/DeferredValue.jsx'
import SuspenseDemo from './demos/SuspenseDemo.jsx'
import UseId from './demos/UseId.jsx'
import SyncExternalStore from './demos/SyncExternalStore.jsx'

const demos = [
  { key: 'batching', label: 'Automatic Batching', Component: AutomaticBatching },
  { key: 'transition', label: 'useTransition', Component: Transition },
  { key: 'deferred', label: 'useDeferredValue', Component: DeferredValue },
  { key: 'suspense', label: 'Suspense + lazy', Component: SuspenseDemo },
  { key: 'useid', label: 'useId', Component: UseId },
  { key: 'store', label: 'useSyncExternalStore', Component: SyncExternalStore },
]

export default function App() {
  const [current, setCurrent] = useState(demos[0].key)
  const { Component } = demos.find((d) => d.key === current)

  return (
    <div className="layout">
      <nav>
        <h1>React {version}</h1>
        {demos.map((d) => (
          <button
            key={d.key}
            className={d.key === current ? 'active' : ''}
            onClick={() => setCurrent(d.key)}
          >
            {d.label}
          </button>
        ))}
      </nav>
      <main>
        <Component />
      </main>
    </div>
  )
}
