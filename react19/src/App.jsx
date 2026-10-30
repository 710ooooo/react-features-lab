import { useState, version } from 'react'
import Actions from './demos/Actions.jsx'
import FormStatus from './demos/FormStatus.jsx'
import Optimistic from './demos/Optimistic.jsx'
import UseHook from './demos/UseHook.jsx'
import RefAsProp from './demos/RefAsProp.jsx'
import Metadata from './demos/Metadata.jsx'
import ActivityDemo from './demos/ActivityDemo.jsx'
import EffectEvent from './demos/EffectEvent.jsx'
import Compiler from './demos/Compiler.jsx'

const demos = [
  { key: 'actions', label: 'Actions / useActionState', Component: Actions },
  { key: 'formstatus', label: 'useFormStatus', Component: FormStatus },
  { key: 'optimistic', label: 'useOptimistic', Component: Optimistic },
  { key: 'use', label: 'use()', Component: UseHook },
  { key: 'ref', label: 'ref as prop / Context', Component: RefAsProp },
  { key: 'metadata', label: 'Document Metadata', Component: Metadata },
  { key: 'activity', label: '<Activity> (19.2)', Component: ActivityDemo },
  { key: 'effectevent', label: 'useEffectEvent (19.2)', Component: EffectEvent },
  { key: 'compiler', label: 'React Compiler', Component: Compiler },
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
